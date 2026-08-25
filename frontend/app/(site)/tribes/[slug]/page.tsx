import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { toPlainText } from 'next-sanity'

import { createOrganizationJsonLd, toJsonLdScript } from '@/lib/jsonld'
import { resolveSocialImage } from '@/lib/social-image'
import { fetchAllTribes, fetchSettings, fetchTribe } from '@/sanity/lib/fetch'
import { resolveOpenGraphImage } from '@/sanity/lib/utils'

import TribeTemplate from '../tribe-template'

type Props = {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-static'
export const dynamicParams = false

export async function generateStaticParams() {
  const tribes = await fetchAllTribes()

  if (!tribes?.length) {
    return []
  }

  return tribes.map(tribe => ({ slug: tribe.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const [tribe, settings] = await Promise.all([fetchTribe(slug), fetchSettings()])

  if (!tribe) {
    return {}
  }

  const title = tribe.metadata?.metaTitle || tribe.name
  const description =
    tribe.metadata?.metaDescription ||
    (tribe.shortDescription ? toPlainText(tribe.shortDescription) : undefined)
  const socialImage = resolveSocialImage(
    resolveOpenGraphImage(tribe.metadata?.ogImage),
    resolveOpenGraphImage(settings?.ogImage),
  )
  const hideSearchIndex = Boolean(tribe.metadata?.hideSearchIndex)

  return {
    title,
    description,
    alternates: {
      canonical: `/tribes/${tribe.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/tribes/${tribe.slug}`,
      images: [socialImage],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
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

export default async function TribePage({ params }: Props) {
  const { slug } = await params
  const tribe = await fetchTribe(slug)

  if (!tribe) {
    notFound()
  }

  const jsonLd = createOrganizationJsonLd({
    path: `/tribes/${tribe.slug}`,
    name: tribe.name,
    description: tribe.shortDescription ? toPlainText(tribe.shortDescription) : undefined,
    areaServed: tribe.region,
    website: tribe.contactInfo?.website,
    email: tribe.contactInfo?.email,
    phone: tribe.contactInfo?.phone,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLdScript(jsonLd) }}
      />
      <TribeTemplate tribe={tribe} />
    </>
  )
}
