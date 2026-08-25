# Design QA: Animated Resilient Relatives Seal

## Evidence

- Source of truth: `/Users/christophermena/Repos/caseykennedy-mmip/frontend/public/SEAL-Lg.svg`
- Implementation: `http://localhost:3100/admin/design/seal`
- Reference capture: `/tmp/rr-seal-source-normalized.png`
- Latest completed-frame capture: `/tmp/rr-seal-implementation-normalized.png`
- Latest completed-frame comparison: `/tmp/rr-seal-source-vs-implementation.png`
- Post-pivot-fix capture: blocked; the configured browser rejected access to the local preview during this QA pass.
- Full-page captures: `/tmp/rr-seal-page-light-1440-final.jpg`, `/tmp/rr-seal-page-dark.png`, `/tmp/rr-seal-page-mobile-dark.png`
- Comparison state: completed animation frame, light theme
- Reference and implementation were normalized to 368 × 378 pixels before comparison. The inline artwork retains the source `viewBox="0 0 244 251"` and scales at native vector density.

## Fidelity review

- Typography: passed. All 38 original lettering and separator-dot paths are preserved; no font substitution or redrawing is present.
- Spacing and geometry: passed. California, handprint, texture cutouts, circular lettering, and separators align with the original artwork in the side-by-side comparison.
- Colors: passed. Light-mode seal tokens reproduce the source terracotta and gold; dark-mode tokens provide the intended higher-contrast adaptation.
- Image quality: passed. The rendered seal remains sharp at the 368 × 378 desktop preview size and the 292 × 300 mobile preview size, with no raster scaling or clipping.
- Copy: passed. The two original “Resilient Relatives” phrases and page documentation copy are complete and legible.

## Interaction and accessibility review

- Autoplay starts once, completes at approximately four seconds, and remains in the completed state.
- Mouse or pen hover gradually rotates the lettering clockwise at an approximately 45-second revolution while the California mark remains fixed.
- Pointer exit eases the lettering back to its original alignment without snapping.
- The hover transform now uses the SVG-space center `122, 125.5`, so the pivot is independent of responsive CSS size and shared-component placement.
- Click/tap restart works at any point. The control is a native button with an accessible replay label, visible focus treatment, and native Enter/Space activation semantics.
- Reduced-motion styles and logic expose the completed frame immediately and suppress replay motion.
- The completed, outline, fill, and sequential lettering states were inspected in-browser. Light and dark themes were checked.
- Desktop (1440 × 1000) and mobile (390 × 844) layouts were inspected with no horizontal overflow.
- Browser console inspection returned no page errors.

## Comparison history

1. First source-versus-rendered comparison: no P0, P1, or P2 visual differences. The preview canvas background and dark-theme color mapping are intentional design-system treatments, not source-geometry differences.
2. A P2 hover-motion regression was reported after the seal moved into the shared component: the lettering no longer appeared to rotate around the seal center. The responsive CSS-pixel pivot was replaced with an explicit SVG transform around the source viewBox center (`rotate(angle 122 125.5)`). Formatting, lint, TypeScript, and diff checks pass. Post-fix visual evidence is still required because browser access was blocked during this pass.

## Environment notes

- The local preview displays the repository's existing Sanity Live CORS notice because this localhost origin is not allowlisted; it is unrelated to the seal page and does not generate a browser console error in this session.
- Reduced-motion media emulation and synthetic Enter/Space dispatch were not available through the configured browser automation surface; both paths were verified from the native button structure and reduced-motion implementation.
- The configured in-app browser rejected access to the localhost preview during the post-pivot-fix QA pass, so the centered hover orbit could not be visually recaptured.

final result: blocked
