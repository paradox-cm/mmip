import 'server-only'

/**
 * Viewer token for draft/preview fetches and Presentation.
 * Optional for published builds — Preview and Production can collect page data
 * without it. Draft mode and unpublished content require it at request time.
 */
export const token = process.env.SANITY_API_READ_TOKEN
