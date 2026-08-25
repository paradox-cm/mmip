# Resilient Relatives — UI standards

**Audience:** anyone building product UI in this Next.js + Sanity app.
**Live catalog:** `/admin/design`

This is the protocol for composing Resilient Relatives screens. It does not replace Casey’s brand (gold, sand, twilight, Helvetica Now, Real Head). It tells you how those tokens must be used.

## 1. Identity

- Gold is for doing, not decorating. One primary action per view.
- Sand is the ground. Brand ink (the logo blue) is headlines. Twilight is body text. Content-type tints (article, guide, tool, service) are labels, not new brands.
- Hierarchy stays quiet. People may arrive in distress. Emergency exits (skip link, search, hide website) keep their names.

## 2. Anti-patterns (explicit bans)

| Ban                                                               | Instead                                                                   |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Tailwind `gray-*`, `red-*`, `blue-*`, `cyan-*`, `black` as chrome | Semantic tokens: `background`, `foreground`, `primary`, `error`, `border` |
| Raw hex in `app/components` or `app/(site)`                       | CSS variables in `globals.css`                                            |
| Page-specific button styles                                       | `Button` variants                                                         |
| Color-only status                                                 | Icon or text plus color                                                   |
| Removing focus outlines                                           | Shared `.focus-ring`                                                      |
| Inventing primitives for the catalog                              | Document what production already uses                                     |
| Page-specific card hover or press                                 | Shared `.interactive-card` / `.interactive-press`                         |

Third-party marks in SVG (for example the Sanity logo) may keep vendor fills. They are not product chrome.

## 3. Accessibility

- WCAG 2.2 AA is the floor.
- Every control has a visible gold focus ring (`.focus-ring`), an accessible name, and a 44×44 CSS-pixel target on default and icon buttons.
- Cards are a single named link. Decorative images inside them use empty `alt`.
- `prefers-reduced-motion` disables smooth-scroll and component transitions (`--motion-fast` becomes `0ms`).
- Cards and tiles use `.interactive-card`: a 1% hover lift (fine pointers only), a 1% press shrink, warmer fill (`card-hover` or the content-type 100 step), and a stronger border. Cover images use `.interactive-media` (3% crop zoom). Buttons except `link` use `.interactive-press` (2% press). Do not invent a second hover language on the home page.
- Automated gate: `pnpm --filter frontend test:a11y` (axe-core over public + design-system routes). Color-contrast is excluded: gold primary is the brand. Structural rules are not. Closed Radix dialogs leave `aria-controls` pointing at unmounted content; that incomplete check is reviewed as Radix’s contract, not a product defect. Routes that 404 or 5xx (for example `/search` without Algolia) are skipped, not failed. New public routes must be added to `e2e/a11y.spec.ts`.

## 4. Tokens

- Primitives live in `frontend/app/globals.css`.
- Components consume semantic Tailwind aliases (`bg-primary`, `text-foreground`, `text-foreground-heading`, `border-strong`).
- **Dark mode:** semantic aliases remap under `.dark` / `data-color-scheme` (foundation, brand-emphasis, content-type tints). **Primitives stay honest** — product code uses `bg-content-*` for card/badge tints, not `dark:bg-twilight-*` etc.
- **Brand blue:** use `--brand-emphasis` (headings, logo via `.logo-mark`, category icons via `.taxonomy-icon`). Do not hardcode blue primitives at call sites.
- **CMS artwork:** `.brand-artwork` is the only approved wrapper for fixed-color Sanity images; it may apply a dark filter. Prefer `TaxonomyIcon` masks when a local icon exists.
- **Light primary:** `gold-900` fill with white ink (~5.3:1). Dark primary stays `gold-400` with umber label.
- Token hygiene gate: `node scripts/check-token-hygiene.mjs` (or `pnpm --filter frontend check:tokens` when wired).
- Visual check after token changes: `/admin/design/color` and at least one pattern page.

## 5. When to add a component

Add to `app/components/ui/` only when two or more screens need the same primitive. Otherwise compose from existing UI. Document every new primitive on `/admin/design/components` with default, hover/focus, disabled, and error where they exist.

## 6. Governance

- `/admin/design` is noindex and disallowed in `robots.ts`. Do not add it to the sitemap.
- Do not wrap design-system routes in the public header/footer.
- Do not introduce a second brand or unused shadcn primitives to “complete” the catalog.
- Dark theme is the same brand (sand + gold), remapped under `.dark` in `globals.css`. The public site and this catalog share `AppearanceProvider` / `data-color-scheme` on `html`.
