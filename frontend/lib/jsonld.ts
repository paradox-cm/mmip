import { BASE_URL, SITE_NAME } from '@/lib/constants'

export type JsonLd = Record<string, unknown>

function normalizeBaseUrl(url: string) {
  return url.endsWith('/') ? url.slice(0, -1) : url
}

export function absoluteUrl(path: string) {
  const base = normalizeBaseUrl(BASE_URL)
  if (!path || path === '/') return base
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}

export function toJsonLdScript(jsonLd: JsonLd) {
  return JSON.stringify(jsonLd)
}

export function createWebPageJsonLd({
  path,
  title,
  description,
}: {
  path: string
  title: string
  description?: string
}): JsonLd {
  const url = absoluteUrl(path)

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: absoluteUrl('/'),
    },
  }
}

export function createCollectionPageJsonLd({
  path,
  title,
  description,
  itemPaths = [],
}: {
  path: string
  title: string
  description?: string
  itemPaths?: string[]
}): JsonLd {
  const url = absoluteUrl(path)

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description,
    url,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: absoluteUrl('/'),
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: itemPaths.map((itemPath, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: absoluteUrl(itemPath),
      })),
    },
  }
}

export function createArticleJsonLd({
  path,
  title,
  description,
  image,
  datePublished,
  dateModified,
  section,
}: {
  path: string
  title: string
  description?: string
  image?: string
  datePublished?: string
  dateModified?: string
  section?: string
}): JsonLd {
  const url = absoluteUrl(path)

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    ...(image ? { image: [image] } : {}),
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    ...(section ? { articleSection: section } : {}),
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: absoluteUrl('/'),
    },
    mainEntityOfPage: url,
  }
}

export function createServiceJsonLd({
  path,
  name,
  description,
  serviceType,
  areaServed,
  website,
  email,
  phone,
}: {
  path: string
  name: string
  description?: string
  serviceType?: string
  areaServed?: string
  website?: string
  email?: string
  phone?: string
}): JsonLd {
  const url = absoluteUrl(path)

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    ...(serviceType ? { serviceType } : {}),
    ...(areaServed ? { areaServed } : {}),
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: absoluteUrl('/'),
    },
    ...(phone || email || website
      ? {
          contactPoint: {
            '@type': 'ContactPoint',
            ...(phone ? { telephone: phone } : {}),
            ...(email ? { email } : {}),
            ...(website ? { url: website } : {}),
          },
        }
      : {}),
  }
}

export function createOrganizationJsonLd({
  path,
  name,
  description,
  areaServed,
  website,
  email,
  phone,
}: {
  path: string
  name: string
  description?: string
  areaServed?: string
  website?: string
  email?: string
  phone?: string
}): JsonLd {
  const url = absoluteUrl(path)

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    description,
    url,
    ...(areaServed ? { areaServed } : {}),
    ...(website ? { sameAs: [website] } : {}),
    ...(phone || email
      ? {
          contactPoint: {
            '@type': 'ContactPoint',
            ...(phone ? { telephone: phone } : {}),
            ...(email ? { email } : {}),
          },
        }
      : {}),
  }
}
