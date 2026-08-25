import { PortableTextBlock } from 'next-sanity'

import type {
  GetCategoryWithAllPostsQueryResult,
  GetPageQueryResult,
  GetPostQueryResult,
  GetPostsByTypeQueryResult,
  GetTopicWithAllPostsQueryResult,
  Metadata,
} from '@/sanity.types'
import {
  fetchCategories,
  fetchCategoryWithAllPosts,
  fetchPage,
  fetchPost,
  fetchPostsByType,
  fetchTopics,
  fetchTopicWithAllPosts,
} from '@/sanity/lib/fetch'
import { sanityFetch } from '@/sanity/lib/live'
import { getPageQuery } from '@/sanity/lib/queries'

import { POST_TYPE } from './constants'
import { portableTextToString } from './utils'

export type ResolvedRoute =
  | {
      type: 'post-type'
      data: {
        postType?: keyof typeof POST_TYPE
        posts?: NonNullable<GetPostsByTypeQueryResult>
        slug?: string
      }
      metadata: { title: string; description: string }
    }
  | {
      type: 'category'
      data: NonNullable<GetCategoryWithAllPostsQueryResult>
      metadata: { title: string; description: string }
    }
  | {
      type: 'topic'
      data: NonNullable<GetTopicWithAllPostsQueryResult>
      metadata: { title: string; description: string }
    }
  | {
      type: 'page'
      data: NonNullable<GetPageQueryResult>
      metadata: { title: string; description: string }
    }
  | {
      type: 'post'
      data: NonNullable<GetPostQueryResult>
      metadata: {
        title: string
        description: string
        openGraphImage?: Metadata['ogImage']
        hideSearchIndex?: boolean
      }
    }
  | {
      type: 'not-found'
    }

export type PostTypeRoute = Extract<ResolvedRoute, { type: 'post-type' }>
export type CategoryRoute = Extract<ResolvedRoute, { type: 'category' }>
export type TopicRoute = Extract<ResolvedRoute, { type: 'topic' }>
export type PageRoute = Extract<ResolvedRoute, { type: 'page' }>
export type PostRoute = Extract<ResolvedRoute, { type: 'post' }>

export async function resolveRoute(slugParts: string[]): Promise<ResolvedRoute> {
  if (!slugParts?.length) {
    return { type: 'not-found' }
  }

  const [categoriesResult, topicsResults, firstPageResult] = await Promise.all([
    fetchCategories(),
    fetchTopics(),
    slugParts.length === 1 ? fetchPage(slugParts[0]) : Promise.resolve(null),
  ])

  const categories = categoriesResult || []
  const categorySlugs = categories.map(c => c.slug)
  const topics = topicsResults || []
  const topicSlugs = topics.map(t => t.slug)

  //
  // ──────────────────────────────
  // One-Part Slug → Category or Topic or Page
  // ──────────────────────────────
  //
  if (slugParts.length === 1) {
    const [slug] = slugParts

    // Is post type?
    if (slug in POST_TYPE) {
      const postType = POST_TYPE[slug as keyof typeof POST_TYPE]
      const posts = await fetchPostsByType(postType)

      return {
        type: 'post-type',
        data: { postType: slug as keyof typeof POST_TYPE, posts, slug },
        metadata: {
          title: `${slug.charAt(0).toUpperCase() + slug.slice(1)}`,
          description: `All ${slug} posts`,
        },
      }
    }

    // Is category?
    if (categorySlugs.includes(slug)) {
      const category = await fetchCategoryWithAllPosts(slug)

      if (category?._id) {
        return {
          type: 'category',
          data: category,
          metadata: {
            title: category.name || 'Category',
            description: category.description || '',
          },
        }
      }
    }

    // Is topic?
    if (topicSlugs.includes(slug)) {
      const topic = await fetchTopicWithAllPosts(slug)

      if (topic?._id) {
        return {
          type: 'topic',
          data: topic,
          metadata: {
            title: topic.name || 'Topic',
            description: topic.description || '',
          },
        }
      }
    }

    // Is page?
    if (firstPageResult?._id) {
      const page = firstPageResult
      return {
        type: 'page',
        data: page,
        metadata: {
          title: page.metadata?.metaTitle || page.name || page.heading || 'Page',
          description: page.metadata?.metaDescription || page.subheading || '',
        },
      }
    }

    return { type: 'not-found' }
  }

  //
  // ──────────────────────────────
  // Two-Part Slug → Category + Post
  // ──────────────────────────────
  //
  if (slugParts.length === 2) {
    const [categorySlug, postSlug] = slugParts

    if (!categorySlugs.includes(categorySlug)) {
      return { type: 'not-found' }
    }

    const post = await fetchPost(postSlug, categorySlug)

    if (post?._id) {
      return {
        type: 'post',
        data: post,
        metadata: {
          title: post.metadata?.metaTitle || post.title || 'Post',
          description:
            post.metadata?.metaDescription ||
            portableTextToString(post.excerpt as PortableTextBlock[]) ||
            '',
          openGraphImage: post.metadata?.ogImage,
          hideSearchIndex: post.metadata?.hideSearchIndex || false,
        },
      }
    }

    return { type: 'not-found' }
  }

  //
  // Too deep
  //
  return { type: 'not-found' }
}
