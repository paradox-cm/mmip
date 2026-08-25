import type { Metadata } from 'next'

import AdminFrame from './_components/admin-frame'

export const metadata: Metadata = {
  title: {
    default: 'Admin',
    template: '%s · Admin',
  },
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminFrame>{children}</AdminFrame>
}
