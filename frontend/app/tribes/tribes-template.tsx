'use client'

import { Suspense, useMemo, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import TribeCard from '@/app/components/shared/card/tribe-card'
import {
  ClearFiltersButton,
  FilterBar,
  FilterControls,
  RegionFilter,
  SortFilter,
  ViewToggle,
} from '@/app/components/shared/filter-bar'
import Section from '@/app/components/shared/section'
import { Button } from '@/app/components/ui/button'
import { isSortOption, isViewMode, type SortOption, type ViewMode } from '@/lib/filters'
import { cn } from '@/lib/utils'
import type { AllTribesQueryResult } from '@/sanity.types'

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
            <h1 className="text-h1 text-foreground-heading">Tribes</h1>
            <p className="max-w-reading text-body text-foreground-subtle">
              Browse California Tribes and their information, including contact details, locations,
              and community resources.
            </p>
          </div>
        </div>
      </Section>

      <Section className="flex flex-col gap-8 border-t py-8 sm:py-8 lg:py-8">
        <div className="container">
          <FilterControls>
            <RegionFilter value={selectedRegion} onValueChange={handleRegionChange} />
            <SortFilter value={selectedSort} onValueChange={handleSortChange} />
            <ViewToggle value={viewMode} onValueChange={handleViewModeChange} />
            {(selectedRegion !== 'all' || selectedSort) && (
              <ClearFiltersButton onClick={clearFilters} />
            )}
          </FilterControls>
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
              <p className="text-body text-foreground-muted">
                No tribes found matching the selected filters.
              </p>
            </div>
          )}

          {/* Results Summary */}
          <div className="mt-8 text-center text-label text-foreground-muted" aria-live="polite">
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
