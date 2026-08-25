/**
 * Approximate reading time from Sanity portable text. 200 words/minute, minimum 1.
 */
export function readingTimeMinutes(value: unknown): number {
  const words = portableTextToPlain(value)
    .trim()
    .split(/\s+/)
    .filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

function portableTextToPlain(value: unknown): string {
  if (!value) return ''
  if (typeof value === 'string') return value
  if (Array.isArray(value)) return value.map(portableTextToPlain).join(' ')
  if (typeof value !== 'object') return ''

  const node = value as { text?: unknown; children?: unknown }
  if (typeof node.text === 'string') return node.text
  if (node.children) return portableTextToPlain(node.children)
  return ''
}
