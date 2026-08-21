export type SortOption = 'name-asc' | 'name-desc'
export type ViewMode = 'grid' | 'list'

export const isSortOption = (value: string | null): value is SortOption => {
  return value === 'name-asc' || value === 'name-desc'
}

export const isViewMode = (value: string | null): value is ViewMode => {
  return value === 'grid' || value === 'list'
}

export const REGION_OPTIONS = [
  { value: 'all', label: 'All Regions' },
  { value: 'north', label: 'Northern CA' },
  { value: 'central', label: 'Central CA' },
  { value: 'south', label: 'Southern CA' },
] as const

export const SORT_OPTIONS = [
  { value: 'name-asc', label: 'Name (A–Z)' },
  { value: 'name-desc', label: 'Name (Z–A)' },
] as const
