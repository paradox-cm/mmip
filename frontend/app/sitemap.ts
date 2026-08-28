import { MetadataRoute } from 'next'
import { headers } from 'next/headers'

import { sanityFetch } from '@/sanity/lib/live'
import { sitemapData } from '@/sanity/lib/queries'

/**
 * This file creates a sitemap (sitemap.xml) for the application. Learn more about sitemaps in Next.js here: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 * Be sure to update the `changeFrequency` and `priority` values to match your application's content.
 */

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allPostsAndPages = await sanityFetch({
    query: sitemapData,
  })
  const headersList = await headers()
  const sitemap: MetadataRoute.Sitemap = []
  const domain: string = headersList.get('host') as string
  sitemap.push({
    url: domain,
    lastModified: new Date(),
    priority: 1,
    changeFrequency: 'monthly',
  })
  sitemap.push({
    url: `${domain}/get-help`,
    lastModified: new Date(),
    priority: 0.9,
    changeFrequency: 'monthly',
  })
  sitemap.push({
    url: `${domain}/services`,
    lastModified: new Date(),
    priority: 0.8,
    changeFrequency: 'monthly',
  })
  sitemap.push({
    url: `${domain}/tribes`,
    lastModified: new Date(),
    priority: 0.8,
    changeFrequency: 'monthly',
  })

  if (allPostsAndPages != null && allPostsAndPages.data.length != 0) {
    // CMS pages can share a slug with the code-defined routes above (e.g. a
    // "services" page document); the static route wins, so skip duplicates.
    const seenUrls = new Set(sitemap.map(entry => entry.url))
    let priority: number
    let url: string
    let changeFrequency:
      | 'monthly'
      | 'always'
      | 'hourly'
      | 'daily'
      | 'weekly'
      | 'yearly'
      | 'never'
      | undefined

    for (const p of allPostsAndPages.data) {
      switch (p._type) {
        case 'page':
          priority = 0.8
          changeFrequency = 'monthly'
          url = `${domain}/${p.slug}`
          break
        case 'post':
          priority = 0.5
          changeFrequency = 'never'
          url = `${domain}/${p.categorySlug}/${p.slug}`
          break
        case 'service':
          priority = 0.7
          changeFrequency = 'monthly'
          url = `${domain}/services/${p.slug}`
          break
        case 'tribe':
          priority = 0.7
          changeFrequency = 'monthly'
          url = `${domain}/tribes/${p.slug}`
          break
        default:
          continue
      }
      if (seenUrls.has(url)) {
        continue
      }
      seenUrls.add(url)
      sitemap.push({
        lastModified: p._updatedAt || new Date(),
        priority,
        changeFrequency,
        url,
      })
    }
  }

  return sitemap
}
