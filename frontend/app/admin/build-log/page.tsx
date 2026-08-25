import Link from 'next/link'

import MarkdownDoc from '../_components/markdown-doc'
import { loadBuildLog } from '../_lib/load-build-log'
import PageHeader, { DocCode } from '../design/_components/page-header'

export const metadata = { title: 'Build log' }

export default async function BuildLogPage() {
  const source = await loadBuildLog()

  return (
    <>
      <PageHeader
        title="Build log"
        description="The finishing record for this webapp: what Casey’s repo already contained, what this pass added, and what is still open. The same document is a Markdown file in the repo."
      />
      <p className="max-w-reading text-sm text-foreground-subtle">
        Source file: <DocCode>frontend/app/admin/BUILD_LOG.md</DocCode>
        {' · '}
        <Link href="/admin/build-log/raw" className="focus-ring rounded-sm text-primary">
          View raw Markdown
        </Link>
        {' · '}
        <Link href="/admin" className="focus-ring rounded-sm text-primary">
          Back to admin
        </Link>
      </p>
      <MarkdownDoc source={source} skipFirstHeading />
    </>
  )
}
