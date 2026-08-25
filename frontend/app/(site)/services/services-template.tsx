'use client'

import { Suspense, useMemo, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import Breadcrumbs from '@/app/components/shared/breadcrumbs'
import ServiceCard from '@/app/components/shared/card/service-card'
import {
  ClearFiltersButton,
  FilterBar,
  FilterChips,
  FilterControls,
  RegionFilter,
  SortFilter,
  ViewToggle,
} from '@/app/components/shared/filter-bar'
import Section from '@/app/components/shared/section'
import { Button } from '@/app/components/ui/button'
import { isSortOption, isViewMode, type SortOption, type ViewMode } from '@/lib/filters'
import { cn } from '@/lib/utils'
import type { AllServicesQueryResult } from '@/sanity.types'

function ServicesContent({ data }: { data: AllServicesQueryResult }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Initialize state directly from search params
  const [selectedRegion, setSelectedRegion] = useState<string>(
    () => searchParams.get('region') || 'all',
  )
  const [selectedServiceType, setSelectedServiceType] = useState<string>(
    () => searchParams.get('serviceType') || 'all',
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

  // Update URL when filters or sort change
  const updateSearchParams = (
    region: string,
    serviceType: string,
    sort: SortOption | undefined,
    view: ViewMode,
  ) => {
    const params = new URLSearchParams(searchParams)

    if (region === 'all') {
      params.delete('region')
    } else {
      params.set('region', region)
    }

    if (serviceType === 'all') {
      params.delete('serviceType')
    } else {
      params.set('serviceType', serviceType)
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

  // Get unique service types from services
  const availableServiceTypes = useMemo(() => {
    const serviceTypesMap = new Map<string, { name: string; slug: string }>()

    data.forEach(service => {
      if (service.serviceType && service.serviceType.slug) {
        serviceTypesMap.set(service.serviceType.slug, {
          name: service.serviceType.name,
          slug: service.serviceType.slug,
        })
      }
    })

    return Array.from(serviceTypesMap.values())
  }, [data])

  // Filter services based on selected filters
  const filteredServices = useMemo(() => {
    return data.filter(service => {
      const regionMatch = selectedRegion === 'all' || service.region === selectedRegion
      const serviceTypeMatch =
        selectedServiceType === 'all' || service.serviceType?.slug === selectedServiceType
      return regionMatch && serviceTypeMatch
    })
  }, [data, selectedRegion, selectedServiceType])

  const sortedServices = useMemo(() => {
    if (!selectedSort) {
      return filteredServices
    }

    return [...filteredServices].sort((a, b) => {
      if (selectedSort === 'name-desc') {
        return b.name.localeCompare(a.name, undefined, { sensitivity: 'base' })
      }

      return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
    })
  }, [filteredServices, selectedSort])

  // Services to display (with load more functionality)
  const displayedServices = useMemo(() => {
    return sortedServices.slice(0, displayCount)
  }, [sortedServices, displayCount])

  // Check if there are more services to load
  const hasMoreServices = displayedServices.length < sortedServices.length

  // Load more function
  const loadMore = () => {
    setDisplayCount(prev => prev + 12)
  }

  // Reset display count when filters or sort changes
  const handleRegionChange = (value: string) => {
    setSelectedRegion(value)
    setDisplayCount(12)
    updateSearchParams(value, selectedServiceType, selectedSort, viewMode)
  }

  const handleServiceTypeChange = (value: string) => {
    setSelectedServiceType(value)
    setDisplayCount(12)
    updateSearchParams(selectedRegion, value, selectedSort, viewMode)
  }

  const handleSortChange = (value: string) => {
    if (!isSortOption(value)) return

    setSelectedSort(value)
    setDisplayCount(12)
    updateSearchParams(selectedRegion, selectedServiceType, value, viewMode)
  }

  const handleViewModeChange = (value: ViewMode) => {
    setViewMode(value)
    updateSearchParams(selectedRegion, selectedServiceType, selectedSort, value)
  }

  // Clear all filters and reset sort
  const clearFilters = () => {
    setSelectedRegion('all')
    setSelectedServiceType('all')
    setSelectedSort(undefined)
    setDisplayCount(12)
    updateSearchParams('all', 'all', undefined, viewMode)
  }

  return (
    <>
      <Section>
        <div className="container flex flex-col gap-16">
          {/* Header */}
          <div className="flex flex-col gap-6">
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Services' }]} />
            <h1 className="text-h1 text-foreground-heading">Services</h1>
            <p className="max-w-[48ch] text-body text-foreground-subtle">
              Find Native and Tribal services across California offering support, advocacy, and
              resources.
            </p>
          </div>
        </div>
      </Section>

      <Section className="flex flex-col gap-8 border-t py-8 sm:py-8 lg:py-8">
        <div className="container">
          <FilterBar>
            <FilterControls>
              <RegionFilter
                value={selectedRegion}
                onValueChange={handleRegionChange}
                className="sm:w-64"
              />
              <SortFilter value={selectedSort} onValueChange={handleSortChange} />
              <ViewToggle value={viewMode} onValueChange={handleViewModeChange} />
              {(selectedRegion !== 'all' || selectedServiceType !== 'all' || selectedSort) && (
                <ClearFiltersButton onClick={clearFilters} />
              )}
            </FilterControls>

            <FilterChips
              label="Filter by service type"
              allLabel="All Service Types"
              value={selectedServiceType}
              onValueChange={handleServiceTypeChange}
              options={availableServiceTypes}
            />
          </FilterBar>
        </div>
      </Section>

      <Section className="border-t">
        <div className="container">
          {/* Services Grid */}
          {displayedServices.length > 0 ? (
            <div className="space-y-8">
              <div
                className={cn(
                  viewMode === 'grid'
                    ? 'grid min-w-0 gap-6 md:grid-cols-2 lg:grid-cols-3'
                    : 'flex flex-col gap-4',
                )}
              >
                {displayedServices.map(service => (
                  <ServiceCard key={service._id} service={service} layout={viewMode} />
                ))}
              </div>

              {/* Load More Button */}
              {hasMoreServices && (
                <div className="flex justify-center">
                  <Button onClick={loadMore} variant="outline" size="lg">
                    Load More Services
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex justify-center py-12">
              <p className="text-body text-foreground-muted">
                No services found matching the selected filters.
              </p>
            </div>
          )}

          {/* Results Summary */}
          <div className="mt-8 text-center text-label text-foreground-muted" aria-live="polite">
            Showing {displayedServices.length} of {sortedServices.length} services
          </div>
        </div>
      </Section>
    </>
  )
}

export default function ServicesTemplate({ data }: { data: AllServicesQueryResult }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ServicesContent data={data} />
    </Suspense>
  )
}
