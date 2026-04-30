'use client'

import { Suspense, useMemo, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import ServiceCard from '@/app/components/shared/card/service-card'
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
import type { AllServicesQueryResult } from '@/sanity.types'

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
            <h1 className="text-4xl text-foreground-heading">Services</h1>
            <p className="max-w-[48ch] text-lg text-foreground-subtle">
              Find Native and Tribal services across California offering support, advocacy, and
              resources.
            </p>
          </div>
        </div>
      </Section>

      <Section className="flex flex-col gap-8 border-t py-8 sm:py-8 lg:py-8">
        <div className="container">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
                {/* Region Filter */}
                <Select value={selectedRegion} onValueChange={handleRegionChange}>
                  <SelectTrigger className="w-full sm:w-64">
                    <SelectValue placeholder="Filter by region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    <SelectItem value="north">Northern CA</SelectItem>
                    <SelectItem value="central">Central CA</SelectItem>
                    <SelectItem value="south">Southern CA</SelectItem>
                  </SelectContent>
                </Select>

                {/* Sort */}
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
                {(selectedRegion !== 'all' || selectedServiceType !== 'all' || selectedSort) && (
                  <Button variant="ghost" onClick={clearFilters} size="sm">
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className={cn(
                  'rounded-full border px-3 py-1.5 text-sm font-medium transition-colors',
                  selectedServiceType === 'all'
                    ? 'border-foreground bg-foreground text-background'
                    : 'border-border bg-background text-foreground-subtle hover:border-strong hover:text-foreground',
                )}
                onClick={() => handleServiceTypeChange('all')}
              >
                All Service Types
              </button>
              {availableServiceTypes.map(serviceType => (
                <button
                  key={serviceType.slug}
                  type="button"
                  className={cn(
                    'rounded-full border px-3 py-1.5 text-sm font-medium transition-colors',
                    selectedServiceType === serviceType.slug
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-border bg-background text-foreground-subtle hover:border-strong hover:text-foreground',
                  )}
                  onClick={() => handleServiceTypeChange(serviceType.slug)}
                >
                  {serviceType.name}
                </button>
              ))}
            </div>
          </div>
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
                    ? 'grid gap-6 md:grid-cols-2 lg:grid-cols-3'
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
              <p className="text-lg text-gray-500">
                No services found matching the selected filters.
              </p>
            </div>
          )}

          {/* Results Summary */}
          <div className="mt-8 text-center text-sm text-gray-500">
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
