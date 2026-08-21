import { draftMode } from 'next/headers'

import {
  AllCategoriesQueryResult,
  AllPostsQueryResult,
  AllServicesQueryResult,
  AllTopicsQueryResult,
  AllTribesQueryResult,
  GetCategoryWithAllPostsQueryResult,
  GetHomepageQueryResult,
  GetPageQueryResult,
  GetPostQueryResult,
  GetPostsByTypeQueryResult,
  GetServiceQueryResult,
  GetTopicWithAllPostsQueryResult,
  GetTribeQueryResult,
  MorePostsQueryResult,
  NavigationQueryResult,
  SettingsQueryResult,
} from '@/sanity.types'
import { isPreviewEnvironment } from '@/sanity/lib/api'
import { sanityFetch } from '@/sanity/lib/live'
import { token } from '@/sanity/lib/token'

import {
  allCategoriesQuery,
  allPostsQuery,
  allServicesQuery,
  allTopicsQuery,
  allTribesQuery,
  getCategoryWithAllPostsQuery,
  getHomepageQuery,
  getPageQuery,
  getPostQuery,
  getPostsByTypeQuery,
  getServiceQuery,
  getTopicWithAllPostsQuery,
  getTribeQuery,
  morePostsQuery,
  navigationQuery,
  settingsQuery,
} from './queries'

type FetchOptions<T> = {
  query: string
  params?: Record<string, any>
  tags?: string[]
  perspective?: 'drafts' | 'published'
  stega?: boolean
}

export async function fetchData<T>({
  query,
  params,
  tags,
  perspective,
  stega,
}: FetchOptions<T>): Promise<T> {
  let resolvedPerspective = perspective

  if (!resolvedPerspective) {
    let isDraftMode = false

    try {
      const draft = await draftMode()
      isDraftMode = draft.isEnabled
    } catch {
      // `draftMode()` is request-scoped and can throw during build-time/static generation.
      // In that context we safely default to the published perspective.
      isDraftMode = false
    }

    const wantsDrafts = isDraftMode || isPreviewEnvironment
    // Drafts require a Viewer token. Preview deploys without
    // SANITY_API_READ_TOKEN must stay on published or Sanity returns 401
    // during static generation.
    resolvedPerspective = wantsDrafts && token ? 'drafts' : 'published'
  }

  const { data } = await sanityFetch({
    query,
    params,
    perspective: resolvedPerspective,
    stega: stega ?? false,
    tags,
  })

  return data as T
}

// Fetch Settings
// _____________________________________________________________

export function fetchSettings() {
  return fetchData<SettingsQueryResult>({
    query: settingsQuery,
    params: {},
    tags: ['settings'],
  })
}

// Fetch Navigation
// _____________________________________________________________

export function fetchNavigation() {
  return fetchData<NavigationQueryResult>({
    query: navigationQuery,
    params: {},
    tags: ['navigation'],
  })
}

// Fetch Homepage
// _____________________________________________________________

export function fetchHomeData() {
  return fetchData<GetHomepageQueryResult>({
    query: getHomepageQuery,
    params: {},
    tags: ['home'],
  })
}

// Fetch page
// _____________________________________________________________

export function fetchPage(slug: string) {
  return fetchData<GetPageQueryResult>({
    query: getPageQuery,
    params: { slug },
    tags: ['page'],
  })
}

// Fetch taxonomies
// _____________________________________________________________

// Categories
export function fetchCategories() {
  return fetchData<AllCategoriesQueryResult>({
    query: allCategoriesQuery,
    params: {},
    tags: ['category'],
  })
}

export function fetchCategoryWithAllPosts(slug: string) {
  return fetchData<GetCategoryWithAllPostsQueryResult>({
    query: getCategoryWithAllPostsQuery,
    params: { slug },
    tags: ['category'],
  })
}

// Topics
export function fetchTopics() {
  return fetchData<AllTopicsQueryResult>({
    query: allTopicsQuery,
    params: {},
    tags: ['topic'],
  })
}

export function fetchTopicWithAllPosts(slug: string) {
  return fetchData<GetTopicWithAllPostsQueryResult>({
    query: getTopicWithAllPostsQuery,
    params: { slug },
    tags: ['topic'],
  })
}

// Fetch posts
// _____________________________________________________________

export function fetchAllPosts() {
  return fetchData<AllPostsQueryResult>({
    query: allPostsQuery,
    params: {},
    tags: ['post'],
  })
}

export function fetchPost(slug: string, categorySlug?: string) {
  return fetchData<GetPostQueryResult>({
    query: getPostQuery,
    params: { slug, categorySlug },
    tags: ['post'],
  })
}

export function fetchPostsByType(postType: string) {
  return fetchData<GetPostsByTypeQueryResult>({
    query: getPostsByTypeQuery,
    params: { postType },
    tags: ['post-types'],
  })
}

export function fetchMorePosts(skip: string, limit?: number) {
  return fetchData<MorePostsQueryResult>({
    query: morePostsQuery,
    params: { skip, limit },
    tags: ['post'],
  })
}

// Fetch services
// _____________________________________________________________

export function fetchAllServices() {
  return fetchData<AllServicesQueryResult>({
    query: allServicesQuery,
    params: {},
    tags: ['service'],
  })
}

export function fetchService(slug: string) {
  return fetchData<GetServiceQueryResult>({
    query: getServiceQuery,
    params: { slug },
    tags: ['service'],
  })
}

// Fetch tribes
// _____________________________________________________________

export function fetchAllTribes() {
  return fetchData<AllTribesQueryResult>({
    query: allTribesQuery,
    params: {},
    tags: ['tribe'],
  })
}

export function fetchTribe(slug: string) {
  return fetchData<GetTribeQueryResult>({
    query: getTribeQuery,
    params: { slug },
    tags: ['tribe'],
  })
}
