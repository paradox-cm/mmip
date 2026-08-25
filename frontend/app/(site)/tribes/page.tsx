import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { createCollectionPageJsonLd, toJsonLdScript } from '@/lib/jsonld'
import { resolveSocialImage } from '@/lib/social-image'
import { fetchAllTribes, fetchSettings } from '@/sanity/lib/fetch'
import { resolveOpenGraphImage } from '@/sanity/lib/utils'

import TribesTemplate from './tribes-template'

export const dynamic = 'force-static'

const TRIBES_PAGE_TITLE = 'Tribes'
const TRIBES_PAGE_DESCRIPTION =
  'Browse California Tribal communities and find culturally grounded MMIP-related support, services, and contact information.'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchSettings()
  const ogImage = resolveOpenGraphImage(settings?.ogImage)
  const socialImage = resolveSocialImage(ogImage)

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
      images: [socialImage],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: TRIBES_PAGE_TITLE,
      description: TRIBES_PAGE_DESCRIPTION,
      images: [socialImage.url],
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
