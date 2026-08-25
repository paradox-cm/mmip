import type { SearchResult } from '@/lib/hooks/use-search'

export const SEARCH_TYPE_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'article', label: 'Articles' },
  { id: 'guide', label: 'Guides' },
  { id: 'tool', label: 'Tools' },
  { id: 'service', label: 'Services' },
  { id: 'tribe', label: 'Tribes' },
] as const

export type SearchTypeFilter = (typeof SEARCH_TYPE_FILTERS)[number]['id']

export function isSearchTypeFilter(value: string | null): value is SearchTypeFilter {
  return SEARCH_TYPE_FILTERS.some(filter => filter.id === value)
}

export function matchesSearchType(result: SearchResult, type: SearchTypeFilter): boolean {
  switch (type) {
    case 'all':
      return true
    case 'article':
    case 'guide':
    case 'tool':
      return result.type === 'post' && result.postType === type
    case 'service':
      return result.type === 'service'
    case 'tribe':
      return result.type === 'tribe'
    default: {
      const _exhaustive: never = type
      return _exhaustive
    }
  }
}

export function searchResultTitle(result: SearchResult): string {
  return result.title || result.name || 'Untitled'
}

export function searchResultHref(result: SearchResult): string {
  if (result.url) return result.url
  if (result.type === 'post') return `/${result.category?.slug ?? ''}/${result.slug}`
  if (result.type === 'service') return `/services/${result.slug}`
  return `/tribes/${result.slug}`
}
