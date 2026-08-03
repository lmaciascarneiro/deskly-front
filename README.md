# Deskly Frontend

Frontend application for Deskly built with React 19, TypeScript and modern best practices.

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Routing
- **TanStack Query** - Data fetching and caching
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **ESLint** - Linting
- **Prettier** - Code formatting

## Project Structure

```
src/
  api/
    api.ts                  # Axios instance configuration
  components/
    ui/                     # shadcn/ui components
  context/
    AuthContext.tsx         # Auth state and Firebase/backend session flow
  firebase/
    firebase.ts             # Firebase app initialization
  lib/
    utils.ts                # Utility functions
    token-storage.ts        # Session persistence (localStorage)
  pages/
    Home.tsx                # Landing page
    Login.tsx               # Email/password + Google sign-in
    SignUp.tsx               # Account creation
    Dashboard.tsx            # Authenticated user panel
  services/
    auth.service.ts         # Auth API service
  types/
    auth.ts                 # TypeScript interfaces
  App.tsx                   # Main application component
  main.tsx                  # Application entry point
  index.css                 # Global styles
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

### Preview

```bash
npm run preview
```

## Architecture

The application follows a clean architecture pattern:

- **API Layer**: Axios instance with base configuration
- **Service Layer**: Business logic for API calls
- **Hook Layer**: Custom hooks using TanStack Query for data fetching
- **Component Layer**: Presentational components with minimal logic
- **Type Layer**: TypeScript interfaces for type safety

Implemented so far:
- Authentication (email/password and Google, via Firebase)
- Dashboard

This architecture allows easy addition of:
- User management
- Organizations
- Payments
- Settings

## API Configuration

The API base URL comes from the `VITE_API_BASE_URL` environment variable, set per Vite mode:

- `.env.development` → `http://localhost:8080` (used by `npm run dev`)
- `.env.production` → `https://deskly-back-api-deskly.xqmbls.easypanel.host` (used by `npm run build`)

Timeout: `10000ms`

## Deployment

The project is configured for Vercel deployment.
