export type SocialImage = {
  url: string
  alt?: string
  width?: number
  height?: number
  type?: string
}

export const DEFAULT_SOCIAL_MISSION = 'A Native-led resource for California Tribal communities.'

/**
 * Public Open Graph URL. Rewritten to the generated `/opengraph-image` card.
 * A `.png` path is more reliable for iMessage and other crawlers than the
 * extensionless App Router route.
 */
export const DEFAULT_SOCIAL_IMAGE: Required<SocialImage> = {
  url: '/og.png',
  alt: `Resilient Relatives — ${DEFAULT_SOCIAL_MISSION}`,
  width: 1200,
  height: 630,
  type: 'image/png',
}

export const DEFAULT_SOCIAL_IMAGES = [DEFAULT_SOCIAL_IMAGE]

function isPublicSiteUrl(value: string) {
  try {
    const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`)
    return url.protocol === 'http:' || url.protocol === 'https:'
      ? url.hostname !== 'localhost' && url.hostname !== '127.0.0.1'
      : false
  } catch {
    return false
  }
}

/**
 * Absolute origin for Open Graph tags. Never falls back to localhost, which
 * would make iMessage and other crawlers request an unreachable image URL.
 */
export function resolveMetadataBase(cmsValue?: string) {
  const vercelDeployment = process.env.VERCEL_URL
  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL
  const candidates = [
    process.env.NEXT_PUBLIC_BASE_URL,
    cmsValue,
    vercelDeployment,
    vercelProduction,
  ]

  for (const candidate of candidates) {
    if (!candidate || !isPublicSiteUrl(candidate)) continue

    try {
      return new URL(/^https?:\/\//i.test(candidate) ? candidate : `https://${candidate}`)
    } catch {
      // Try the next known public origin.
    }
  }

  return undefined
}
