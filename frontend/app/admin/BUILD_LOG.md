# Resilient Relatives — build log

**Audience:** anyone picking up this webapp.  
**Source of this page:** `frontend/app/admin/BUILD_LOG.md` (also served as [raw Markdown](/admin/build-log/raw))  
**Last updated:** 31 August 2026  
**Working copy:** [paradox-cm/mmip](https://github.com/paradox-cm/mmip) (`mmip-p2`) · **upstream:** [caseykennedy/mmip](https://github.com/caseykennedy/mmip)

This log is the record of the P2 pass: taking Casey Kennedy’s MMIP site to the public Resilient Relatives webapp. It separates what we inherited from what this pass added, and it is honest about what is still open.

---

## Status at a glance

| Area | Standing |
| --- | --- |
| Public site chrome | Shipped: header, footer, appearance, hide-website, skip link, command palette |
| Design system | Shipped as a live catalog at `/admin/design` |
| Content model | Shipped in Sanity: posts, pages, services, tribes, categories, topics, tags |
| Search | Implemented (Algolia, three indexes). Production still needs the handoff keys and webhook |
| Admin console | Hub into existing tools. Sign-in at `/admin/login` (`ADMIN_BASIC_USER` / `ADMIN_BASIC_PASSWORD`) |
| PWA / web push | Scaffold only. Not a product surface |
| Crisis extras (Lane E) | Deferred, except hide-website + `/api/escape` |
| New CMS blocks (Lane F) | Deferred |

---

## How this repo started

Work began by downloading [caseykennedy/mmip](https://github.com/caseykennedy/mmip) — a Next.js 15 + Sanity Studio monorepo that had already left the generic Sanity clean template and become a Cahuilla / MMIP resource site branded **Resilient Relatives**.

The upstream history (July 2025 – May 2026) is the product skeleton: schema, routing, search, tribes, services, and a first visual pass. This working copy (`paradox-cm/mmip`, branch `mmip-p2`, August 2026) is the P2 pass: token contract, design-system catalog, public-site UX, accessibility gates, and deploy hardening.

Local remotes:

- `origin` → `https://github.com/paradox-cm/mmip.git`
- `upstream` → `https://github.com/caseykennedy/mmip.git` (fetch only)

Run it as a pnpm workspace from the repo root: `pnpm dev` starts Next on port 3000 and Studio on port 3333.

---

## What we inherited (Casey, 2025-07 to 2026-05)

The download was not an empty starter. These pieces were already established and are still the bones of the app.

### Platform

- Monorepo: `frontend/` (Next.js App Router) and `studio/` (Sanity).
- Live Content API, Presentation / visual editing, draft mode at `/api/draft-mode/enable`.
- Page builder with two block types: call to action and info section.
- Sanity project `t4dq0r7i`, dataset `production` (public defaults in code if env is empty).

### Information architecture

Sanity documents and how they route on the site:

| Type | Route | Notes |
| --- | --- | --- |
| Home singleton | `/` | Hero, featured posts (and a featured-services field that is queried but not rendered) |
| Page | `/{slug}` | Page builder; catch-all with posts |
| Post | `/{category}/{slug}` | Types: article, guide, tool |
| Category / topic indexes | `/{slug}` | Directory templates |
| Post-type indexes | `/articles`, `/guides`, `/tools` | |
| Service | `/services/{slug}` | Contact info, region, service type |
| Tribe | `/tribes/{slug}` | Contact info, region |
| Search | `/search` | Algolia; fails closed when keys are missing |

Studio structure groups **Home / Navigation / Settings**, then **Resources** (posts, pillar categories, topics, tags), **Services**, and **Tribes**. That Studio is the CMS admin — it is not this `/admin` console.

### Search (already in upstream)

- Algolia indexes: `posts`, `services`, `tribes`.
- Indexing route: `POST /api/search/index` (Bearer `SANITY_WEBHOOK_SECRET`).
- Development-only `GET` on the same route, which the old `/admin` page called.
- Command palette (`cmdk`) on the public site.
- Handoff notes live in `frontend/SEARCH_HANDOFF.md`.

### Safety and install scaffolding (upstream, unfinished as product)

- Hide-website control in the public header → `GET /api/escape` (random benign news/weather URL).
- `next-pwa`, `web-push`, and `push-manager.tsx` exist as stubs, not a shipped install/push experience.
- `onboarding.tsx` is leftover Studio-empty-state UI from the template.

### The old `/admin` page

A development-only screen: one button, “Reindex Algolia Search,” and a JSON dump. No layout, no nav, no link to Studio or to the design catalog that later landed beside it at `/admin/design`. That catalog had a proper shell; `/admin` itself did not.

---

## What P2 added (August 2026)

Commits from `69bbc54` through `a0057bb` (21–24 August 2026), plus the open working tree.

### 1. Token contract and appearance

- Semantic tokens in `frontend/app/globals.css` (sand ground, gold for doing, brand-emphasis ink, content-type tints).
- Dark appearance remaps those semantics under `.dark` / `data-color-scheme`. Primitives stay honest.
- `AppearanceProvider` + boot script on `html`; toggle in the public header.
- Shared interaction: `.focus-ring`, `.interactive-card`, `.interactive-press`, 44px targets.
- Fonts: Helvetica Now (UI) and Real Head (headings), loaded through `app/fonts`.
- Hygiene script: `frontend/scripts/check-token-hygiene.mjs` (not yet wired as `pnpm check:tokens`).

Protocol: `frontend/app/admin/design/STANDARDS.md`.

### 2. Design system catalog — `/admin/design`

A noindex living catalog, **not** wrapped in the public header/footer:

- Overview, Principles, Brand assets, Seal, Color, Typography, Spacing, Accessibility, Components, Patterns.
- Demos use production primitives (`Button`, cards, `HeroSearch`, `ContactPanel`, `PageActions`).
- Brand asset pipeline: `pnpm --filter frontend assets:brand` and `check:brand-assets`.
- Seal animation from `public/SEAL-Lg.svg` via `lib/seal-markup.ts`.
- Taxonomy icons as CSS masks (`TaxonomyIcon`) so dark mode does not need per-asset filters.

### 3. Public site UX (plan: “UX bells” lanes A–D)

Implemented on existing routes and tokens:

- **Lane A (finish wired):** CTA as `Button asChild` + resolved links; portable text `h4` / `blockquote` / `small`; footer uses CMS `footerNav` with a primaryNav fallback; search copy says “results.” Featured services are in the home GROQ query but are **not** shown on the homepage (the empty aside was removed in the current working tree).
- **Lane B (reading chrome):** breadcrumbs, share / copy / print (`PageActions`), related-by-topic where wired. Reading-time helper was added then removed in the working tree.
- **Lane C (directory actions):** `ContactPanel` — 44px rows, maps link, copy phone/address, share listing.
- **Lane D (mixed search):** type chips (All / Articles / Guides / Tools / Services / Tribes), honest counts, typeahead under hero search, command palette mounted after typeahead.

**Explicitly deferred**

- **Lane E:** hide-website already exists. Get Help shipped at `/get-help`. Remaining crisis chrome (Esc, history note) is still deferred.
- **Lane F:** portable-text callouts/steps, tags as a public surface, structured hours, submit-a-resource.

### 4. Platform and deploy

- Public pages live in the `(site)` route group so they share header/footer; `/admin` does not.
- Published Vercel builds can run without `SANITY_API_READ_TOKEN` (token still required for draft / Presentation).
- Empty Sanity env vars fall back to the Studio project id/dataset.
- Static prerender and home/footer contrast fixes (24 August).
- Search client returns `null` when Algolia public keys are unset so Preview can still collect routes.

### 5. Accessibility gate

- Playwright + axe-core: `frontend/e2e/a11y.spec.ts` (public routes + design-system catalog).
- Gold primary contrast is brand-exempt; structural rules are not.
- Routes that 404 or 5xx (for example `/search` without Algolia) are skipped, not failed.
- Scripts named in STANDARDS (`test:a11y`, `check:tokens`) are **not** in `frontend/package.json` yet; run Playwright and the hygiene script directly.

### 6. Admin console (this page, 25 August 2026)

`/admin` is now the internal hub:

- Same chrome as the design catalog (sidebar, theme toggle, skip link, no public header).
- Links to the design system, Sanity Studio, public search, and this build log.
- Algolia reindex kept as a **development-only** tool (the GET indexer is already 403 in production).
- Search configuration is shown as present/missing only — no secrets.
- `/admin` is noindex, disallowed in `robots.ts`, and gated by `/admin/login` plus an httpOnly session cookie (`ADMIN_BASIC_USER` / `ADMIN_BASIC_PASSWORD`). Production fails closed if those are unset. Reindex stays local-dev.

---

## Where things live

| Concern | Path |
| --- | --- |
| Public routes | `frontend/app/(site)/` |
| Admin hub + build log | `frontend/app/admin/` |
| Design catalog | `frontend/app/admin/design/` |
| UI primitives | `frontend/app/components/ui/` |
| Site chrome | `frontend/app/components/global/` |
| Shared product UI | `frontend/app/components/shared/` |
| Algolia | `frontend/lib/algolia/`, `frontend/app/api/search/index/` |
| Sanity queries / fetch | `frontend/sanity/` |
| Studio schema | `studio/src/schemas/` |
| Token hygiene | `frontend/scripts/check-token-hygiene.mjs` |
| Search handoff | `frontend/SEARCH_HANDOFF.md` |
| P2 merge handoff | `docs/CASEY_MERGE_HANDOFF.md` |

---

## Working tree at last update

Not yet committed when this log was written:

- About-page artwork (`about-artwork.tsx`, `public/images/about-01.png`).
- Homepage: unused featured-services aside removed (query still requests `featuredServices`).
- Page builder / block renderer typed against Sanity unions (exhaustive `callToAction` \| `infoSection`).
- Search hook: Algolia results narrowed without `any`.
- Reading-time helper deleted; call sites stripped from post / tribe / service templates.
- Small layout, footer, CTA, info-section, and Studio config cleanups.

Treat that list as in-flight, not as shipped.

---

## Open work (do not call the site finished)

1. **Algolia production handoff** — create keys, set Vercel env, run an authenticated full index, attach the Sanity webhook. See `frontend/SEARCH_HANDOFF.md`. Until then, `/search` and the command palette degrade to “temporarily unavailable.”
2. **Featured services on home** — schema and query exist; the grid is not rendered.
3. **Sitemap indexes** — `/`, `/get-help`, `/services`, `/tribes`, and CMS pages, posts, services, and tribes are included with canonical `NEXT_PUBLIC_BASE_URL`. `/search`, `/articles`, `/guides`, and `/tools` are still not listed.
4. **Package scripts** — wire `check:tokens` and `test:a11y` (or stop advertising those names in STANDARDS).
5. **PWA / push** — either finish `push-manager` and service-worker headers or remove the dead path so it does not look like a feature.
6. **Onboarding component** — delete once Studio has real content and `NEXT_PUBLIC_SANITY_STUDIO_URL` is a real URL.
7. **Studio URL default** — `studioUrl` falls back to the slug `cahuilla-mmip`, not `http://localhost:3333`. Set `NEXT_PUBLIC_SANITY_STUDIO_URL` in `.env.local`.
8. **Admin auth on Vercel** — `/admin/login` is in place. Copy `ADMIN_BASIC_USER` (`mmip-admin`) and `ADMIN_BASIC_PASSWORD` from `frontend/.env.local` into Vercel Production and Preview, then redeploy so middleware can sign sessions. Do not reuse `SANITY_WEBHOOK_SECRET`. Reindex stays local-dev.
9. **Lanes E and F** — still deferred on purpose.

---

## How to verify a local build

```sh
pnpm dev
```

- Site: [http://localhost:3000](http://localhost:3000)
- Admin hub: [http://localhost:3000/admin](http://localhost:3000/admin) (redirects to `/admin/login`; user `mmip-admin`)
- Design system: [http://localhost:3000/admin/design](http://localhost:3000/admin/design)
- Studio: [http://localhost:3333](http://localhost:3333)

```sh
pnpm --filter frontend check:search          # needs frontend/.env.local
pnpm --filter frontend check:brand-assets
node frontend/scripts/check-token-hygiene.mjs
pnpm --filter frontend exec playwright test  # axe gate; needs a running app or the Playwright webServer
```
