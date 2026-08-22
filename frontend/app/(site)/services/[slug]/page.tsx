import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { toPlainText } from 'next-sanity'

import { createServiceJsonLd, toJsonLdScript } from '@/lib/jsonld'
import { fetchAllServices, fetchService, fetchSettings } from '@/sanity/lib/fetch'
import { resolveOpenGraphImage } from '@/sanity/lib/utils'

import ServiceTemplate from '../service-template'

type Props = {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-static'
export const dynamicParams = false

export async function generateStaticParams() {
  const services = await fetchAllServices()

  if (!services?.length) {
    return []
  }

  return services.map(service => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const [service, settings] = await Promise.all([fetchService(slug), fetchSettings()])

  if (!service) {
    return {}
  }

  const title = service.metadata?.metaTitle || service.name
  const description =
    service.metadata?.metaDescription ||
    (service.shortDescription ? toPlainText(service.shortDescription) : undefined)
  const ogImage = resolveOpenGraphImage(service.metadata?.ogImage ?? settings?.ogImage)
  const hideSearchIndex = Boolean(service.metadata?.hideSearchIndex)

  return {
    title,
    description,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/services/${service.slug}`,
      images: ogImage ? [ogImage] : [],
      type: 'website',
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

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = await fetchService(slug)

  if (!service) {
    notFound()
  }

  const jsonLd = createServiceJsonLd({
    path: `/services/${service.slug}`,
    name: service.name,
    description: service.shortDescription ? toPlainText(service.shortDescription) : undefined,
    serviceType: service.serviceType?.name,
    areaServed: service.region,
    website: service.contactInfo?.website,
    email: service.contactInfo?.email,
    phone: service.contactInfo?.phone,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLdScript(jsonLd) }}
      />
      <ServiceTemplate service={service} />
    </>
  )
}
