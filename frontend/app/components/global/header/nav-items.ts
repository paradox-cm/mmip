import type { NavigationQueryResult } from '@/sanity.types'

export type PrimaryNav = NonNullable<NonNullable<NavigationQueryResult>['primaryNav']>
export type PrimaryNavItem = PrimaryNav[number]
export type DropdownItem = NonNullable<PrimaryNavItem['dropdownItems']>[number]

function hasLabel(value: string | null | undefined): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

/**
 * Drops nav entries an editor left unlabelled, and prunes empty dropdowns, so
 * neither the desktop menu nor the mobile sheet renders a blank row.
 */
export function filterPrimaryNav(primaryNav: PrimaryNav | null | undefined): PrimaryNav {
  if (!primaryNav) return []

  return primaryNav
    .map(item => {
      if (item.type !== 'dropdown') return item
      return {
        ...item,
        dropdownItems: (item.dropdownItems ?? []).filter(link => hasLabel(link?.label)),
      }
    })
    .filter(item => {
      if (item.type === 'dropdown') {
        return hasLabel(item.dropdownLabel) && (item.dropdownItems?.length ?? 0) > 0
      }
      return hasLabel(item.link?.label)
    })
}
