'use client'

import { Suspense, useMemo, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import TribeCard from '@/app/components/shared/card/tribe-card'
import Section from '@/app/components/shared/section'
import { Button } from '@/app/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select'
import { cn } from '@/lib/utils'
import type { AllTribesQueryResult } from '@/sanity.types'

type SortOption = 'name-asc' | 'name-desc'
type ViewMode = 'grid' | 'list'

const isSortOption = (value: string | null): value is SortOption => {
  return value === 'name-asc' || value === 'name-desc'
}

const isViewMode = (value: string | null): value is ViewMode => {
  return value === 'grid' || value === 'list'
}

// const data = {
//   name: 'Services',
//   description:
//     'Browse verified services for MMIP support—from emergency response and legal advocacy to healing, shelter, and youth programs—offered by Tribes, inter-tribal partners, and vetted providers across California.',
// }

function TribesContent({ data }: { data: AllTribesQueryResult }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Initialize state directly from search params
  const [selectedRegion, setSelectedRegion] = useState<string>(
    () => searchParams.get('region') || 'all',
  )
  const [selectedSort, setSelectedSort] = useState<SortOption | undefined>(() => {
    const sortFromParams = searchParams.get('sort')
    return isSortOption(sortFromParams) ? sortFromParams : undefined
  })
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    const viewFromParams = searchParams.get('view')
    return isViewMode(viewFromParams) ? viewFromParams : 'grid'
  })

  const [displayCount, setDisplayCount] = useState(12)

  // Update URL when filters, sort, or view change
  const updateSearchParams = (region: string, sort: SortOption | undefined, view: ViewMode) => {
    const params = new URLSearchParams(searchParams)

    if (region === 'all') {
      params.delete('region')
    } else {
      params.set('region', region)
    }

    if (!sort) {
      params.delete('sort')
    } else {
      params.set('sort', sort)
    }

    if (view === 'grid') {
      params.delete('view')
    } else {
      params.set('view', view)
    }

    const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname
    router.replace(newUrl, { scroll: false })
  }

  // Filter tribes based on selected filters
  const filteredTribes = useMemo(() => {
    return data.filter(tribe => {
      const regionMatch = selectedRegion === 'all' || tribe.region === selectedRegion
      return regionMatch
    })
  }, [data, selectedRegion])

  const sortedTribes = useMemo(() => {
    if (!selectedSort) {
      return filteredTribes
    }

    return [...filteredTribes].sort((a, b) => {
      if (selectedSort === 'name-desc') {
        return b.name.localeCompare(a.name, undefined, { sensitivity: 'base' })
      }

      return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
    })
  }, [filteredTribes, selectedSort])

  // Tribes to display (with load more functionality)
  const displayedTribes = useMemo(() => {
    return sortedTribes.slice(0, displayCount)
  }, [sortedTribes, displayCount])

  // Check if there are more tribes to load
  const hasMoreTribes = displayedTribes.length < sortedTribes.length

  // Load more function
  const loadMore = () => {
    setDisplayCount(prev => prev + 12)
  }

  // Reset display count when filters change
  const handleRegionChange = (value: string) => {
    setSelectedRegion(value)
    setDisplayCount(12)
    updateSearchParams(value, selectedSort, viewMode)
  }

  const handleSortChange = (value: string) => {
    if (!isSortOption(value)) return

    setSelectedSort(value)
    setDisplayCount(12)
    updateSearchParams(selectedRegion, value, viewMode)
  }

  const handleViewModeChange = (value: ViewMode) => {
    setViewMode(value)
    updateSearchParams(selectedRegion, selectedSort, value)
  }

  // Clear all filters
  const clearFilters = () => {
    setSelectedRegion('all')
    setSelectedSort(undefined)
    setDisplayCount(12)
    updateSearchParams('all', undefined, viewMode)
  }

  return (
    <>
      <Section>
        <div className="container flex flex-col gap-16">
          {/* Header */}
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl text-foreground-heading">Tribes</h1>
            <p className="max-w-reading text-lg text-foreground-subtle">
              Browse California Tribes and their information, including contact details, locations,
              and community resources.
            </p>
          </div>
        </div>
      </Section>

      <Section className="flex flex-col gap-8 border-t py-8 sm:py-8 lg:py-8">
        <div className="container">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
              {/* Region Filter */}
              <Select value={selectedRegion} onValueChange={handleRegionChange}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="north">Northern CA</SelectItem>
                  <SelectItem value="central">Central CA</SelectItem>
                  <SelectItem value="south">Southern CA</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedSort} onValueChange={handleSortChange}>
                <SelectTrigger className="w-full sm:w-56">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name-asc">Name (A–Z)</SelectItem>
                  <SelectItem value="name-desc">Name (Z–A)</SelectItem>
                </SelectContent>
              </Select>

              <div className="inline-flex items-center rounded-lg border bg-background p-1">
                <button
                  type="button"
                  className={cn(
                    'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                    viewMode === 'grid'
                      ? 'bg-foreground text-background'
                      : 'text-foreground-subtle hover:text-foreground',
                  )}
                  onClick={() => handleViewModeChange('grid')}
                >
                  Grid
                </button>
                <button
                  type="button"
                  className={cn(
                    'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                    viewMode === 'list'
                      ? 'bg-foreground text-background'
                      : 'text-foreground-subtle hover:text-foreground',
                  )}
                  onClick={() => handleViewModeChange('list')}
                >
                  List
                </button>
              </div>

              {/* Clear Filters Button */}
              {(selectedRegion !== 'all' || selectedSort) && (
                <Button variant="ghost" onClick={clearFilters} size="sm">
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
        </div>
      </Section>

      <Section className="border-t">
        <div className="container">
          {/* Tribes Grid */}
          {displayedTribes.length > 0 ? (
            <div className="space-y-8">
              <div
                className={cn(
                  viewMode === 'grid'
                    ? 'grid gap-6 md:grid-cols-2 lg:grid-cols-3'
                    : 'flex flex-col gap-4',
                )}
              >
                {displayedTribes.map(tribe => (
                  <TribeCard key={tribe._id} tribe={tribe} layout={viewMode} />
                ))}
              </div>

              {/* Load More Button */}
              {hasMoreTribes && (
                <div className="flex justify-center">
                  <Button onClick={loadMore} variant="outline" size="lg">
                    Load More Tribes
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex justify-center py-12">
              <p className="text-lg text-gray-500">
                No tribes found matching the selected filters.
              </p>
            </div>
          )}

          {/* Results Summary */}
          <div className="mt-8 text-center text-sm text-gray-500">
            Showing {displayedTribes.length} of {sortedTribes.length} tribes
          </div>
        </div>
      </Section>
    </>
  )
}

export default function TribesTemplate({ data }: { data: AllTribesQueryResult }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TribesContent data={data} />
    </Suspense>
  )
}
