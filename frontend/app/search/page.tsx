'use client'

import { Suspense, useCallback, useEffect, useState } from 'react'

import { useSearchParams } from 'next/navigation'

import SearchCard from '@/app/components/shared/card/search-card'
import HeroSearch from '@/app/components/shared/hero-search'
import Section from '@/app/components/shared/section'
import { Button } from '@/app/components/ui/button'
import { useSearchWithPagination } from '@/lib/hooks/use-search'

function SearchResults() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const [query, setQuery] = useState(initialQuery)
  const [page, setPage] = useState(0)
  const { results, isLoading, error, hasMore, totalResults } = useSearchWithPagination(query, page)

  // Only set initial query from URL params on mount
  useEffect(() => {
    setQuery(initialQuery)
  }, [initialQuery])

  // Handle instant search from hero input - make it stable
  const handleSearch = useCallback((searchQuery: string) => {
    setQuery(searchQuery)
    setPage(0) // Reset to first page
  }, [])

  const handleLoadMore = () => {
    setPage(prev => prev + 1)
  }

  if (error) {
    return (
      <div className="py-12 text-center">
        <p className="text-red-600">Search failed. Please try again.</p>
      </div>
    )
  }

  const showingAllPosts = !query.trim()
  const hasResults = results.length > 0

  // console.log('SearchResults render:', {
  //   query,
  //   page,
  //   resultsLength: results.length,
  //   isLoading,
  //   hasMore,
  //   totalResults,
  // })

  return (
    <>
      <Section className="">
        <div className="container">
          <div className="flex flex-col items-center gap-8 text-center">
            <h1 className="text-3xl">Search</h1>
            <div className="flex w-full flex-col items-center gap-4">
              <HeroSearch onSearch={handleSearch} initialValue={initialQuery} />
            </div>
          </div>
        </div>
      </Section>

      <Section className="border-t">
        <div className="container">
          {hasResults ? (
            <div className="flex flex-col items-center gap-8">
              <p className="text-center text-sm text-foreground-muted">
                {isLoading && page === 0
                  ? 'Loading...'
                  : showingAllPosts
                    ? `Showing ${results.length} of ${totalResults} posts`
                    : `Showing ${results.length} of ${totalResults} results for "${query}"`}
              </p>
              <div className="col-span-4 grid grid-cols-3 gap-6 md:col-span-5 md:col-start-2">
                {results.map(result => {
                  return <SearchCard key={result.objectID} post={result} />
                })}
              </div>
              {/* Load More Button */}
              {hasMore && (
                <div className="flex justify-center">
                  <Button onClick={handleLoadMore} disabled={isLoading} variant="outline" size="lg">
                    {isLoading ? 'Loading...' : 'Load More Results'}
                  </Button>
                </div>
              )}
            </div>
          ) : isLoading && page === 0 ? (
            <div className="py-12 text-center">
              <p className="text-gray-500">Loading posts...</p>
            </div>
          ) : query ? (
            <div className="text-center">
              <p className="">No results found for {query}</p>
              <p className="text-sm">
                Try different keywords or clear your search to see all posts
              </p>
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-gray-500">Loading all posts...</p>
            </div>
          )}
        </div>
      </Section>
    </>
  )
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="container py-12">
          <div className="text-center">
            <h1 className="mb-6 text-3xl font-bold">Search</h1>
            <div className="mx-auto h-12 w-full max-w-2xl animate-pulse rounded-lg bg-gray-200"></div>
          </div>
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  )
}
