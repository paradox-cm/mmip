/**
 * As this file is reused in several other files, try to keep it lean and small.
 * Importing other npm packages here could lead to needlessly increasing the client bundle size, or end up in a server-only function that don't need it.
 */

// Same public defaults as studio/sanity.config.ts. Vercel Production can
// collect page data when the dashboard vars are unset or empty; env still wins.
const DEFAULT_PROJECT_ID = 't4dq0r7i'
const DEFAULT_DATASET = 'production'

function publicEnv(value: string | undefined, fallback: string): string {
  const trimmed = value?.trim()
  return trimmed ? trimmed : fallback
}

export const dataset = publicEnv(process.env.NEXT_PUBLIC_SANITY_DATASET, DEFAULT_DATASET)

export const projectId = publicEnv(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, DEFAULT_PROJECT_ID)

/**
 * see https://www.sanity.io/docs/api-versioning for how versioning works
 */
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-28'

/**
 * Used to configure edit intent links, for Presentation Mode, as well as to configure where the Studio is mounted in the router.
 */
export const studioUrl = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || 'cahuilla-mmip'

export const isPreviewEnvironment = process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production'
