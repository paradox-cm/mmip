import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { createCollectionPageJsonLd, toJsonLdScript } from '@/lib/jsonld'
import { DEFAULT_SOCIAL_IMAGES } from '@/lib/social-image'
import { fetchAllTribes } from '@/sanity/lib/fetch'

import TribesTemplate from './tribes-template'

export const dynamic = 'force-static'

const TRIBES_PAGE_TITLE = 'Tribes'
const TRIBES_PAGE_DESCRIPTION =
  'Browse California Tribal communities and find culturally grounded MMIP-related support, services, and contact information.'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: TRIBES_PAGE_TITLE,
    description: TRIBES_PAGE_DESCRIPTION,
    alternates: {
      canonical: '/tribes',
    },
    openGraph: {
      title: TRIBES_PAGE_TITLE,
      description: TRIBES_PAGE_DESCRIPTION,
      url: '/tribes',
      images: DEFAULT_SOCIAL_IMAGES,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: TRIBES_PAGE_TITLE,
      description: TRIBES_PAGE_DESCRIPTION,
      images: DEFAULT_SOCIAL_IMAGES,
    },
  }
}

/**
 * ─────────────────────────────────────────
 * Page
 * ─────────────────────────────────────────
 */
export default async function Page() {
  const data = await fetchAllTribes()

  if (!data || data.length === 0) {
    notFound()
  }

  const jsonLd = createCollectionPageJsonLd({
    path: '/tribes',
    title: TRIBES_PAGE_TITLE,
    description: TRIBES_PAGE_DESCRIPTION,
    itemPaths: data.map(tribe => `/tribes/${tribe.slug}`),
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLdScript(jsonLd) }}
      />
      <TribesTemplate data={data} />
    </>
  )
}
