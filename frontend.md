# Deskly Frontend

Reference document for Deskly frontend development: product, stack, architecture, and adopted visual identity.

## 1. Product

Deskly is a workspace booking platform — the "Airbnb of workspaces". Users book places to work by the hour or by the day:

- Home offices
- Coworking spaces
- Private offices
- Meeting rooms
- Cafes suited for remote work

**Target audience:** remote professionals, freelancers, developers, designers, and entrepreneurs who need a good environment to work outside their home.

**User roles:** every user can be a *guest* (who searches/books) and, optionally, also a *host* (who lists a space and receives bookings). See [`frontend-guestHostConcept.md`](./frontend-guestHostConcept.md) for the original concept of the data model and role-based authorization — but for the **exact request/response shape of each endpoint, the Swagger (`/v3/api-docs` or `/swagger-ui/index.html` on the backend) is the most reliable and up-to-date source**, see section 7.

## 2. Tech stack

- **React 19** — UI library
- **TypeScript** — static typing
- **Vite** — build tool and dev server
- **React Router v7** — routing
- **TanStack Query** — data fetching and cache
- **Axios** — HTTP client
- **Tailwind CSS** — utility-first styling
- **shadcn/ui** (Radix + CVA) — UI components
- **Lucide Icons** — icons
- **Firebase Auth** — authentication (email/password and Google), exchanged for the API's own session token
- **ESLint + Prettier** — linting and formatting

## 3. Architecture

Layers, from closest to the network to closest to the screen:

```
API layer       → src/api/api.ts             (Axios instance, auth interceptor)
Service layer   → src/services/*.service.ts  (API calls, one function per operation)
Type layer      → src/types/*.ts             (API DTOs + mappers to domain types)
State/Context   → src/context/*.tsx          (session state + active role, e.g. AuthContext)
Page layer      → src/pages/*.tsx            (routed screens)
Component layer → src/components/            (reusable UI; components/ui = shadcn)
```

### Folder structure

```
src/
  api/
    api.ts                        # Axios instance + interceptor that injects the Bearer token
  components/
    ui/                           # shadcn/ui components (button, card, input...)
    AppHeader.tsx                 # global header: nav, guest/host switch, account
    AppFooter.tsx
    ProtectedRoute.tsx            # requires isAuthenticated
    PublicOnlyRoute.tsx           # requires !isAuthenticated (login/signup/home)
    HostRoute.tsx                 # requires isAuthenticated + user.isHost
    WorkspaceCard.tsx             # reusable card (Home, WorkspacesList)
    WorkspaceIllustration.tsx     # custom SVG illustration (identity standard)
    EmailPasswordLoginForm.tsx / EmailPasswordSignUpForm.tsx / GoogleSignInButton.tsx
  context/
    AuthContext.tsx               # auth session + activeRole (guest|host) + new-account detection
  firebase/
    firebase.ts                   # Firebase app initialization
  lib/
    utils.ts                      # cn() — clsx + tailwind-merge helper
    token-storage.ts              # session persistence (localStorage)
    role-storage.ts               # active role persistence (guest|host, localStorage)
  pages/
    Home.tsx / Login.tsx / SignUp.tsx
    EditProfile.tsx               # mode="onboarding" (/profile/complete) | "settings" (/profile/edit)
    WorkspacesList.tsx / WorkspaceDetail.tsx   # public catalog (guest)
    host/
      HostWorkspacesList.tsx      # my workspaces
      HostWorkspaceForm.tsx       # mode="create" | "edit"
      HostWorkspacePhotos.tsx     # manage a workspace's photos
  services/
    auth.service.ts               # POST /public/api/v1/auth/authenticate
    user.service.ts                # GET /api/v1/users/me, PUT /api/v1/users/{id}
    workspace.service.ts           # public: list/getById/listPhotos
    host-workspace.service.ts      # host: list/getById/create/update/remove
    host-workspace-photo.service.ts # host: create/update/remove photos
  types/
    auth.ts / user.ts
    pagination.ts                  # PageResponseDto<T> + generic mapPage
    workspace.ts / workspace-photo.ts
  showcase/                        # visual identity prototypes (see section 6)
  App.tsx                          # routes
  main.tsx                         # entry point
  index.css                        # global styles + shadcn tokens (CSS vars)
```

### Conventions

- The `@/*` import alias points to `src/*` (configured in `tsconfig.json` and `vite.config.ts`).
- API DTOs (snake_case, backend format) stay isolated in `types/*.ts` and are converted to domain types (camelCase) via a `mapX` function. Components and services should never talk in DTOs directly — always the domain type.
- `api.ts` already injects `Authorization: Bearer <accessToken>` via an interceptor reading from `token-storage`; services should not build this header manually.
- Environment variables: `VITE_API_BASE_URL` and Firebase credentials (`VITE_FIREBASE_*`), with different `.env.development` / `.env.production` per Vite mode (see `.env.example`).
- Guest endpoints (`/public/api/v1/...`) don't require auth; host endpoints (`/api/v1/host/...`) require `user.isHost === true` in the active role — always check the Swagger before assuming a path (see section 7).

## 4. Visual identity — decision

5 visual directions were explored in `src/showcase/` (see section 6). **The chosen direction going forward is Landing 05 — "SaaS Startup" (cards & illustrations)**, and its tokens have already been promoted to the global theme (`tailwind.config.js` + `src/index.css`) — they are no longer local CSS in the showcase.

### Tokens

**Color** (Tailwind classes already configured)
| Class | Hex | Usage |
|---|---|---|
| `bg-indigo` / `text-indigo` | `#4F46E5` | Primary color — CTAs, active links, highlight icons (also `--primary`) |
| `bg-lime` / `text-lime` | `#A3E635` | Secondary accent — badges, rating, counterpoint to indigo (also `--accent`) |
| `bg-ink` / `text-ink` | `#0B1220` | Main text, footer background (also `--foreground`) |
| `bg-lavender` | `#F5F6FF` | Background for alternating sections (also `--secondary`) |
| `text-muted-foreground` | — | Secondary text (`--muted-foreground`) |

**Typography**
- `font-display` → **Outfit** (geometric, rounded, weights 500–800), loaded globally via `index.html`
- `font-sans` (body default) → **DM Sans** (weights 400–700)

**Layout and components**
- Well-rounded corners: `rounded-2xl` / `rounded-3xl` on cards, `rounded-full` on buttons and nav pills. Global `--radius` is `1rem`.
- Soft colored shadows (`shadow-indigo-200`) instead of generic gray shadows.
- `.blob-shape` (global utility in `index.css`) for thumbnails/organic decoration instead of plain rectangles.
- Simple vector illustration (custom SVG, no external assets) — `WorkspaceIllustration.tsx` is the reference standard.
- Micro-interactions: `-translate-y` hover on cards, smooth transitions. The showcase has more elaborate fade/float examples (`l05-pop`, `l05-float`) if a specific section needs something more expressive.

## 5. Authentication and roles (guest/host)

- Login/signup (email+password or Google) exchange the Firebase ID token for an API session (`authService.authenticate`), persisted in `token-storage`.
- **New account detection**: `AuthContext` uses `firebaseUser.metadata.creationTime` — if the account was created less than 5 minutes ago, it's treated as a "first authentication" and the app redirects to `/profile/complete` instead of `/workspaces`. Email signup is always treated as a new account; login/Google use the recency check (Google can create an account on the spot, without an explicit "signup" step).
- **`is_host`** comes from the backend (`user.isHost`) and is enabled by the user themselves on `/profile/edit` (checkbox "I want to list my spaces" → `PUT /api/v1/users/{id}`).
- **`activeRole` (`guest` | `host`)** is 100% client-side (`lib/role-storage.ts`, localStorage), exactly as described in `frontend-guestHostConcept.md` — the backend never knows "what mode" the user is in, it only validates `is_host` on every call to `/api/v1/host/**`. Can only be `host` if `user.isHost === true`; reverts to `guest` automatically if isHost becomes `false` or on logout.
- The guest/host switch lives in `AppHeader` (only shown if `user.isHost`). `HostRoute` also forces `activeRole = 'host'` when accessing a `/host/**` URL directly, to keep the header consistent.

## 6. Identity showcase (`src/showcase/`)

Kept in the project as a design reference, **not production code**, and should not be imported by real screens.

- `landing-01` — Minimal (Linear/Stripe)
- `landing-02` — Modern Gradient
- `landing-03` — Airbnb Style
- `landing-04` — Apple/Notion Style
- `landing-05` — SaaS Startup ← **chosen direction, tokens already promoted to the global theme (section 4)**

Access: `npm run dev` and navigate to `/showcase`.

## 7. Source of truth for APIs

There are three sources of backend API documentation, in order of reliability:

1. **Swagger** (`{{deskly_url}}/swagger-ui/index.html`, spec at `{{deskly_url}}/v3/api-docs`) — **use whenever possible**, it's generated from the code and reflects the real backend.
3. `frontend-guestHostConcept.md` — good for understanding the *concept* (guest vs host, is_host, 403 handling)

Discrepancies already fixed in the code based on the Swagger:
- Public workspaces: `GET /public/api/v1/workspaces` (no `guest` in the path).
- `WorkspaceResponse` does **not** include `description`/`address`/`neighborhood`/`latitude`/`longitude` — only `id`, `host_id`, `title`, `city`, `price_per_hour`, `rating` (nullable), `review_count`, `status`, `created_at`. These address fields only exist in the create/edit *request*, they aren't returned on read.
- Real pagination: `{ content, total_elements, total_pages, size }` (snake_case, no current-page field — the front uses the page it requested itself). The backend sometimes returns `total_pages: 0` even with items on the current page; the front guards against this with `Math.max(totalPages, 1)`.
- Creation `POST` (workspace and photo) returns just a raw UUID (`"a841dfc3-..."`), not an object.
- Workspace and photo `PUT`/`DELETE` return an empty/irrelevant body — don't try to parse the response.

## 8. Known gaps / next steps

- Workspace editing can't pre-fill description/address/neighborhood (the API doesn't return these fields on read) — the form warns about this and only sends what the host re-types.
- Bookings, payments, reviews, and favorites don't have UI yet (out of scope so far).
- Photo upload is URL-only (`photo_url`) — there's no file upload endpoint documented in the Swagger.
- The main bundle (`index-*.js`) has already passed 500kB — consider `manualChunks` or lazy-loading less-visited routes (e.g. host screens) if this becomes a real performance issue.

## 9. English first

- Everything that gets implemented (including this file) must be in English: URL paths, messages, labels... everything.
