# Mother Goose Toys (POC)

First proof-of-concept for a toy rental subscription platform built with Next.js + Supabase.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS + shadcn-style UI components
- Supabase Auth + Postgres + RLS policies
- Zod validation for server mutations
- POC subscription renewal via admin `Simulate renewal` (Stripe webhook deferred)

## Features shipped

### Public

- `/` marketing home
- `/how-it-works`
- `/pricing`
- `/toys` public catalog with age filtering and availability
- `/auth/login` and `/auth/register`

### Parent app (`/app/*`)

- `/app/dashboard` points balance, active rentals, recommendations
- `/app/toys` browse and reserve (points-based)
- `/app/rentals` active + history + request return
- `/app/subscription` plan/status view
- `/app/points` points ledger

### Admin (`/admin/*`)

- `/admin/inventory` manage toy unit status/condition
- `/admin/toys` minimal toy catalog CRUD
- `/admin/rentals` rentals overview + status update
- Renewal fallback: allocate monthly points with `Simulate renewal`

## Business logic implemented

- Points balance is ledger-backed (`SUM(points_transactions.amount)`).
- Reservation is transaction-safe via SQL function `reserve_toy`:
  - locks one available unit with `FOR UPDATE SKIP LOCKED`
  - creates rental with `reserved`
  - sets unit to `reserved`
  - inserts points transaction `reservation` with negative cost
- Return request uses SQL function `request_rental_return`.
- Admin return completion uses SQL function `admin_mark_rental_returned`:
  - rental -> `returned`
  - unit -> `cleaning`

## Project structure

```text
app/
  api/
  admin/
  app/
  auth/
  how-it-works/
  pricing/
  toys/
components/
  admin/
  app/
  marketing/
  ui/
lib/
supabase/
  migrations/
  seed.sql
```

## Environment variables

Create `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=... # optional in this POC, kept for future Stripe/admin extensions
NEXT_PUBLIC_SITE_URL=http://localhost:3000
DEMO_ACCESS_PASSWORD=... # optional; when set, site is password-gated at /demo-login
```

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Apply SQL migration and seed in Supabase SQL editor:

- Run `supabase/migrations/20260226090000_init.sql`
- Run `supabase/seed.sql`

3. Run app:

```bash
npm run dev
```

4. Open `http://localhost:3000`

## Auth and roles

- Register a user via `/auth/register`.
- Promote to admin by updating `profiles.role`:

```sql
update public.profiles set role = 'admin' where id = '<auth_user_uuid>';
```

- Parent users stay as `role = 'parent'`.

## Notes

- Middleware enforces route-level role access:
  - parents -> `/app/*`
  - admins -> `/admin/*`
- Optional demo gate:
  - set `DEMO_ACCESS_PASSWORD` to protect the whole site with app-level password access
  - users will be redirected to `/demo-login` until correct password is entered
- RLS policies enforce data-level access.
- This POC intentionally uses simulated renewals instead of Stripe webhooks for faster shipping.
