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

type AlgoliaIndexResult = {
  hits: SearchResult[]
  nbHits: number
  nbPages: number
}

function asIndexResult(value: unknown): AlgoliaIndexResult {
  if (typeof value !== 'object' || value === null) {
    return { hits: [], nbHits: 0, nbPages: 1 }
  }

  const record = value as Record<string, unknown>
  return {
    hits: Array.isArray(record.hits) ? (record.hits as SearchResult[]) : [],
    nbHits: typeof record.nbHits === 'number' ? record.nbHits : 0,
    nbPages: typeof record.nbPages === 'number' ? record.nbPages : 1,
  }
}

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

        const allResults = response.results.flatMap(result => asIndexResult(result).hits)
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

        const indexed = response.results.map(asIndexResult)
        const postsResult = indexed[0] ?? { hits: [], nbHits: 0, nbPages: 1 }
        const servicesResult = indexed[1] ?? { hits: [], nbHits: 0, nbPages: 1 }
        const tribesResult = indexed[2] ?? { hits: [], nbHits: 0, nbPages: 1 }

        const newResults = [
          ...postsResult.hits,
          ...servicesResult.hits,
          ...tribesResult.hits,
        ]

        const isNewSearch = page === 0 || currentQuery !== query.trim()

        if (isNewSearch) {
          setResults(newResults)
          setCurrentQuery(query.trim())
        } else {
          setResults(prev => [...prev, ...newResults])
        }

        setTotalResults(postsResult.nbHits + servicesResult.nbHits + tribesResult.nbHits)
        const maxPages = Math.max(postsResult.nbPages, servicesResult.nbPages, tribesResult.nbPages)
        setHasMore(page < maxPages - 1)
      } catch (err) {
        console.error('Search error:', err)
        setError('request-failed')
        if (page === 0) {
          setResults([])
        }
        setHasMore(false)
        setTotalResults(0)
      } finally {
        setIsLoading(false)
      }
    }

    const debounceTimer = setTimeout(searchAlgolia, query.trim() ? 300 : 0)
    return () => clearTimeout(debounceTimer)
  }, [currentQuery, query, page])

  return { results, isLoading, error, hasMore, totalResults }
}
