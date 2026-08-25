'use client'

import { Suspense, useCallback, useEffect, useState } from 'react'

import { useSearchParams } from 'next/navigation'

import Breadcrumbs from '@/app/components/shared/breadcrumbs'
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

  useEffect(() => {
    setQuery(initialQuery)
  }, [initialQuery])

  const handleSearch = useCallback((searchQuery: string) => {
    setQuery(searchQuery)
    setPage(0)
  }, [])

  const handleLoadMore = () => {
    setPage(prev => prev + 1)
  }

  if (error) {
    return (
      <div className="py-12 text-center">
        <p role="status" className="text-foreground-muted">
          {error === 'not-configured'
            ? 'Search is temporarily unavailable while setup is completed.'
            : 'Search is temporarily unavailable. Please try again later.'}
        </p>
      </div>
    )
  }

  const showingAllPosts = !query.trim()
  const hasResults = results.length > 0

  return (
    <>
      <Section>
        <div className="container">
          <div className="flex flex-col items-center gap-8 text-center">
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Search' }]} />
            <h1 className="text-h2">Search</h1>
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
              <p aria-live="polite" className="text-center text-label text-foreground-muted">
                {isLoading && page === 0
                  ? 'Loading...'
                  : showingAllPosts
                    ? `Showing ${results.length} of ${totalResults} posts`
                    : `Showing ${results.length} of ${totalResults} results for "${query}"`}
              </p>
              <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {results.map(result => {
                  return <SearchCard key={result.objectID} post={result} />
                })}
              </div>
              {hasMore && (
                <div className="flex justify-center">
                  <Button onClick={handleLoadMore} loading={isLoading} variant="outline" size="lg">
                    {isLoading ? 'Loading' : 'Load More Results'}
                  </Button>
                </div>
              )}
            </div>
          ) : isLoading && page === 0 ? (
            <div className="py-12 text-center">
              <p className="text-foreground-muted">Loading posts...</p>
            </div>
          ) : query ? (
            <div className="text-center">
              <p>No results found for {query}</p>
              <p className="text-label text-foreground-muted">
                Try different keywords or clear your search to see all posts
              </p>
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-foreground-muted">Loading all posts...</p>
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
          <div className="flex flex-col items-center gap-8 text-center">
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Search' }]} />
            <h1 className="text-h2 font-bold">Search</h1>
            <div className="mx-auto h-12 w-full max-w-2xl animate-pulse rounded-lg bg-background-emphasis" />
          </div>
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  )
}
