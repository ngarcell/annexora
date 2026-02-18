# ActaOS — EU AI Act Compliance OS

ActaOS is a multi-tenant compliance workspace for Annex III deployers. It provides AI inventory management, risk classification, obligation mapping, evidence vaults, and audit-ready packs for the EU AI Act.

## Features

- AI system inventory with deployment context and owners
- Risk classification aligned to AI Act tiers
- Annex III obligation mapping with controls and evidence tracking
- Evidence vault with approvals and versioning metadata
- Audit pack generation per high-risk system
- Subdomain-based multi-tenant workspaces
- Admin control plane for cross-tenant monitoring

## Tech Stack

- [Next.js 15](https://nextjs.org/) with App Router
- [React 19](https://react.dev/)
- [Upstash Redis](https://upstash.com/) with in-memory fallback
- [Tailwind 4](https://tailwindcss.com/) for styling
- [shadcn/ui](https://ui.shadcn.com/) for UI primitives

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- pnpm (recommended) or npm/yarn
- Upstash Redis account (optional for production persistence)

### Installation

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Configure environment variables (optional for persistence):

   ```
   KV_REST_API_URL=your_redis_url
   KV_REST_API_TOKEN=your_redis_token
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

4. Access the application:
   - Main site: http://localhost:3000
   - Admin panel: http://localhost:3000/admin
   - Workspaces: http://[workspace].localhost:3000

## API Endpoints

All endpoints expect `tenant` as a query parameter or `x-tenant` header.

- `GET /api/ai-systems`
- `POST /api/ai-systems`
- `GET /api/ai-systems/:id`
- `POST /api/ai-systems/:id/risk-assessments`
- `GET /api/ai-systems/:id/obligations`
- `POST /api/ai-systems/:id/audit-pack`
- `POST /api/controls/:id/evidence`

## PSEO Landing Pages

- Use-case playbooks: `/solutions/[slug]` (100 pages)
- Industry playbooks: `/industries/[slug]` (100 pages)
- Country + industry playbooks: `/regions/[country]/industries/[industry]/[angle]` (100 pages)

### CSV-driven lists

- Edit `data/industries.csv` to control industry playbooks.
- Edit `data/countries.csv` to control country playbooks.
- Lists accept `|`-separated values for multi-value fields.
- Admin upload panel: `/admin/data`
- Lead export panel: `/admin/leads`
- Paid pilots admin: `/admin/pilots`

## Payments (Stripe)

Environment variables:
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PILOT_PRICE_ID`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_PILOT_PRICE_DISPLAY=€15,000`

## Admin Auth (Basic)

Protect `/admin` and export endpoints with Basic Auth:
- `ADMIN_USER`
- `ADMIN_PASS`

## Email Notifications (Resend)

Receive lead and pilot notifications via Resend:
- `RESEND_API_KEY`
- `RESEND_FROM`
- `NOTIFY_EMAIL`

## Booking Link

Display a Cal.com or Calendly booking link across CTAs:
- `NEXT_PUBLIC_BOOKING_URL`

## Multi-Tenant Architecture

- Each workspace gets a dedicated subdomain (`workspace.yourdomain.com`)
- Middleware rewrites subdomain traffic to `/s/[subdomain]`
- Tenant data is stored under `tenant:{subdomain}` keys
- AI systems live under `tenant:{subdomain}:systems`

## Deployment

This application is designed for Vercel. Add a wildcard DNS record (`*.yourdomain.com`) and configure the root domain in Vercel to enable subdomain routing.
