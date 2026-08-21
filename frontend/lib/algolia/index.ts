import { algoliasearch } from 'algoliasearch'

export const INDEXES = {
  posts: 'posts',
  services: 'services',
  tribes: 'tribes',
} as const

type SearchClient = ReturnType<typeof algoliasearch>

let cachedClient: SearchClient | null | undefined

/**
 * Search client for the public Algolia key.
 * Returns null when app id / search key are unset so route collection and
 * the search UI can load on Preview without throwing at import time.
 */
export function getSearchClient(): SearchClient | null {
  if (cachedClient !== undefined) {
    return cachedClient
  }

  const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID
  const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY

  if (!appId || !apiKey) {
    cachedClient = null
    return null
  }

  cachedClient = algoliasearch(appId, apiKey)
  return cachedClient
}
