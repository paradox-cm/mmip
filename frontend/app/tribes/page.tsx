import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

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
      images: ogImage ? [ogImage] : [],
      type: 'website',
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

  return <TribesTemplate data={data} />
}
