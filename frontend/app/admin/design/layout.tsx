import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Design system',
    template: '%s · Design system',
  },
  robots: { index: false, follow: false },
}

export default function DesignSystemLayout({ children }: { children: React.ReactNode }) {
  return children
}
