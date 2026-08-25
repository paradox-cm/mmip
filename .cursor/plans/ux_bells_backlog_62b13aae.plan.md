---
name: UX bells backlog
overview: "Implement Lanes A–D only, in sequence: finish wired surfaces, then editorial chrome, then directory actions, then mixed search. Lanes E (crisis chrome) and F (new CMS blocks) are deferred."
todos:
  - id: finish-wired
    content: "Lane A: featured services, CTA links, byline, footerNav, PT h4/blockquote, sitemap, search copy"
    status: completed
  - id: reading-chrome
    content: "Lane B: breadcrumbs, last reviewed, reading time, share/copy/print action bar, related-by-topic"
    status: completed
  - id: directory-actions
    content: "Lane C: tribe/service contact rows — 44px targets, maps link, copy phone/address, share listing"
    status: completed
  - id: search-mix
    content: "Lane D: type chips, honest counts, empty state, typeahead, then mount ⌘K"
    status: completed
  - id: safer-exit
    content: "Lane E deferred: hide-website name, Esc, history note, Get Help singleton"
    status: cancelled
  - id: cms-blocks
    content: "Lane F deferred: callout/steps portable-text, tags, structured hours, submit-a-resource"
    status: cancelled
isProject: false
---

# UX bells — Lanes A–D only, one at a time

Scope is **A then B then C then D**. Do not mix lanes in the same pass. Do not implement E (crisis chrome) or F (new authoring blocks). Command palette mounts only at the end of D, after typeahead works.

Stay on existing routes and tokens. No dark mode, auth, maps embed, PWA, or push.

```mermaid
flowchart LR
  laneA[LaneA_finishWired] --> laneB[LaneB_readingChrome]
  laneB --> laneC[LaneC_directoryActions]
  laneC --> laneD[LaneD_mixedSearch]
```

---

## Lane A — Finish what is already wired (this pass)

- Featured services on home: project `commonServiceFields`, honor `showFeaturedServices`, render `ServiceCard` grid in [home-page.tsx](frontend/app/(site)/(home)/home-page.tsx).
- CTA buttons: `Button asChild` + `ResolvedLink` in [cta.tsx](frontend/app/components/shared/cta.tsx). Include `href` (and post `categorySlug`) in `linkReference` so URL/post links resolve.
- Author byline: uncomment `Avatar` in [post-template.tsx](frontend/app/(site)/[...slug]/_components/post-template.tsx); `font-sans` on the byline.
- Footer: render [footerNav](studio/src/schemas/singletons/navigation.ts) when present; keep the primaryNav heuristic as fallback so an empty CMS field does not blank the footer. Keep Connect/email.
- Portable text: `h4`, `blockquote`, `small` in [portable-text.tsx](frontend/app/components/shared/portable-text.tsx); include `h4` in the TOC headings query.
- Sitemap: pages, posts, tribes, services, categories, topics, plus index routes `/tribes`, `/services`, `/search`, `/articles`, `/guides`, `/tools`.
- Search copy: say “results”, not “posts”. Full empty-state + chips wait for D.
- Do **not** mount the command palette.

Skip: `next-pwa`, `web-push`, `get-started-code`, unused `posts.tsx` onboarding.

---

## Lane B — Editorial reading chrome (after A)

Breadcrumbs on post/tribe/service/category. `lastReviewed` datetime + reading time. Share / copy link / print action bar (44px, `focus-ring`). Related posts queried by topic. Document on `/admin/design/patterns`.

**Out of this lane:** callout/warning/steps blocks (Lane F).

---

## Lane C — Directory actions (after B)

Contact rows: 44px targets + `focus-ring`. Open in maps from address. Copy phone/address. Share listing (reuse B’s share control).

**Out of this lane:** open-now, pack-a-list, ZIP/distance, map embed.

---

## Lane D — Search as a mixed index (after C)

Type chips (All / Articles / Guides / Tools / Services / Tribes). Honest counts. Empty state with links to `/tribes` and `/services`. Typeahead under HeroSearch. Then mount command palette. Fail closed when Algolia is unset (existing 5xx skip).

---

## Explicitly deferred

- **Lane E:** hide-website label, Esc, history-burying, safety note, Get Help singleton.
- **Lane F:** portable-text callouts/steps, tags, structured hours, submit-a-resource.
- Dark mode, accounts, interactive maps, PWA, web push.
