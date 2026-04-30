'use client'

import { useMemo, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import PostCard from '@/app/components/shared/card/post-card'
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
import { GetCategoryWithAllPostsQueryResult } from '@/sanity.types'

type SortOption = 'name-asc' | 'name-desc'
type ViewMode = 'grid' | 'list'

const isSortOption = (value: string | null): value is SortOption => {
  return value === 'name-asc' || value === 'name-desc'
}

const isViewMode = (value: string | null): value is ViewMode => {
  return value === 'grid' || value === 'list'
}

export default function CategoryTemplate({
  data,
}: {
  data: NonNullable<GetCategoryWithAllPostsQueryResult>
}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Initialize state directly from search params
  const [selectedRegion, setSelectedRegion] = useState<string>(
    () => searchParams.get('region') || 'all',
  )
  const [selectedTopic, setSelectedTopic] = useState<string>(
    () => searchParams.get('topic') || 'all',
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
  const updateSearchParams = (
    region: string,
    topic: string,
    sort: SortOption | undefined,
    view: ViewMode,
  ) => {
    const params = new URLSearchParams(searchParams)

    if (region === 'all') {
      params.delete('region')
    } else {
      params.set('region', region)
    }

    if (topic === 'all') {
      params.delete('topic')
    } else {
      params.set('topic', topic)
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

  // Get unique topics from posts
  const availableTopics = useMemo(() => {
    const topicsMap = new Map<string, { name: string; slug: string }>()

    data.posts.forEach(post => {
      if (post.topic && post.topic.slug) {
        topicsMap.set(post.topic.slug, {
          name: post.topic.name,
          slug: post.topic.slug,
        })
      }
    })

    return Array.from(topicsMap.values())
  }, [data.posts])

  // Filter posts based on selected filters
  const filteredPosts = useMemo(() => {
    return data.posts.filter(post => {
      const regionMatch = selectedRegion === 'all' || post.region === selectedRegion
      const topicMatch = selectedTopic === 'all' || post.topic?.slug === selectedTopic
      return regionMatch && topicMatch
    })
  }, [data.posts, selectedRegion, selectedTopic])

  const sortedPosts = useMemo(() => {
    if (!selectedSort) {
      return filteredPosts
    }

    return [...filteredPosts].sort((a, b) => {
      if (selectedSort === 'name-desc') {
        return b.title.localeCompare(a.title, undefined, { sensitivity: 'base' })
      }

      return a.title.localeCompare(b.title, undefined, { sensitivity: 'base' })
    })
  }, [filteredPosts, selectedSort])

  // Posts to display (with load more functionality)
  const displayedPosts = useMemo(() => {
    return sortedPosts.slice(0, displayCount)
  }, [sortedPosts, displayCount])

  // Check if there are more posts to load
  const hasMorePosts = displayedPosts.length < sortedPosts.length

  // Load more function
  const loadMore = () => {
    setDisplayCount(prev => prev + 12)
  }

  // Reset display count when filters change
  const handleRegionChange = (value: string) => {
    setSelectedRegion(value)
    setDisplayCount(12)
    updateSearchParams(value, selectedTopic, selectedSort, viewMode)
  }

  const handleTopicChange = (value: string) => {
    setSelectedTopic(value)
    setDisplayCount(12)
    updateSearchParams(selectedRegion, value, selectedSort, viewMode)
  }

  const handleSortChange = (value: string) => {
    if (!isSortOption(value)) return

    setSelectedSort(value)
    setDisplayCount(12)
    updateSearchParams(selectedRegion, selectedTopic, value, viewMode)
  }

  const handleViewModeChange = (value: ViewMode) => {
    setViewMode(value)
    updateSearchParams(selectedRegion, selectedTopic, selectedSort, value)
  }

  // Clear all filters
  const clearFilters = () => {
    setSelectedRegion('all')
    setSelectedTopic('all')
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
            <h1 className="text-4xl text-foreground-heading">{data.name}</h1>
            {data.description && (
              <p className="max-w-reading text-lg text-foreground-subtle">{data.description}</p>
            )}
          </div>
        </div>
      </Section>

      <Section className="flex flex-col gap-8 border-t py-8 sm:py-8 lg:py-8">
        <div className="container">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
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

                {(selectedRegion !== 'all' || selectedTopic !== 'all' || selectedSort) && (
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
                  selectedTopic === 'all'
                    ? 'border-foreground bg-foreground text-background'
                    : 'border-border bg-background text-foreground-subtle hover:border-strong hover:text-foreground',
                )}
                onClick={() => handleTopicChange('all')}
              >
                All Topics
              </button>
              {availableTopics.map(topic => (
                <button
                  key={topic.slug}
                  type="button"
                  className={cn(
                    'rounded-full border px-3 py-1.5 text-sm font-medium transition-colors',
                    selectedTopic === topic.slug
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-border bg-background text-foreground-subtle hover:border-strong hover:text-foreground',
                  )}
                  onClick={() => handleTopicChange(topic.slug)}
                >
                  {topic.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="flex flex-col gap-8 border-t">
        <div className="container">
          {/* Posts Grid */}
          {displayedPosts.length > 0 ? (
            <div className="space-y-8">
              <div
                className={cn(
                  viewMode === 'grid'
                    ? 'grid gap-6 md:grid-cols-2 lg:grid-cols-3'
                    : 'flex flex-col gap-4',
                )}
              >
                {displayedPosts.map(post => (
                  <PostCard key={post._id} post={post} viewMode={viewMode} />
                ))}
              </div>

              {/* Load More Button */}
              {hasMorePosts && (
                <div className="flex justify-center">
                  <Button onClick={loadMore} variant="outline" size="lg">
                    Load More Posts
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex justify-center py-12">
              <p className="text-lg text-gray-500">No posts found matching the selected filters.</p>
            </div>
          )}

          {/* Results Summary */}
          <div className="mt-8 text-center text-sm text-gray-500">
            Showing {displayedPosts.length} of {sortedPosts.length} posts
          </div>
        </div>
      </Section>
    </>
  )
}
