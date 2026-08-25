import PageHeader, { DocCode, DocSection } from '../_components/page-header'
import Preview from '../_components/preview'

export const metadata = { title: 'Typography' }

const specimens: {
  label: string
  sample: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'p'
}[] = [
  { label: 'Display', as: 'h1', className: 'display', sample: 'Resilient Relatives' },
  { label: 'Heading 1', as: 'h1', sample: 'Find help nearby' },
  { label: 'Heading 2', as: 'h2', sample: 'Tribal services' },
  { label: 'Heading 3', as: 'h3', sample: 'Crisis support' },
  {
    label: 'Lead',
    className: 'lead',
    sample: 'A Native-led resource for California Tribal communities.',
  },
  {
    label: 'Body',
    className: 'text-lg leading-body',
    sample:
      'Body copy uses Helvetica Now at 400, with 1.414 line-height so longer guidance stays readable.',
  },
  {
    label: 'Small',
    className: 'text-sm text-foreground-subtle',
    sample: 'Captions, meta, and helper text.',
  },
]

export default function TypographyPage() {
  return (
    <>
      <PageHeader
        title="Typography"
        description="Two local families: Helvetica Now for interface and body, Real Head for display headings."
      />

      <DocSection title="Font roles">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border bg-card p-6">
            <p className="text-sm text-foreground-muted">Body / UI</p>
            <p className="mt-2 font-sans text-2xl">Helvetica Now Text</p>
            <p className="mt-4 font-sans font-normal">Regular 400 — body, navigation, forms</p>
            <p className="font-sans font-medium">Medium 500 — emphasis, buttons</p>
            <p className="mt-4 text-sm text-foreground-subtle">
              CSS: <DocCode>--font-helvetica-now</DocCode> via <DocCode>font-sans</DocCode> and{' '}
              <DocCode>font-body</DocCode>
            </p>
          </div>
          <div className="rounded-xl border bg-card p-6">
            <p className="text-sm text-foreground-muted">Headings</p>
            <p className="mt-2 font-heading text-2xl">Real Head Pro</p>
            <p className="mt-4 font-heading font-medium">
              Bold 700 — page titles and section heads
            </p>
            <p className="mt-4 text-sm text-foreground-subtle">
              CSS: <DocCode>--font-real-head</DocCode> via <DocCode>font-heading</DocCode>. Color:{' '}
              <DocCode>text-foreground-heading</DocCode> (brand ink / logo blue).
            </p>
          </div>
        </div>
      </DocSection>

      <DocSection
        title="Scale"
        description="Live specimens using the same base styles as the public site."
      >
        <div className="space-y-6">
          {specimens.map(item => {
            const Tag = item.as ?? 'p'
            return (
              <Preview key={item.label} label={item.label}>
                <Tag className={item.className}>{item.sample}</Tag>
              </Preview>
            )
          })}
        </div>
      </DocSection>

      <DocSection
        title="Color"
        description="Headlines, the logo, and category icons share one brand token. h1–h6 and .display pick it up from globals.css — do not hardcode a blue."
      >
        <p className="max-w-reading text-foreground-subtle">
          <DocCode>--brand-emphasis</DocCode> resolves to <DocCode>brandInk-900</DocCode> in light and{' '}
          <DocCode>brandInk-400</DocCode> in dark (via <DocCode>--foreground-heading</DocCode>).
          That one semantic token also tints the logo and category icons through CSS masks. Override
          only when a heading is a quiet UI label (<DocCode>text-foreground-muted</DocCode>).
        </p>
      </DocSection>

      <DocSection title="Line height">
        <p className="max-w-reading text-foreground-subtle">
          Headings use <DocCode>leading-heading</DocCode> (1.125). Body uses{' '}
          <DocCode>leading-body</DocCode> (1.414). Keep headings tight and paragraphs open so crisis
          content does not feel dense.
        </p>
      </DocSection>
    </>
  )
}
