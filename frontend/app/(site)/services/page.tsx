import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { createCollectionPageJsonLd, toJsonLdScript } from '@/lib/jsonld'
import { resolveSocialImage } from '@/lib/social-image'
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
  const socialImage = resolveSocialImage(ogImage)

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
      images: [socialImage],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: SERVICES_PAGE_TITLE,
      description: SERVICES_PAGE_DESCRIPTION,
      images: [socialImage.url],
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

  const jsonLd = createCollectionPageJsonLd({
    path: '/services',
    title: SERVICES_PAGE_TITLE,
    description: SERVICES_PAGE_DESCRIPTION,
    itemPaths: data.map(service => `/services/${service.slug}`),
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLdScript(jsonLd) }}
      />
      <ServicesTemplate data={data} />
    </>
  )
}
