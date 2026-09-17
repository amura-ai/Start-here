# amura-auth-service

Reusable auth shell for Amura web apps. Covers OTP login, multi-tenant
service selection, and the post-auth layout (header, sidebar with service
switcher, content outlet). The post-auth route renders an empty
placeholder — bring your own dashboards on top.

## What's inside

```
src/
  auth/          OTP login, AuthProvider, AuthGuard, ServiceGuard, tenant cache
  layout/        AppLayout, Sidebar (service switcher), UserMenu
  api/           encrypted axios client, getServicesByUser
  components/    EmptyPage placeholder — replace with your routes
  theme/         MUI theme + palettes
```

Routes (`App.tsx`):

| Path              | Element                                        |
| ----------------- | ---------------------------------------------- |
| `/login`          | `Login`                                        |
| `/select-service` | `SelectService` (gated by `AuthGuard`)         |
| `/`               | `EmptyPage` (gated by `AuthGuard` + `ServiceGuard`, inside `AppLayout`) |

To add a dashboard, drop a route under the `ServiceGuard` → `AppLayout`
block and wire a sidebar entry in `layout/Sidebar.tsx`.

## Prerequisites

- Node 18+ and npm 8+ (pinned in `package.json` `engines`; `.nvmrc`
  declares Node 18 — `nvm use` / `fnm use` will pick it up automatically).
- A reachable Amura events backend (for `getServicesByUser`). Cognito
  login itself works from anywhere as long as the user pool / client
  IDs in the env file are valid.

## Setup

```bash
git clone https://github.com/mano-amura/amura-auth-service.git
cd amura-auth-service
npm install
```

## Running

Pick the env that matches your backend:

```bash
npm run start-qa      # uses .env.qa     (default: BE at http://localhost:3000)
npm run start-dev     # uses .env.dev
npm run start-amura   # uses .env.amura  (production)
```

The dev server listens on port `3003`. If that port is taken, Vite
auto-bumps to the next free port and prints the actual URL.

### Env variables

Each `.env.<name>` file exposes:

| Var                                  | Purpose                                        |
| ------------------------------------ | ---------------------------------------------- |
| `VITE_BASE_API_URL`                  | Amura events backend root (used by axios)      |
| `VITE_COGNITO_USER_POOL_ID`          | Cognito user pool                              |
| `VITE_COGNITO_USER_POO_WEB_CLIENT_ID`| Cognito web client                             |
| `VITE_BUCKET_REGION`                 | AWS region for Cognito                         |
| `VITE_PUBLIC_KEY`                    | RSA public key for client→server payload encryption |
| `VITE_ENV`                           | Environment label                              |

To point at a different backend, copy `.env.qa` to `.env.local` and
override `VITE_BASE_API_URL`, then run with `dotenv -e .env.local -- vite`.

## Build

```bash
npm run build-qa      # outputs to dist/
npm run build-dev
npm run build-amura
```

## Notes for downstream forks

- `App.tsx` is the only routing file — keep `Login` / `SelectService` /
  `AuthGuard` / `ServiceGuard` / `AppLayout` in place; everything inside
  `AppLayout` is yours.
- `auth/AuthProvider.tsx` exposes `useAuth()` with `userId`,
  `selectedService`, `signOut`, and the OTP send/verify helpers.
- `auth/tenantsCache.ts` caches the user's tenant/service list in
  localStorage so the picker doesn't refetch on back-nav.
- The encrypted axios client (`api/client.ts`) wraps request bodies via
  `api/crypto.ts`. Pass `{ skipEncryption: true }` per-request for
  endpoints the backend keeps plaintext.
