# Deskly Frontend

Frontend application for Deskly built with React 19, TypeScript, and modern best practices.

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
    api.ts              # Axios instance configuration
  components/
    ui/                 # shadcn/ui components
  hooks/
    useHealth.ts        # Custom hook for health check
  lib/
    utils.ts            # Utility functions
  pages/
    Home.tsx            # Home page component
  services/
    health.service.ts   # Health API service
  types/
    health.ts           # TypeScript interfaces
  App.tsx               # Main application component
  main.tsx              # Application entry point
  index.css             # Global styles
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

This architecture allows easy addition of:
- Authentication
- Dashboard
- User management
- Organizations
- Payments
- Settings

## API Configuration

Base URL: `https://deskly-back-api-deskly.xqmbls.easypanel.host`
Timeout: `10000ms`

## Deployment

The project is configured for Vercel deployment.
