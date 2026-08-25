import { DS_NAV, type DsNavSection } from '../design/_lib/nav'

export type { DsNavItem, DsNavSection } from '../design/_lib/nav'

export const ADMIN_NAV: DsNavSection[] = [
  {
    title: 'Console',
    items: [
      { href: '/admin', label: 'Overview', description: 'Tools, status, and shortcuts' },
      {
        href: '/admin/build-log',
        label: 'Build log',
        description: 'What we inherited, what we added, what remains',
      },
    ],
  },
  ...DS_NAV.map(section =>
    section.title === 'Start' ? { ...section, title: 'Design system' } : section,
  ),
]

export function isAdminNavActive(pathname: string, href: string) {
  if (href === '/admin' || href === '/admin/design') return pathname === href
  return pathname === href || pathname.startsWith(`${href}/`)
}
