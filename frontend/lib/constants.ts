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
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

// Card themes. Same post type -> colour mapping as before.
//
// In light the four tints sit at the 50 step, which share a lightness, so the
// cards differ only in hue. The deep end of each scale is not lightness
// aligned (gold-900 is 0.28, terracota-900 is 0.12), so dark composites the
// 800/900 step over the page instead of using it flat. That keeps all four at
// roughly the neutral card lightness and differing only in hue, as in light.
export const CARD_THEME: Record<string, string> = {
  article:
    'bg-twilight-50 border-twilight-200 hover:border-twilight-500 dark:bg-twilight-900/45 dark:border-twilight-800 dark:hover:border-twilight-500',
  guide:
    'bg-terracota-50 border-terracota-200 hover:border-terracota-500 dark:bg-terracota-800/45 dark:border-terracota-700 dark:hover:border-terracota-400',
  tool: 'bg-sage-50 border-sage-200 hover:border-sage-500 dark:bg-sage-900/45 dark:border-sage-800 dark:hover:border-sage-400',
  service:
    'bg-gold-50 border-gold-200 hover:border-gold-500 dark:bg-gold-900/35 dark:border-gold-800 dark:hover:border-gold-400',
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
