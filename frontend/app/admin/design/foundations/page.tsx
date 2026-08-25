import PageHeader, { DocCode, DocSection } from '../_components/page-header'

export const metadata = { title: 'Principles' }

export default function FoundationsPage() {
  return (
    <>
      <PageHeader
        title="Principles"
        description="Shared decisions that keep Resilient Relatives respectful, usable, and consistent as the interface grows."
      />

      <DocSection title="Sovereignty first">
        <p className="max-w-reading text-foreground-subtle">
          Design with Tribal communities, not over them. Content, identity, and contact paths stay
          in community control. Visual language supports that — it does not extract or costume it.
        </p>
      </DocSection>

      <DocSection title="Care in the interface">
        <p className="max-w-reading text-foreground-subtle">
          People may arrive in distress. Hierarchy is quiet, copy is plain, and emergency exits
          (quick hide, search) stay reachable. Motion is brief: cards lift 1% on hover, press to
          99%, and honor reduced-motion by zeroing <DocCode>--motion-fast</DocCode>.
        </p>
      </DocSection>

      <DocSection title="Clarity over decoration">
        <p className="max-w-reading text-foreground-subtle">
          One primary action. Semantic tokens (<DocCode>background</DocCode>,{' '}
          <DocCode>primary</DocCode>, <DocCode>foreground</DocCode>) rather than one-off hex. If a
          pattern is not in this catalog, it should not appear in production.
        </p>
      </DocSection>

      <DocSection title="Token layers">
        <ol className="max-w-reading list-decimal space-y-2 pl-5 text-foreground-subtle">
          <li>
            <strong className="text-foreground">Primitives</strong> — sand, brand ink, twilight,
            gold, terracota, sage, and related scales in CSS. Values are stable across appearances.
          </li>
          <li>
            <strong className="text-foreground">Semantic aliases</strong> —{' '}
            <DocCode>--background</DocCode>, <DocCode>--brand-emphasis</DocCode>,{' '}
            <DocCode>--content-article-surface</DocCode>, <DocCode>--primary</DocCode> mapped onto
            primitives (or baked dark tints). Dark remaps under <DocCode>.dark</DocCode> /{' '}
            <DocCode>data-color-scheme</DocCode> — same brand, #26231f canvas.
          </li>
          <li>
            <strong className="text-foreground">Product usage</strong> — Tailwind classes such as{' '}
            <DocCode>bg-primary</DocCode> and <DocCode>text-foreground</DocCode>.
          </li>
        </ol>
      </DocSection>

      <DocSection title="Interaction">
        <p className="max-w-reading text-foreground-subtle">
          Home, directory, and search cards share one language, documented as{' '}
          <DocCode>interactive-card</DocCode> and <DocCode>interactive-press</DocCode> in{' '}
          <DocCode>globals.css</DocCode>:
        </p>
        <ul className="mt-3 max-w-reading list-disc space-y-2 pl-5 text-foreground-subtle">
          <li>
            Hover on a mouse or trackpad warms the fill, strengthens the border, lifts 1%, and may
            zoom a cover 3% inside a clip. Tap uses press only, so a grown card does not stick.
          </li>
          <li>Press scales the card to 99% and the button to 98%.</li>
          <li>
            Durations are <DocCode>--motion-fast</DocCode> (120ms) with{' '}
            <DocCode>--easing-enter</DocCode>. Reduced motion sets those durations to 0.
          </li>
        </ul>
      </DocSection>

      <DocSection title="Protocol">
        <p className="max-w-reading text-foreground-subtle">
          Engineers and agents follow <DocCode>STANDARDS.md</DocCode> beside this catalog. In short:
        </p>
        <ul className="max-w-reading list-disc space-y-2 pl-5 text-foreground-subtle">
          <li>
            No Tailwind <DocCode>gray</DocCode>, <DocCode>red</DocCode>, <DocCode>blue</DocCode>, or
            raw <DocCode>black</DocCode> for chrome. Use semantic tokens.
          </li>
          <li>
            Add a primitive only when two screens need it, then document it on Components with its
            real states.
          </li>
          <li>
            New public routes join the axe list in <DocCode>e2e/a11y.spec.ts</DocCode>.
            Color-contrast is excluded so gold primary stays the brand; names, roles, and landmarks
            are not.
          </li>
          <li>
            Public site appearance toggles via <DocCode>AppearanceProvider</DocCode> on{' '}
            <DocCode>html</DocCode>. Preview the same contract with the Light/Dark control in this
            catalog.
          </li>
        </ul>
      </DocSection>
    </>
  )
}
