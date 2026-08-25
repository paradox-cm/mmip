import type { Metadata } from 'next'

import DocsShell from './_components/docs-shell'

export const metadata: Metadata = {
  title: {
    default: 'Design system',
    template: '%s · Design system',
  },
  robots: { index: false, follow: false },
}

export default function DesignSystemLayout({ children }: { children: React.ReactNode }) {
  return <DocsShell>{children}</DocsShell>
}
