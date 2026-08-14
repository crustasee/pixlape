# ModTrove — Agent Guide

## Project Overview

**ModTrove** is a Neo-Brutalist digital asset vault (marketplace) built with Next.js 14 App Router. It lists digital goods (icons, brushes, fonts, audio, browser extensions, CLI tools, templates) with filtering, search, preview, and an admin panel for CRUD operations. Assets are currently hardcoded in a static data module — no real database-backed persistence for the public catalog.

## Essential Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server on `http://localhost:3000` |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run Next.js lint (ESLint) |

No test framework or test scripts exist in the project.

## Project Structure

```
src/
├── app/                     # Next.js App Router pages & API routes
│   ├── layout.tsx           # Root layout (MarqueeTicker, Header, Footer, BottomBar)
│   ├── middleware.ts        # Admin route protection (dev-mode bypass)
│   ├── (public)/            # Public-facing pages
│   │   ├── page.tsx         # Homepage (asset grid + sidebar + modal)
│   │   ├── products/        # Product catalog page
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   ├── cart/            # Cart page (placeholder)
│   │   └── chart/           # Chart page (placeholder)
│   ├── (admin)/             # Admin panel (dark theme, separate layout)
│   │   └── admin/
│   │       ├── layout.tsx   # AdminShell with AdminSidebar
│   │       ├── page.tsx     # Dashboard with stat cards + product table
│   │       ├── products/    # Product CRUD pages
│   │       ├── orders/      # Orders list
│   │       ├── users/       # Users list
│   │       ├── settings/    # Settings
│   │       ├── tools/       # Admin tools
│   │       └── changelog/   # Changelog
│   ├── api/                 # API routes
│   │   ├── public/products/ # GET all assets (JSON)
│   │   ├── admin/products/  # GET/POST products (in-memory only)
│   │   ├── admin/orders/    # Orders endpoint
│   │   ├── admin/stats/     # Hardcoded stats
│   │   └── auth/[...nextauth]/ # NextAuth placeholder (no providers configured)
│   ├── preview/[id]/        # Asset detail preview page
│   ├── premium-preview/[id]/# Premium asset preview page
│   ├── blog/                # Blog page
│   ├── help/                # Help page
│   └── about/               # About page
├── components/
│   ├── ui/                  # Reusable UI primitives (Button, Input, Modal, Badge, Table)
│   ├── assets/              # AssetCard, AssetGrid, QuickModal
│   ├── layout/              # Header, Sidebar, Footer, BottomBar, MarqueeTicker
│   └── admin/               # AdminHeader, AdminSidebar, ProductForm, ProductTable, StatCard
├── data/
│   ├── assets.ts            # Static asset database (41 items across 5 categories)
│   ├── blogs.ts             # Static blog posts
│   └── faqs.ts              # Static FAQ items
├── hooks/
│   ├── useAssetFilter.ts    # Client-side filtering, search, sort logic
│   └── useTheme.ts          # Light/dark toggle with localStorage persistence
├── lib/
│   ├── utils.ts             # cn() classname helper, formatCurrency()
│   ├── db.ts                # Prisma client singleton (null — not instantiated)
│   ├── auth.ts              # NextAuth config (no providers configured)
│   ├── asset-service.ts     # Static asset query service (getAll, getById, filter, stats)
│   └── admin-guard.ts       # Admin role check & request verification
├── types/
│   ├── index.ts             # AssetItem, BlogPost, FAQItem, CategoryType, OSFilterType, SortOption
│   ├── product.ts           # Product, CreateProductInput
│   ├── order.ts             # Order, OrderItem, OrderStatus
│   └── user.ts              # User, UserRole
└── styles/
    └── globals.css          # CSS custom properties, Tailwind v4, Neo-Brutalist design tokens
```

## Key Architecture & Data Flow

### Two Data Layers (Important Gotcha)

The project has **two parallel data systems** that are NOT connected:

1. **Static asset data** (`src/data/assets.ts`): The `ASSET_DATABASE` record and `ASSETS_DATA` array power the public site. This is the real catalog — 41 items across 5 categories. **All filtering, search, sorting happens client-side** via `useAssetFilter` hook.

2. **Prisma/PostgreSQL schema** (`prisma/schema.prisma`): Models `User`, `Product`, `Order`, `OrderItem` with proper relations. But `src/lib/db.ts` exports `db = null` — the Prisma client is never instantiated. The API routes (`/api/admin/products`, `/api/admin/orders`, `/api/admin/stats`) return hardcoded or in-memory data, not database queries.

**This means:** Adding database-backed features requires wiring up Prisma properly (instantiating the client in `db.ts`, replacing mock data in API routes, adding seed data).

### Public Site Flow

1. Root layout (`src/app/layout.tsx`) renders MarqueeTicker → Header → main → Footer → BottomBar
2. Homepage (`src/app/(public)/page.tsx`) uses `useAssetFilter` hook which pulls from `ASSET_DATABASE`
3. `Sidebar` component shows category buttons (5 categories) and OS filter buttons
4. `AssetGrid` shows search bar, sort dropdown, and grid of `AssetCard` components
5. `QuickModal` shows asset details on "quick view" click
6. `AssetCard` links to `/preview/[id]` or `/premium-preview/[id]` for detail pages

### Admin Panel Flow

1. `AdminLayout` (dark theme, `bg-gray-950`) wraps all admin pages with `AdminSidebar`
2. Dashboard shows stat cards, category breakdown, and `ProductTable` (all from static data)
3. `ProductForm` is a full CRUD form but data is only submitted in-memory (POST to `/api/admin/products` returns a mock created object)
4. Admin routes are protected by middleware (`src/middleware.ts`) — but **only in production**, dev mode passes through

## Naming Conventions & Style Patterns

- **File naming**: PascalCase for components (`AssetCard.tsx`, `AdminSidebar.tsx`), kebab-case for pages (`page.tsx`, `layout.tsx`, `route.ts`)
- **Components**: `export const ComponentName: React.FC<Props>` pattern (not default exports, not function declarations)
- **'use client'**: All components that use React hooks, event handlers, or browser APIs use the `'use client'` directive
- **Path alias**: `@/*` maps to `./src/*`
- **CSS**: Tailwind utility classes almost exclusively — global CSS only for custom properties and a few `.neo-glass` utility classes
- **Admin uses dark theme** (`bg-gray-950`, `text-gray-100`) while public site uses neo-brutalist light theme (`bg: #F7EDDA`)

## Neo-Brutalist Design System

- **4 fonts**: Space Grotesk (headings), Plus Jakarta Sans (body), Space Mono (mono), Press Start 2P (pixel)
- **8 neon colors**: acid-mint, signal-blue, brute-orange, poster-yellow, system-indigo, riot-purple, nb-white, nb-black
- **Shadow system**: `shadow-hard` (5px offset), `shadow-hard-lg` (8px), `shadow-hard-sm` (3px)
- **Border**: All cards use `border-2 border-border-color` with hard shadows
- **Dark mode**: Toggle via `data-theme="dark"` attribute on `<html>`, persisted in `localStorage` key `modtrove_theme`
- **Tailwind v4**: The project uses Tailwind CSS v4 with `@tailwindcss/postcss` (not the v3 PostCSS plugin). The globals.css imports Tailwind via `@import "tailwindcss"` and references the config file with `@config`

## Important Gotchas

1. **Prisma is not wired up**: `db` is always `null`. The `DATABASE_URL` env var exists but no Prisma client is instantiated. Any database work requires first fixing `src/lib/db.ts`.
2. **NextAuth has no providers**: `src/lib/auth.ts` exports `authOptions` with an empty `providers: []` array. Auth is non-functional.
3. **Admin middleware is a no-op in dev**: Middleware only checks for `admin_token` cookie in production. In dev, all admin routes are open.
4. **No slug uniqueness**: The `Product` model has `slug` as `@unique` but `CreateProductInput` makes `slug` optional. The `AssetItem` type has no `slug` field at all — only `id`.
5. **Test framework**: None exists. No Jest, Vitest, Playwright, or Cypress config.
6. **`.npmrc` uses `allow-scripts`**: Only `@radix-ui/react-slot` and `lucide-react` are allowed to run postinstall scripts. If adding packages that need postinstall scripts, update `.npmrc`.
7. **`next.config.mjs` has `images.unoptimized: true`**: Static export compatible, no Next.js image optimization. If using external images, this needs changing.
8. **Two `Assets/` directories**: One at root `Assets/` and one in `public/Assets/`. Both contain duplicate image assets. The public site references paths like `/Assets/img/cdraw.png` which resolve to `public/Assets/img/`.
9. **`components.json` (shadcn/ui)**: Uses `"style": "base-nova"` — a custom non-standard variant. The `menuColor` and `menuAccent` fields are also non-standard.
10. **`package.json` scripts**: Only `dev`, `build`, `start`, `lint`. No `test`, `format`, `typecheck`, or `db:generate` scripts.

## Environment Variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `DATABASE_URL` | Yes (for Prisma) | PostgreSQL connection string |
| `NEXTAUTH_URL` | Yes (for NextAuth) | `http://localhost:3000` in dev |
| `NEXTAUTH_SECRET` | Yes (for NextAuth) | JWT signing secret |
| `ADMIN_SECRET` | No | Admin header auth (`x-admin-secret`) |

## Type System

- `AssetItem` (frontend type) — covers the static asset catalog. Has `id: number`, `rating: string`, `downloads: string`, `price?: string`, optional `isPremium`.
- `Product` (backend type) — covers Prisma-backed products. Has `id: string | number`, `rating: string | number`, `downloads: string | number`, `price: number | string`, required `isPremium`.
- These two types overlap but are not identical — be careful when converting between them (e.g., admin dashboard slices `AssetItem` and manually parses `price` from `"$29"` to `0`).