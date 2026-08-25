import PageHeader, { DocCode, DocSection } from '../_components/page-header'

export const metadata = { title: 'Spacing' }

const spaceSamples = [
  { label: '4', className: 'size-4', token: '1rem' },
  { label: '6', className: 'size-6', token: '1.5rem' },
  { label: '8', className: 'size-8', token: '2rem' },
  { label: '12', className: 'size-12', token: '3rem' },
  { label: '16', className: 'size-16', token: '4rem' },
  { label: '20', className: 'size-20', token: '5rem' },
]

export default function SpacingPage() {
  return (
    <>
      <PageHeader
        title="Spacing"
        description="The product uses Tailwind spacing, a centered container, and a reading measure. There is no separate spacing token file yet — this page documents what is actually applied."
      />

      <DocSection title="Layout">
        <ul className="max-w-reading list-disc space-y-2 pl-5 text-foreground-subtle">
          <li>
            Container: centered, <DocCode>1rem</DocCode> padding on small screens and{' '}
            <DocCode>2rem</DocCode> from <DocCode>sm</DocCode> up, max width{' '}
            <DocCode>screen-xl</DocCode>.
          </li>
          <li>
            Reading column: <DocCode>max-w-reading</DocCode> (680px) for long copy.
          </li>
          <li>
            Sections: <DocCode>py-8 sm:py-16 lg:py-20</DocCode> via the shared Section component.
          </li>
          <li>
            Motion: <DocCode>--motion-fast</DocCode> (120ms) and <DocCode>--easing-enter</DocCode> on
            cards and buttons. Reduced motion zeros the durations.
          </li>
        </ul>
      </DocSection>

      <DocSection title="Radius">
        <div className="flex flex-wrap items-end gap-4">
          <div className="rounded-md border bg-card p-6 text-sm">rounded-md</div>
          <div className="rounded-lg border bg-card p-6 text-sm">rounded-lg</div>
          <div className="rounded-xl border bg-card p-6 text-sm">rounded-xl</div>
        </div>
        <p className="mt-3 max-w-reading text-sm text-foreground-subtle">
          Controls use <DocCode>rounded-lg</DocCode>. Cards and tiles use <DocCode>rounded-xl</DocCode>.
          Dense chips use <DocCode>rounded-md</DocCode>.
        </p>
      </DocSection>

      <DocSection title="Scale samples">
        <div className="flex flex-wrap items-end gap-4">
          {spaceSamples.map(item => (
            <div key={item.label} className="flex flex-col items-center gap-2">
              <div className={`bg-primary ${item.className}`} aria-hidden="true" />
              <p className="text-xs text-foreground-muted">
                {item.label} · {item.token}
              </p>
            </div>
          ))}
        </div>
      </DocSection>
    </>
  )
}
