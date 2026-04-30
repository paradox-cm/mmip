import { algoliasearch } from 'algoliasearch'
import { NextRequest, NextResponse } from 'next/server'
import { PortableTextBlock } from 'next-sanity'

import { INDEXES } from '@/lib/algolia'
import { portableTextToString } from '@/lib/utils'
import { fetchAllPosts, fetchAllServices, fetchAllTribes } from '@/sanity/lib/fetch'

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.ALGOLIA_ADMIN_API_KEY!,
)

/**
 * API Route to handle indexing content into Algolia.
 * This route can be triggered via webhooks from Sanity or manually.
 */

export async function POST(request: NextRequest) {
  try {
    // Verify webhook signature/secret if using webhooks
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.SANITY_WEBHOOK_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const rawIndexType = body.indexType ?? body._type ?? 'all'

    const normalizeIndexType = (value: string): 'all' | 'posts' | 'services' | 'tribes' => {
      switch (value) {
        case 'post':
        case 'posts':
          return 'posts'
        case 'service':
        case 'services':
          return 'services'
        case 'tribe':
        case 'tribes':
          return 'tribes'
        default:
          return 'all'
      }
    }

    const indexType =
      typeof rawIndexType === 'string' ? normalizeIndexType(rawIndexType.toLowerCase()) : 'all'

    console.log('Starting Algolia indexing...', { indexType })

    const results = []

    // Index posts
    if (indexType === 'all' || indexType === 'posts') {
      const posts = await fetchAllPosts()

      if (posts?.length) {
        const postsForIndex = posts.map(post => ({
          objectID: post._id,
          title: post.title,
          slug: post.slug,
          excerpt: portableTextToString(post.excerpt as PortableTextBlock[]),
          postType: post.postType,
          category: {
            name: post.category.name,
            slug: post.category.slug,
          },
          topic: {
            name: post.topic.name,
            slug: post.topic.slug,
          },
          region: post.region,
          date: post.date,
          url: `/${post.category?.slug}/${post.slug}`,
          type: 'post',
          coverImage: post.coverImage,
        }))

        const postResult = await client.saveObjects({
          indexName: INDEXES.posts,
          objects: postsForIndex,
        })

        results.push({ index: INDEXES.posts, count: postsForIndex.length, result: postResult })
      }
    }

    // Index services
    if (indexType === 'all' || indexType === 'services') {
      const services = await fetchAllServices()

      if (services?.length) {
        const servicesForIndex = services.map(service => ({
          objectID: service._id,
          title: service.name,
          name: service.name,
          slug: service.slug,
          shortDescription: portableTextToString(service.shortDescription as PortableTextBlock[]),
          serviceType: {
            name: service.serviceType?.name,
            slug: service.serviceType?.slug,
          },
          region: service.region,
          contactInfo: service.contactInfo,
          url: `/services/${service.slug}`,
          type: 'service',
          coverImage: service.coverImage,
        }))

        const serviceResult = await client.saveObjects({
          indexName: INDEXES.services,
          objects: servicesForIndex,
        })

        results.push({
          index: INDEXES.services,
          count: servicesForIndex.length,
          result: serviceResult,
        })
      }
    }

    // Index tribes
    if (indexType === 'all' || indexType === 'tribes') {
      const tribes = await fetchAllTribes()

      if (tribes?.length) {
        const tribesForIndex = tribes.map(tribe => ({
          objectID: tribe._id,
          title: tribe.name,
          name: tribe.name,
          slug: tribe.slug,
          shortDescription: portableTextToString(tribe.shortDescription as PortableTextBlock[]),
          region: tribe.region,
          contactInfo: tribe.contactInfo,
          url: `/tribes/${tribe.slug}`,
          type: 'tribe',
          coverImage: tribe.coverImage,
        }))

        const tribeResult = await client.saveObjects({
          indexName: INDEXES.tribes,
          objects: tribesForIndex,
        })

        results.push({ index: INDEXES.tribes, count: tribesForIndex.length, result: tribeResult })
      }
    }

    console.log('Algolia indexing completed:', results)

    return NextResponse.json({
      success: true,
      message: 'Search index updated successfully',
      results,
    })
  } catch (error) {
    console.error('Algolia indexing error:', error)
    return NextResponse.json(
      {
        error: 'Failed to update search index',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}

// Optional: Manual trigger endpoint for development
export async function GET() {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 })
  }

  // Trigger reindex manually in development
  return POST(
    new NextRequest('http://localhost:3000/api/search/index', {
      method: 'POST',
      headers: { authorization: `Bearer ${process.env.SANITY_WEBHOOK_SECRET}` },
      body: JSON.stringify({ indexType: 'all' }),
    }),
  )
}
