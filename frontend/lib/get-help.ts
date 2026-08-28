/**
 * Types and helpers for the Get Help emergency directory (/get-help).
 * The directory data itself lives in `lib/get-help-data.ts`.
 */

export type HelpCategory =
  | 'crisis-hotlines'
  | 'law-enforcement'
  | 'missing-persons'
  | 'dv-sa'
  | 'native-health'
  | 'legal-advocacy'

export type HelpPhone = {
  /** e.g. "24/7 hotline", "Non-emergency", "Missing Persons Unit" */
  label: string
  /** Display format: "(916) 808-5471" or "1-844-762-8483" */
  number: string
}

export type HelpService = {
  category: HelpCategory
  name: string
  description: string
  phones: HelpPhone[]
  /** Free-form texting/chat instructions, e.g. "Text START to 88788". */
  text?: string
  /** Full street address; rendered as a Google Maps link. */
  address?: string
  website?: string
  hours?: string
  /** Native-led or Native-specific service. */
  native?: boolean
}

export type HelpCity = {
  name: string
  slug: string
  county: string
  services: HelpService[]
}

export type HelpRegionId = 'north' | 'central' | 'south'

export type HelpRegion = {
  id: HelpRegionId
  name: string
  /** One line under the region name in the selector. */
  description: string
  cities: HelpCity[]
}

export const HELP_CATEGORY_LABELS: Record<HelpCategory, string> = {
  'crisis-hotlines': 'Crisis lines',
  'law-enforcement': 'Police & sheriff',
  'missing-persons': 'Missing person reporting',
  'dv-sa': 'Domestic violence & sexual assault',
  'native-health': 'Native health & community services',
  'legal-advocacy': 'Legal help & victim advocacy',
}

export const HELP_CATEGORY_ORDER: HelpCategory[] = [
  'crisis-hotlines',
  'law-enforcement',
  'missing-persons',
  'dv-sa',
  'native-health',
  'legal-advocacy',
]

export function isHelpRegionId(value: string | null): value is HelpRegionId {
  return value === 'north' || value === 'central' || value === 'south'
}

/** Orders a city's services into the fixed category rundown, dropping empty groups. */
export function groupByCategory(
  services: HelpService[],
): { category: HelpCategory; services: HelpService[] }[] {
  return HELP_CATEGORY_ORDER.map(category => ({
    category,
    services: services.filter(service => service.category === category),
  })).filter(group => group.services.length > 0)
}

/**
 * `tel:` href for a display number: "(916) 808-5471" → "tel:+19168085471".
 * Short codes (911, 988, 211) stay bare so the dialer treats them as-is.
 */
export function telHref(number: string): string {
  const digits = number.replace(/\D/g, '')
  if (digits.length <= 3) return `tel:${digits}`
  if (digits.length === 10) return `tel:+1${digits}`
  if (digits.length === 11 && digits.startsWith('1')) return `tel:+${digits}`
  return `tel:${digits}`
}

/** Google Maps search link for a named place, per the Maps URLs API. */
export function mapsHref(name: string, address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name}, ${address}`)}`
}
