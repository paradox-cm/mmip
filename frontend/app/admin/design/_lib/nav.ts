export type DsNavItem = { href: string; label: string; description?: string }
export type DsNavSection = { title: string; items: DsNavItem[] }

export const DS_NAV: DsNavSection[] = [
  {
    title: 'Start',
    items: [{ href: '/admin/design', label: 'Overview', description: 'How to use this system' }],
  },
  {
    title: 'Foundations',
    items: [
      {
        href: '/admin/design/foundations',
        label: 'Principles',
        description: 'Sovereignty, care, and the UI protocol',
      },
      {
        href: '/admin/design/brand-assets',
        label: 'Brand assets',
        description: 'Logo, install icons, and social cards',
      },
      {
        href: '/admin/design/seal',
        label: 'Seal animation',
        description: 'Identity motion and playback',
      },
      { href: '/admin/design/color', label: 'Color', description: 'Palettes and semantic roles' },
      {
        href: '/admin/design/typography',
        label: 'Typography',
        description: 'Helvetica Now and Real Head',
      },
      {
        href: '/admin/design/spacing',
        label: 'Spacing',
        description: 'Container, measure, and radius',
      },
      {
        href: '/admin/design/accessibility',
        label: 'Accessibility',
        description: 'Focus, targets, and motion',
      },
    ],
  },
  {
    title: 'Interface',
    items: [
      {
        href: '/admin/design/components',
        label: 'Components',
        description: 'Live primitives from production',
      },
      {
        href: '/admin/design/patterns',
        label: 'Patterns',
        description: 'Cards, search, and page rhythm',
      },
    ],
  },
]

export function isDsNavActive(pathname: string, href: string) {
  if (href === '/admin/design') return pathname === href
  return pathname === href || pathname.startsWith(`${href}/`)
}
