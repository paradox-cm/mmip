import type { Metadata } from 'next'

import { createWebPageJsonLd, toJsonLdScript } from '@/lib/jsonld'
import { DEFAULT_SOCIAL_IMAGES } from '@/lib/social-image'

import GetHelpTemplate from './get-help-template'

export const dynamic = 'force-static'

const PAGE_TITLE = 'Get Help'
const PAGE_DESCRIPTION =
  'Emergency contacts and crisis support for California Tribal communities — 24/7 hotlines, missing person reporting steps, and verified local services across Northern, Central, and Southern California.'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    alternates: {
      canonical: '/get-help',
    },
    openGraph: {
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      url: '/get-help',
      images: DEFAULT_SOCIAL_IMAGES,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      images: DEFAULT_SOCIAL_IMAGES,
    },
  }
}

export default function Page() {
  const jsonLd = createWebPageJsonLd({
    path: '/get-help',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLdScript(jsonLd) }}
      />
      <GetHelpTemplate />
    </>
  )
}
