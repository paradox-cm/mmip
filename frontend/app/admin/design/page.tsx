import Link from 'next/link'

import PageHeader, { DocCode, DocSection } from './_components/page-header'
import { DS_NAV } from './_lib/nav'

const explore = DS_NAV.flatMap(section => section.items).filter(
  item => item.href !== '/admin/design',
)

export default function DesignSystemOverviewPage() {
  return (
    <>
      <PageHeader
        title="Resilient Relatives design system"
        description="The living record of tokens, type, and components used on this site. Color, type, and interaction come from the same CSS variables the product already ships."
      />

      <DocSection title="Principles">
        <ul className="max-w-reading list-disc space-y-2 pl-5 text-foreground-subtle">
          <li>One primary action per view. Gold is for doing, not decorating.</li>
          <li>
            Warm sand ground, <DocCode>brand-emphasis</DocCode> headlines (full brand ink ramp), and
            twilight body text stay calm for crisis-adjacent work.
          </li>
          <li>Touch targets are at least 44px. Focus is a gold outline, never color alone.</li>
          <li>Document what exists. Do not showcase primitives the product does not use.</li>
        </ul>
        <p className="max-w-reading text-sm text-foreground-subtle">
          Full protocol: <DocCode>app/admin/design/STANDARDS.md</DocCode>. The{' '}
          <Link
            href="/admin/design/foundations"
            className="focus-ring rounded-sm text-primary underline underline-offset-4"
          >
            Principles
          </Link>{' '}
          page is the living summary. Automated gates are <DocCode>check:tokens</DocCode> and{' '}
          <DocCode>test:a11y</DocCode>.
        </p>
      </DocSection>

      <DocSection title="Explore">
        <div className="grid gap-3 sm:grid-cols-2">
          {explore.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="focus-ring interactive-card block rounded-xl border bg-card p-4 shadow-card hover:border-strong hover:bg-card-hover hover:shadow-card-hover"
            >
              <p className="font-medium">{item.label}</p>
              {item.description ? (
                <p className="text-sm text-foreground-subtle">{item.description}</p>
              ) : null}
            </Link>
          ))}
        </div>
      </DocSection>
    </>
  )
}
