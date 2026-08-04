Context: Host vs Guest concept in the Deskly API

The API went through a refactor where almost every authenticated endpoint now exists in two versions, according to the role the user is acting as: guest (who searches/books workspaces) and host (who owns a workspace and receives bookings/payments/reviews). The frontend needs to know, from the logged-in user, when they can operate as a host and route the right calls.

1. Data model

Each user has a boolean field is_host (user table, migration V3__add_is_host_to_user.sql). The same user can be guest and host at the same time — is_host = true doesn't turn off guest mode, it only enables host mode. Think of it like Airbnb's "Switch to hosting": it's a context switch in the UI, not a separate account.

is_host comes in the UserResponse, returned inside the login response:

POST /public/api/v1/auth/authenticate
Body: { "idToken": "<firebase-id-token>" }

Response:
{
"accessToken": "...",
"refreshToken": "...",
"expiresIn": 3600,
"user": {
"id": "...",
"name": "...",
"email": "...",
"phone_number": "...",
"is_host": true | false
}
}

What the frontend needs to do: store is_host in session state after login. If false, don't even show the option to switch to host mode. If true, show the guest/host switch in the UI (this "current mode" is 100% client-side — the backend doesn't keep track of "which mode the user is currently in", it only validates whether they have host permission on each call).

There's also an is_admin field, but it's completely invisible through the API — it doesn't appear in any request/response, it's only set manually. There's no need (and no way) to build any UI on top of it in this app.

2. Authentication

All calls (except /public/** and /actuator/**) require:
Authorization: Bearer <accessToken>

3. Logged-in user profile

- GET /api/v1/users/me — returns the current logged-in user's UserResponse (id, name, email, phone_number, is_host). Use this to re-sync session state whenever needed (e.g. after reopening the app), instead of relying only on the login snapshot.
- PUT /api/v1/users/{userId} — profile update, including is_host. A user can only update their own account (userId in the path must equal the caller's own id, otherwise it returns 403). This means the "become a host" flow is already available: the frontend just needs to call PUT /api/v1/users/{yourOwnId} with { "is_host": true } in the body. After that, call GET /api/v1/users/me (or log in again) to refresh local state with the new is_host.

UpdateUserRequest body:
{
"name": "...",
"phone_number": "...",
"is_host": true
}
All fields are optional — send only what you want to change.

4. Endpoint map by domain
http://localhost:8080/swagger-ui/index.html

Outside this pattern:
- POST /public/api/v1/auth/authenticate — shared, no role required.
- GET /api/v1/users/me — self-service, any authenticated user.
- /api/v1/users/{userId} (PUT/GET/DELETE) — self-or-admin: allowed for the user themselves to manage their own account, or for an admin to manage any account.
- GET /api/v1/users (list) and /api/v1/amenities/** (all) — these are admin-only. Don't build end-user UI on top of them; they're internal panels.

5. Error handling

- 403 on a /host/** endpoint: the user doesn't have is_host = true. Treat as "not a host" — a signal to fall back to guest mode / hide the hosting option.
- 403 on /api/v1/users/{userId} or /api/v1/amenities/**: outside the normal end-user flow (the first only happens when trying to edit another user's account, the second shouldn't even have a screen in the app). Treat as a generic access-denied.
- 403 on an individual guest resource (e.g. GET /guest/reservations/{id} for another user's booking): this is an ownership check, not a role check. Also a generic access-denied — shouldn't happen through normal UI, only via URL/ID manipulation.

6. Known backend gaps

- The host side of bookings/payments/reviews is read-only — there are no write endpoints yet (host confirming a booking, replying to a review, etc.). If the product flow needs this, let us know so we can prioritize it.
