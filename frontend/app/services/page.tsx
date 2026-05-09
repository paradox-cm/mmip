import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { fetchAllServices, fetchSettings } from '@/sanity/lib/fetch'
import { resolveOpenGraphImage } from '@/sanity/lib/utils'

import ServicesTemplate from './services-template'

export const dynamic = 'force-static'

const SERVICES_PAGE_TITLE = 'Services'
const SERVICES_PAGE_DESCRIPTION =
  'Browse verified MMIP support services across California, including advocacy, emergency response, healing, legal, and community resources.'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchSettings()
  const ogImage = resolveOpenGraphImage(settings?.ogImage)

  return {
    title: SERVICES_PAGE_TITLE,
    description: SERVICES_PAGE_DESCRIPTION,
    alternates: {
      canonical: '/services',
    },
    openGraph: {
      title: SERVICES_PAGE_TITLE,
      description: SERVICES_PAGE_DESCRIPTION,
      url: '/services',
      images: ogImage ? [ogImage] : [],
      type: 'website',
    },
  }
}

/**
 * ─────────────────────────────────────────
 * Page switch
 * ─────────────────────────────────────────
 */
export default async function Page() {
  const data = await fetchAllServices()

  if (!data || data.length === 0) {
    notFound()
  }

  return <ServicesTemplate data={data} />
}
