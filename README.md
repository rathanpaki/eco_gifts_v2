# EcoGifts Storefront

EcoGifts is the Next.js 16 storefront and administration interface for the
EcoGifts API. It includes the public catalog, personalization, cart and
checkout, customer accounts, impact reporting, and administrative workflows.

## Local setup

1. Copy `.env.example` to `.env.local` and provide the Firebase client
   configuration.
2. Set `NEXT_PUBLIC_API_BASE_URL` and `API_BASE_URL` to the Nest API origin.
3. Install dependencies with `npm install`.
4. Start the UI with `npm run dev`.

The sibling `eco_gifts-_v2-B` project must be running for API-backed routes.
The frontend and backend must use the same `SESSION_COOKIE_NAME`.

## Commands

- `npm run dev` starts the development server.
- `npm test` runs dependency-free domain helper tests with Node's test runner.
- `npm run lint` checks the source without modifying it.
- `npm run build` performs the production build and TypeScript validation.
- `npm start` serves a completed production build.

## Architecture

- `src/app` contains route boundaries and server-rendered entry points.
- `src/components/features` contains feature UI.
- `src/services` contains server and browser API clients.
- `src/hooks` owns React Query integration and mutation state.
- `src/lib/schemas` validates API responses at the frontend boundary.
- `src/types` contains shared frontend contracts.

Protected routes first perform a lightweight cookie-presence check in the
Next.js proxy. The server layouts then validate the session and role against
the API; authorization is always enforced again by backend guards.

## Demo boundaries

Card entry is a development demonstration. Full card numbers and security
codes remain in browser memory only; saved methods contain display metadata.
The backend accepts `demo_card` only when its explicit development setting is
enabled and cannot enable it in production.

Phone verification currently uses the documented development code in the UI.
It is intentionally retained as a demo-only boundary and is not an SMS
verification implementation.
