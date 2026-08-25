export type TaxonomyIconKind = 'category' | 'topic'

const CATEGORY_ICONS: Record<string, string> = {
  'survivors-family': 'survivors-family.svg',
  survivors: 'survivors-family.svg',
  'tribal-community': 'tribal-community.svg',
  community: 'tribal-community.svg',
  tribes: 'tribes.svg',
  tribe: 'tribes.svg',
  'advocates-providers': 'advocates-providers.svg',
  'advocacy-providers': 'advocates-providers.svg',
  advocacy: 'advocates-providers.svg',
  'services-directory': 'services-directory.svg',
  services: 'services-directory.svg',
  service: 'services-directory.svg',
}

const TOPIC_ICONS: Record<string, string> = {
  'survivor-help': 'survivor-help.svg',
  'cultural-supports': 'cultural-supports.svg',
  'healthcare-wellness': 'healthcare-wellness.svg',
  'healing-and-wellness': 'healthcare-wellness.svg',
  'healing-wellness': 'healthcare-wellness.svg',
  'crisis-shelter': 'crisis-shelter.svg',
  'crisis-shelter-services': 'crisis-shelter.svg',
  'crisis-support': 'crisis-shelter.svg',
  'prevention-awareness': 'prevention-awareness.svg',
  'prevention-and-awareness': 'prevention-awareness.svg',
  'safety-and-prevention': 'prevention-awareness.svg',
  'safety-prevention': 'prevention-awareness.svg',
  'flyers-downloads': 'flyers-downloads.svg',
  legislation: 'legislation.svg',
  'legislation-action': 'legislation.svg',
  tools: 'tools.svg',
  'advocacy-toolkits': 'tools.svg',
  'data-and-research': 'tools.svg',
  training: 'training.svg',
  'training-connection': 'training.svg',
  'community-events-and-training': 'training.svg',
  'community-events-training': 'training.svg',
}

function slugifyName(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function slugCandidates(slug?: string | null, name?: string | null): string[] {
  const candidates: string[] = []

  if (slug) {
    candidates.push(slug)

    const withoutAnd = slug.replace(/-and-/g, '-')
    if (withoutAnd !== slug) {
      candidates.push(withoutAnd)
    }
  }

  if (name) {
    candidates.push(slugifyName(name))
  }

  return candidates
}

function resolveIconFile(
  kind: TaxonomyIconKind,
  slug?: string | null,
  name?: string | null,
): string | null {
  const icons = kind === 'category' ? CATEGORY_ICONS : TOPIC_ICONS

  for (const candidate of slugCandidates(slug, name)) {
    const file = icons[candidate]
    if (file) return file
  }

  return null
}

export function getTaxonomyIconSrc(
  kind: TaxonomyIconKind,
  slug?: string | null,
  name?: string | null,
): string | null {
  const file = resolveIconFile(kind, slug, name)
  if (!file) return null

  return `/icons/${kind === 'category' ? 'categories' : 'topics'}/${file}`
}
