import type { TaxonomyIconKind } from '@/lib/taxonomy-icons'
import { getTaxonomyIconSrc } from '@/lib/taxonomy-icons'
import type { NavigationQueryResult } from '@/sanity.types'

export type PrimaryNav = NonNullable<NonNullable<NavigationQueryResult>['primaryNav']>
export type PrimaryNavItem = PrimaryNav[number]
export type DropdownItem = NonNullable<PrimaryNavItem['dropdownItems']>[number]

export type NavLinkLike = {
  label?: string | null
  href?: string | null
  page?: { slug?: string | null; name?: string | null } | null
  post?: { slug?: string | null; title?: string | null } | null
  category?: { slug?: string | null; name?: string | null } | null
}

export type NavIconRef = {
  kind: TaxonomyIconKind
  slug?: string | null
  name?: string | null
}

function hasLabel(value: string | null | undefined): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function slugFromHref(href?: string | null): string | null {
  if (!href) return null

  try {
    const path = href.startsWith('http') ? new URL(href).pathname : href
    const segment = path.split('/').filter(Boolean).at(-1)
    return segment ?? null
  } catch {
    return null
  }
}

export function navItemLabel(item: PrimaryNavItem): string | null | undefined {
  return item.type === 'dropdown' ? item.dropdownLabel : item.link?.label
}

export function matchesNavLabel(label: string | null | undefined, expected: string): boolean {
  return label?.trim().toLowerCase() === expected
}

/** Resolves a category or topic icon for a CMS nav link, when one exists. */
export function getNavLinkIcon(link: NavLinkLike): NavIconRef | null {
  const name = link.category?.name ?? link.label
  const slugs = [
    link.category?.slug,
    link.page?.slug,
    link.post?.slug,
    slugFromHref(link.href),
  ].filter((slug, index, all): slug is string => Boolean(slug) && all.indexOf(slug) === index)

  const kinds = ['category', 'topic'] as const

  for (const kind of kinds) {
    for (const slug of slugs) {
      if (getTaxonomyIconSrc(kind, slug, name)) {
        return { kind, slug, name }
      }
    }

    if (getTaxonomyIconSrc(kind, null, name)) {
      return { kind, name }
    }
  }

  return null
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
