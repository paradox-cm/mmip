import Link from 'next/link'

import ReindexPanel from './_components/reindex-panel'
import { getSearchStatus, isSearchPublicReady } from './_lib/search-status'
import { resolveStudioHref } from './_lib/studio-href'
import PageHeader, { DocCode, DocSection } from './design/_components/page-header'

const tools = [
  {
    href: '/admin/design',
    label: 'Design system',
    description: 'Tokens, type, components, and patterns used on the public site.',
  },
  {
    href: '/admin/build-log',
    label: 'Build log',
    description:
      'Inherited Casey work, this finishing pass, and remaining gaps — as formatted Markdown.',
  },
] as const

export const metadata = { title: 'Overview' }

export default function AdminPage() {
  const searchFlags = getSearchStatus()
  const searchReady = isSearchPublicReady(searchFlags)
  const studioHref = resolveStudioHref()
  const isDev = process.env.NODE_ENV === 'development'

  return (
    <>
      <PageHeader
        title="Admin"
        description="Internal console for Resilient Relatives. The public header stays off these routes. Content editing still happens in Sanity Studio."
      />

      <DocSection
        title="Tools"
        description="Things this webapp already has, linked from one place."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {tools.map(tool => (
            <Link
              key={tool.href}
              href={tool.href}
              className="focus-ring interactive-card block rounded-xl border bg-card p-4 shadow-card hover:border-strong hover:bg-card-hover hover:shadow-card-hover"
            >
              <p className="font-medium">{tool.label}</p>
              <p className="text-sm text-foreground-subtle">{tool.description}</p>
            </Link>
          ))}
          <a
            href={studioHref}
            className="focus-ring interactive-card block rounded-xl border bg-card p-4 shadow-card hover:border-strong hover:bg-card-hover hover:shadow-card-hover"
          >
            <p className="font-medium">Sanity Studio</p>
            <p className="text-sm text-foreground-subtle">
              CMS for posts, pages, services, tribes, and navigation. Local default is port 3333.
            </p>
            <p className="mt-2 font-mono text-xs text-foreground-muted">{studioHref}</p>
          </a>
          <Link
            href="/search"
            className="focus-ring interactive-card block rounded-xl border bg-card p-4 shadow-card hover:border-strong hover:bg-card-hover hover:shadow-card-hover"
          >
            <p className="font-medium">Public search</p>
            <p className="text-sm text-foreground-subtle">
              Mixed Algolia index on the live site. Fails closed when public keys are missing.
            </p>
          </Link>
        </div>
      </DocSection>

      <DocSection
        title="Search configuration"
        description="Flags only — values are never shown. Full setup is in frontend/SEARCH_HANDOFF.md."
      >
        <ul className="divide-y rounded-xl border bg-card">
          {searchFlags.map(flag => (
            <li key={flag.id} className="flex items-center justify-between gap-4 px-4 py-3">
              <div>
                <p className="font-mono text-sm">{flag.label}</p>
                <p className="text-xs text-foreground-muted">
                  {flag.exposure === 'public' ? 'Browser-visible' : 'Server-only'}
                </p>
              </div>
              <span
                className={
                  flag.configured
                    ? 'text-sm font-medium text-foreground'
                    : 'text-sm text-foreground-muted'
                }
              >
                {flag.configured ? 'Present' : 'Missing'}
              </span>
            </li>
          ))}
        </ul>
        <p className="max-w-reading text-sm text-foreground-subtle">
          Public search is {searchReady ? 'configured for this environment' : 'not ready'}
          {searchReady
            ? '.'
            : ' — add the Algolia app id and search-only key, then reindex.'} Run{' '}
          <DocCode>pnpm --filter frontend check:search</DocCode> locally to probe index counts
          without printing credentials.
        </p>
      </DocSection>

      <DocSection title="Reindex Algolia">
        <ReindexPanel enabled={isDev} />
      </DocSection>
    </>
  )
}
