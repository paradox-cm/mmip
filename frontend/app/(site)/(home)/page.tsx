// import { InstallPrompt, PushNotificationManager } from '@/app/components/push-manager'

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { BASE_URL, SITE_DESCRIPTION, SITE_NAME } from '@/lib/constants'
import { resolveSocialImage } from '@/lib/social-image'
import type { GetHomepageQueryResult } from '@/sanity.types'
import { client } from '@/sanity/lib/client'
import { fetchSettings } from '@/sanity/lib/fetch'
import { getHomepageQuery } from '@/sanity/lib/queries'
import { resolveOpenGraphImage } from '@/sanity/lib/utils'

import HomePage from './home-page'

export const dynamic = 'force-static'

function normalizeBaseUrl(url: string) {
  return url.endsWith('/') ? url.slice(0, -1) : url
}

function getHomeJsonLd({
  siteUrl,
  title,
  description,
}: {
  siteUrl: string
  title: string
  description: string
}) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: title,
        description,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${siteUrl}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: SITE_NAME,
        url: siteUrl,
      },
      {
        '@type': 'WebPage',
        '@id': `${siteUrl}/#webpage`,
        url: siteUrl,
        name: title,
        description,
        isPartOf: {
          '@id': `${siteUrl}/#website`,
        },
        about: {
          '@id': `${siteUrl}/#organization`,
        },
      },
    ],
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const [data, settings] = await Promise.all([
    client.fetch<GetHomepageQueryResult>(
      getHomepageQuery,
      {},
      {
        stega: false,
        perspective: 'published',
      },
    ),
    fetchSettings(),
  ])

  const { seo, hero } = data ?? {}

  const title = seo?.metaTitle || hero?.heading
  const description = seo?.metaDescription || hero?.subheading
  const socialImage = resolveSocialImage(
    resolveOpenGraphImage(seo?.ogImage),
    resolveOpenGraphImage(settings?.ogImage),
  )
  const hideSearchIndex = Boolean(seo?.hideSearchIndex)

  return {
    title: title ?? 'Resilient Relatives',
    description: description ?? SITE_DESCRIPTION,
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: title ?? SITE_NAME,
      description: description ?? SITE_DESCRIPTION,
      url: '/',
      type: 'website',
      images: [socialImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: title ?? SITE_NAME,
      description: description ?? SITE_DESCRIPTION,
      images: [socialImage.url],
    },
    robots: {
      index: !hideSearchIndex,
      follow: !hideSearchIndex,
      googleBot: {
        index: !hideSearchIndex,
        follow: !hideSearchIndex,
      },
    },
  }
}

export default async function Page() {
  const data = await client.fetch<GetHomepageQueryResult>(
    getHomepageQuery,
    {},
    {
      stega: false,
      perspective: 'published',
    },
  )

  if (!data) {
    return notFound()
  }

  const title = data.seo?.metaTitle || data.hero?.heading || SITE_NAME
  const description = data.seo?.metaDescription || data.hero?.subheading || SITE_DESCRIPTION
  const siteUrl = normalizeBaseUrl(BASE_URL)
  const jsonLd = getHomeJsonLd({ siteUrl, title, description })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* <PushNotificationManager /> */}
      {/* <InstallPrompt /> */}
      <HomePage data={data} />
    </>
  )
}
