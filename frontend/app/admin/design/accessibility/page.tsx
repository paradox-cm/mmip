import { Button } from '@/app/components/ui/button'

import PageHeader, { DocCode, DocSection } from '../_components/page-header'
import Preview from '../_components/preview'

export const metadata = { title: 'Accessibility' }

export default function AccessibilityPage() {
  return (
    <>
      <PageHeader
        title="Accessibility"
        description="WCAG 2.2 AA is the floor: visible focus, 44px targets, names for every control, and meaning that is never color-only."
      />

      <DocSection title="Focus">
        <p className="max-w-reading text-foreground-subtle">
          Interactive elements use the shared <DocCode>focus-ring</DocCode> class: a 2px gold outline
          with 3px offset so the ring stays visible on primary gold. Invalid fields use the error
          color for the same ring. Do not remove outlines. Do not replace them with a low-contrast
          box-shadow.
        </p>
        <Preview label="Focus the controls with a keyboard">
          <div className="flex flex-wrap gap-3">
            <Button>Primary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </Preview>
      </DocSection>

      <DocSection title="Color and contrast">
        <ul className="max-w-reading list-disc space-y-2 pl-5 text-foreground-subtle">
          <li>
            <DocCode>--brand-emphasis</DocCode> tints headings, the logo, and category icons. In
            dark it clears ~6.1:1 on the canvas and ~5.2:1 on cards.
          </li>
          <li>
            Light primary buttons use <DocCode>gold-900</DocCode> with white ink (~5.3:1). Dark
            primary stays <DocCode>gold-400</DocCode> with umber label (~12:1).
          </li>
          <li>
            Brighter gold for links and focus rings remains brand-exempt in the automated axe gate.
            See the button contrast table on the Components page.
          </li>
        </ul>
      </DocSection>

      <DocSection title="Targets and motion">
        <ul className="max-w-reading list-disc space-y-2 pl-5 text-foreground-subtle">
          <li>Default and icon buttons are at least 44×44 CSS pixels.</li>
          <li>Cards are a single link with an accessible name (the title).</li>
          <li>Decorative images inside those links use empty alt text.</li>
          <li>
            <DocCode>prefers-reduced-motion</DocCode> disables page smooth-scroll and component
            transitions by setting <DocCode>--motion-fast</DocCode> to 0ms. Cards do not scale.
          </li>
          <li>
            Automated coverage: <DocCode>pnpm --filter frontend test:a11y</DocCode> runs axe-core
            (WCAG 2.2 AA tags) on public routes and this catalog. Color-contrast is excluded: gold
            primary is the brand. Structural rules are not.
          </li>
        </ul>
      </DocSection>

      <DocSection title="Escape and landmarks">
        <p className="max-w-reading text-foreground-subtle">
          The public header includes a skip link, a labeled search control, and a “Hide website
          quickly” action. Keep those names. The design system shell has its own skip link into{' '}
          <DocCode>#ds-content</DocCode>.
        </p>
      </DocSection>
    </>
  )
}
