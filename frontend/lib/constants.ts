// Post type constants
export const POST_TYPE = {
  articles: 'article',
  guides: 'guide',
  tools: 'tool',
} as const
export type PostTypeShape = (typeof POST_TYPE)[keyof typeof POST_TYPE]

// Site metadata constants
export const CURRENT_YEAR = new Date().getFullYear()
export const SITE_NAME = 'Resilient Relatives'
export const SITE_DESCRIPTION =
  'Resilient Relatives is a Native-led resource addressing the MMIP crisis—empowering California Tribal communities to respond, advocate, and heal.'

function publicBaseUrl(value: string | undefined): string | undefined {
  const trimmed = value?.trim()
  if (!trimmed) return undefined

  try {
    const url = new URL(/^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`)
    return url.toString().replace(/\/$/, '')
  } catch {
    return undefined
  }
}

/**
 * Production must set NEXT_PUBLIC_BASE_URL to the canonical public domain.
 * Vercel's system URLs keep generated metadata valid on a first deployment,
 * while localhost remains a useful development fallback.
 */
export const BASE_URL =
  publicBaseUrl(process.env.NEXT_PUBLIC_BASE_URL) ??
  publicBaseUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
  publicBaseUrl(process.env.VERCEL_URL) ??
  'http://localhost:3000'

// Card themes. Same post type -> colour mapping as before.
//
// Light tints use primitives at the 50 step. Dark tints use --content-* semantics
// in globals.css so gold, terracota, sage, and twilight primitives stay honest.
export const CARD_THEME: Record<string, string> = {
  article:
    'bg-content-article border-content-article-border hover:border-content-article-border-hover',
  guide: 'bg-content-guide border-content-guide-border hover:border-content-guide-border-hover',
  tool: 'bg-content-tool border-content-tool-border hover:border-content-tool-border-hover',
  service:
    'bg-content-service border-content-service-border hover:border-content-service-border-hover',
  default: 'bg-card border hover:border-strong',
}

// Shared affordances for a card that is itself the link target.
export const CARD_INTERACTION =
  'outline-none transition-[background-color,border-color,box-shadow,transform] duration-fast ease-standard focus-visible:ring-2 focus-visible:ring-ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.99] motion-reduce:active:scale-100'

export const REGION_LABELS = {
  north: 'Northern CA',
  central: 'Central CA',
  south: 'Southern CA',
  statewide: 'Statewide',
} as const
