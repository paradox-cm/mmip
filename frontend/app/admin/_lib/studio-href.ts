/**
 * Studio is a separate app (port 3333 locally). The shared `studioUrl` helper
 * falls back to a hosted-studio slug, which is not a usable href. This resolver
 * is for human links from the admin console only.
 */
export function resolveStudioHref() {
  const raw = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL?.trim()

  if (!raw) return 'http://localhost:3333'
  if (/^https?:\/\//i.test(raw)) return raw
  if (raw.includes('.')) return `https://${raw}`
  return `https://${raw}.sanity.studio`
}
