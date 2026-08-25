import { useEffect, useState } from 'react'

import { getSearchClient, INDEXES } from '@/lib/algolia'
import { SanityImage } from '@/types'

export interface SearchResult {
  objectID: string
  title: string
  name?: string // For services and tribes
  slug: string
  excerpt?: string // For posts
  shortDescription?: string // For services and tribes
  description?: string // For services and tribes
  postType?: 'article' | 'guide' | 'tool' // Only for posts
  category?: {
    name: string
    slug: string
  } // Only for posts
  topic?: {
    name: string
    slug: string
  } // Only for posts
  serviceType?: {
    name: string
    slug: string
  } // Only for services
  region: string
  date?: string // Only for posts
  contactInfo?: {
    address?: string
    city?: string
    state?: string
    zip?: string
    phone?: string
    email?: string
    website?: string
  } // For services and tribes
  url: string
  type: 'post' | 'service' | 'tribe'
  coverImage?: SanityImage
}

export type SearchError = 'not-configured' | 'request-failed'

const attributesToRetrieve = [
  'title',
  'name',
  'slug',
  'excerpt',
  'shortDescription',
  'description',
  'postType',
  'category',
  'topic',
  'serviceType',
  'region',
  'date',
  'contactInfo',
  'url',
  'type',
  'coverImage',
]

// Original hook for command palette (no pagination)
export function useSearch(query: string): {
  results: SearchResult[]
  isLoading: boolean
  error: SearchError | null
} {
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<SearchError | null>(null)

  useEffect(() => {
    const searchAlgolia = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const client = getSearchClient()
        if (!client) {
          setError('not-configured')
          setResults([])
          return
        }

        const response = await client.search([
          {
            indexName: INDEXES.posts,
            params: {
              query: query.trim(),
              hitsPerPage: 2,
              attributesToRetrieve,
            },
          },
          {
            indexName: INDEXES.services,
            params: {
              query: query.trim(),
              hitsPerPage: 2,
              attributesToRetrieve,
            },
          },
          {
            indexName: INDEXES.tribes,
            params: {
              query: query.trim(),
              hitsPerPage: 2,
              attributesToRetrieve,
            },
          },
        ])

        // Combine results from all indexes
        const allResults = response.results.flatMap((result: any) => result.hits) as SearchResult[]
        const limitedResults = allResults.slice(0, 6)
        setResults(limitedResults)
      } catch (err) {
        console.error('Search error:', err)
        setError('request-failed')
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }

    // If no query, search immediately for recent posts
    // If there's a query, debounce the search
    if (!query.trim()) {
      searchAlgolia()
    } else {
      const debounceTimer = setTimeout(searchAlgolia, 300)
      return () => clearTimeout(debounceTimer)
    }
  }, [query])

  return { results, isLoading, error }
}

// New hook for search page with pagination
export function useSearchWithPagination(query: string, page: number = 0) {
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<SearchError | null>(null)
  const [hasMore, setHasMore] = useState(false)
  const [totalResults, setTotalResults] = useState(0)
  const [currentQuery, setCurrentQuery] = useState<string>('')

  useEffect(() => {
    const searchAlgolia = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const client = getSearchClient()
        if (!client) {
          setError('not-configured')
          if (page === 0) {
            setResults([])
          }
          setHasMore(false)
          setTotalResults(0)
          return
        }

        const response = await client.search([
          {
            indexName: INDEXES.posts,
            params: {
              query: query.trim(),
              page,
              hitsPerPage: 4,
              attributesToRetrieve,
            },
          },
          {
            indexName: INDEXES.services,
            params: {
              query: query.trim(),
              page,
              hitsPerPage: 4,
              attributesToRetrieve,
            },
          },
          {
            indexName: INDEXES.tribes,
            params: {
              query: query.trim(),
              page,
              hitsPerPage: 4,
              attributesToRetrieve,
            },
          },
        ])

        // Extract individual results
        const [postsResult, servicesResult, tribesResult] = response.results as any[]

        // Combine results from all indexes
        const newResults = [
          ...(postsResult?.hits || []),
          ...(servicesResult?.hits || []),
          ...(tribesResult?.hits || []),
        ] as SearchResult[]

        // Determine if this is a new search or pagination
        const isNewSearch = page === 0 || currentQuery !== query.trim()

        if (isNewSearch) {
          // New search - replace results and update current query
          setResults(newResults)
          setCurrentQuery(query.trim())
        } else {
          // Same search, next page - append results
          setResults(prev => [...prev, ...newResults])
        }

        setTotalResults(
          (postsResult?.nbHits ?? 0) + (servicesResult?.nbHits ?? 0) + (tribesResult?.nbHits ?? 0),
        )
        const maxPages = Math.max(
          postsResult?.nbPages ?? 1,
          servicesResult?.nbPages ?? 1,
          tribesResult?.nbPages ?? 1,
        )
        setHasMore(page < maxPages - 1)
      } catch (err) {
        console.error('Search error:', err)
        setError('request-failed')
        // Only clear results on error if it's a new search, not pagination
        if (page === 0) {
          setResults([])
        }
        setHasMore(false)
        setTotalResults(0)
      } finally {
        setIsLoading(false)
      }
    }

    // No debouncing for empty query, slight debounce for searches
    const debounceTimer = setTimeout(searchAlgolia, query.trim() ? 300 : 0)
    return () => clearTimeout(debounceTimer)
  }, [currentQuery, query, page]) // Fixed dependencies

  return { results, isLoading, error, hasMore, totalResults }
}
