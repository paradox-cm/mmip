#!/usr/bin/env node

/**
 * Regenerates `frontend/lib/get-help-data.ts` (the /get-help directory) and
 * `docs/get-help/SOURCES.md` (per-entry provenance) from the verified research
 * JSON in `docs/get-help/`.
 *
 * Usage: node scripts/generate-get-help-data.mjs [--verified "Month YYYY"]
 *
 * Inputs (all required):
 *   docs/get-help/statewide.json  { national: Service[], california: Service[] }
 *   docs/get-help/northern.json   { region, cities: [{ name, county, services }] }
 *   docs/get-help/central.json
 *   docs/get-help/southern.json
 *
 * Service shape (research schema — `source`/`confidence` stay out of the app
 * bundle and land in SOURCES.md instead):
 *   { category, name, description, phones: [{label, number}], text?, address?,
 *     website?, hours?, native?, source, confidence }
 */

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const frontendRoot = join(fileURLToPath(new URL('.', import.meta.url)), '..')
const repoRoot = join(frontendRoot, '..')
const docsDir = join(repoRoot, 'docs', 'get-help')
const outDataFile = join(frontendRoot, 'lib', 'get-help-data.ts')
const outSourcesFile = join(docsDir, 'SOURCES.md')

const verifiedFlag = process.argv.indexOf('--verified')
const VERIFIED_DATE =
  verifiedFlag !== -1 && process.argv[verifiedFlag + 1]
    ? process.argv[verifiedFlag + 1]
    : 'August 2026'

const CATEGORIES = new Set([
  'crisis-hotlines',
  'law-enforcement',
  'missing-persons',
  'dv-sa',
  'native-health',
  'legal-advocacy',
])

/** Canonical shell: region metadata and city order are owned here, not by research. */
const REGION_SKELETON = [
  {
    id: 'north',
    name: 'Northern California',
    description: 'Sacramento, the Bay Area, and the North Coast tribal lands',
    file: 'northern.json',
    cities: [
      { name: 'Sacramento', slug: 'sacramento', county: 'Sacramento County' },
      { name: 'San Francisco', slug: 'san-francisco', county: 'San Francisco County' },
      { name: 'Oakland', slug: 'oakland', county: 'Alameda County' },
      { name: 'San Jose', slug: 'san-jose', county: 'Santa Clara County' },
      { name: 'Eureka & Humboldt County', slug: 'eureka-humboldt', county: 'Humboldt County' },
      { name: 'Redding', slug: 'redding', county: 'Shasta County' },
    ],
  },
  {
    id: 'central',
    name: 'Central California',
    description: 'The Central Valley and the Eastern Sierra',
    file: 'central.json',
    cities: [
      { name: 'Fresno', slug: 'fresno', county: 'Fresno County' },
      { name: 'Bakersfield', slug: 'bakersfield', county: 'Kern County' },
      { name: 'Stockton', slug: 'stockton', county: 'San Joaquin County' },
      { name: 'Modesto', slug: 'modesto', county: 'Stanislaus County' },
      { name: 'Visalia & Tulare County', slug: 'visalia-tulare', county: 'Tulare County' },
      { name: 'Bishop & Eastern Sierra', slug: 'bishop-eastern-sierra', county: 'Inyo County' },
    ],
  },
  {
    id: 'south',
    name: 'Southern California',
    description: 'Los Angeles, San Diego, the Inland Empire, and desert tribal lands',
    file: 'southern.json',
    cities: [
      { name: 'Los Angeles', slug: 'los-angeles', county: 'Los Angeles County' },
      { name: 'San Diego', slug: 'san-diego', county: 'San Diego County' },
      { name: 'Riverside', slug: 'riverside', county: 'Riverside County' },
      { name: 'San Bernardino', slug: 'san-bernardino', county: 'San Bernardino County' },
      {
        name: 'Palm Springs & Coachella Valley',
        slug: 'palm-springs-coachella',
        county: 'Riverside County',
      },
      {
        name: 'Escondido & North San Diego County',
        slug: 'escondido-north-sd',
        county: 'San Diego County',
      },
    ],
  },
]

/** Fixed rundown for the hotline wall — StrongHearts leads, everything else follows. */
const HOTLINE_PRIORITY = [
  /stronghearts/i,
  /988/,
  /domestic violence/i,
  /sexual assault|rainn/i,
  /trafficking/i,
  /crisis text/i,
]

/** Escalation-ladder order for the missing-person section. */
const MISSING_PRIORITY = [
  /doj missing persons/i,
  /namus/i,
  /missing & exploited children|ncmec/i,
  /yurok/i,
  /missing & murdered unit|mmu/i,
  /fbi/i,
  /native american affairs/i,
]

/** Covered by the hard-coded Feather Alert callout on the page, not a card. */
const SKIP_AS_CARD = [/feather alert/i]

const problems = []
const warnings = []

function fail(message) {
  problems.push(message)
}

function readJson(name) {
  const path = join(docsDir, name)
  try {
    return JSON.parse(readFileSync(path, 'utf8'))
  } catch (error) {
    fail(`${name}: ${error.message}`)
    return null
  }
}

function cleanService(raw, context) {
  const where = `${context} → ${raw?.name ?? '(unnamed)'}`

  if (!raw?.name || !raw.description) {
    fail(`${where}: missing name or description`)
    return null
  }
  if (!CATEGORIES.has(raw.category)) {
    fail(`${where}: unknown category "${raw.category}"`)
    return null
  }
  const phones = (raw.phones ?? []).filter(phone => phone?.number && phone?.label)
  if (phones.length === 0 && !raw.text && !raw.website) {
    fail(`${where}: no phone, no text instructions, no website — nothing to act on`)
    return null
  }
  for (const phone of phones) {
    const digits = String(phone.number).replace(/\D/g, '')
    if (![3, 10, 11].includes(digits.length)) {
      fail(`${where}: suspicious phone "${phone.number}" (${digits.length} digits)`)
    }
  }
  if (raw.website && !/^https?:\/\//.test(raw.website)) {
    warnings.push(`${where}: website missing protocol (${raw.website})`)
  }
  if (raw.confidence && raw.confidence !== 'high') {
    warnings.push(`${where}: confidence=${raw.confidence} — double-check before shipping`)
  }
  if (!raw.source) {
    warnings.push(`${where}: no source URL recorded`)
  }

  const service = {
    category: raw.category,
    name: String(raw.name).trim(),
    description: String(raw.description).trim(),
    phones: phones.map(phone => ({
      label: String(phone.label).trim(),
      number: String(phone.number).trim(),
    })),
  }
  if (raw.text) service.text = String(raw.text).trim()
  if (raw.address) {
    const address = String(raw.address).trim()
    // The address field renders as a Google Maps link, so mailing-only
    // addresses (P.O. boxes) are dropped rather than mapped to nowhere.
    if (/^p\.?\s*o\.?\s*box/i.test(address)) {
      warnings.push(`${where}: P.O. Box address dropped (not mappable): ${address}`)
    } else {
      service.address = address
    }
  }
  if (raw.website) service.website = String(raw.website).trim()
  if (raw.hours) service.hours = String(raw.hours).trim()
  if (raw.native === true) service.native = true

  return { service, source: raw.source ?? '', confidence: raw.confidence ?? 'unknown' }
}

function rankBy(priority, service) {
  const index = priority.findIndex(pattern => pattern.test(service.name))
  return index === -1 ? priority.length : index
}

// ── Load ────────────────────────────────────────────────────────────────
const statewide = readJson('statewide.json')
const regionsRaw = Object.fromEntries(
  REGION_SKELETON.map(region => [region.id, readJson(region.file)]),
)

if (problems.length > 0) {
  console.error('Cannot generate:\n' + problems.join('\n'))
  process.exit(1)
}

// ── Statewide sections ──────────────────────────────────────────────────
const statewideEntries = []
for (const scope of ['national', 'california']) {
  for (const raw of statewide[scope] ?? []) {
    if (SKIP_AS_CARD.some(pattern => pattern.test(raw?.name ?? ''))) continue
    const cleaned = cleanService(raw, `statewide.${scope}`)
    if (cleaned) statewideEntries.push({ ...cleaned, scope })
  }
}

const hotlines = statewideEntries
  .filter(entry => ['crisis-hotlines', 'dv-sa'].includes(entry.service.category))
  .sort((a, b) => rankBy(HOTLINE_PRIORITY, a.service) - rankBy(HOTLINE_PRIORITY, b.service))
// Statewide law-enforcement contacts (BIA MMU, FBI, DOJ ONAA) are escalation
// paths for missing-person cases, so they render with that section.
const missing = statewideEntries
  .filter(entry => ['missing-persons', 'law-enforcement'].includes(entry.service.category))
  .sort((a, b) => rankBy(MISSING_PRIORITY, a.service) - rankBy(MISSING_PRIORITY, b.service))
const support = statewideEntries.filter(
  entry => !hotlines.includes(entry) && !missing.includes(entry),
)

// ── Regions ─────────────────────────────────────────────────────────────
const regions = REGION_SKELETON.map(skeleton => {
  const raw = regionsRaw[skeleton.id]
  const rawCities = new Map((raw.cities ?? []).map(cityEntry => [cityEntry.name, cityEntry]))

  for (const name of rawCities.keys()) {
    if (!skeleton.cities.some(cityEntry => cityEntry.name === name)) {
      warnings.push(`${skeleton.file}: unknown city "${name}" (dropped)`)
    }
  }

  return {
    id: skeleton.id,
    name: skeleton.name,
    description: skeleton.description,
    cities: skeleton.cities.map(cityEntry => {
      const rawCity = rawCities.get(cityEntry.name)
      if (!rawCity) {
        warnings.push(`${skeleton.file}: no data for "${cityEntry.name}"`)
        return { ...cityEntry, services: [], sources: [] }
      }
      const cleanedList = (rawCity.services ?? [])
        .map(service => cleanService(service, `${skeleton.id}/${cityEntry.name}`))
        .filter(Boolean)
      return {
        ...cityEntry,
        services: cleanedList.map(entry => entry.service),
        sources: cleanedList,
      }
    }),
  }
})

if (problems.length > 0) {
  console.error('Cannot generate:\n' + problems.join('\n'))
  process.exit(1)
}

// ── Emit get-help-data.ts ───────────────────────────────────────────────
const ts = value => JSON.stringify(value, null, 2)

const dataFile = `/**
 * Data for the Get Help emergency directory (/get-help).
 *
 * GENERATED FILE — do not edit by hand. Update the research JSON in
 * \`docs/get-help/\` and run \`node scripts/generate-get-help-data.mjs\`.
 * Per-entry sources and verification notes live in \`docs/get-help/SOURCES.md\`.
 */
import type { HelpRegion, HelpService } from './get-help'

/** Shown in the page footer so readers know how fresh the numbers are. */
export const HELP_VERIFIED_DATE = '${VERIFIED_DATE}'

/**
 * 24/7 crisis and victim-support hotlines (national + statewide).
 * Rendered in the "Call or text now" section.
 */
export const HELP_HOTLINES: HelpService[] = ${ts(hotlines.map(entry => entry.service))}

/**
 * Where to report and escalate a missing-person case.
 * Rendered in the "If someone you love is missing" section.
 */
export const HELP_MISSING_PERSON_RESOURCES: HelpService[] = ${ts(missing.map(entry => entry.service))}

/**
 * Statewide programs that help after the first call — compensation,
 * legal aid, referrals. Rendered in the "More statewide support" section.
 */
export const HELP_STATEWIDE_SUPPORT: HelpService[] = ${ts(support.map(entry => entry.service))}

/** The regional directory: Northern, Central and Southern California. */
export const HELP_REGIONS: HelpRegion[] = ${ts(
  regions.map(region => ({
    ...region,
    cities: region.cities.map(({ sources: _sources, ...cityEntry }) => cityEntry),
  })),
)}
`

// ── Emit SOURCES.md ─────────────────────────────────────────────────────
const mdRow = entry =>
  `| ${entry.service.name} | ${entry.service.category} | ${entry.service.phones
    .map(phone => phone.number)
    .join('; ')} | ${entry.confidence} | ${entry.source || '—'} |`

const mdTable = entries =>
  ['| Service | Category | Phone(s) | Confidence | Source |', '| --- | --- | --- | --- | --- |']
    .concat(entries.map(mdRow))
    .join('\n')

let sources = `# Get Help directory — verification sources

Last verified: **${VERIFIED_DATE}**. Regenerate \`frontend/lib/get-help-data.ts\` with
\`node frontend/scripts/generate-get-help-data.mjs\` after editing the JSON files here.

## Statewide & national

${mdTable(statewideEntries)}
`

for (const region of regions) {
  sources += `\n## ${region.name}\n`
  for (const cityEntry of region.cities) {
    if (cityEntry.sources.length === 0) continue
    sources += `\n### ${cityEntry.name}\n\n${mdTable(cityEntry.sources)}\n`
  }
}

mkdirSync(docsDir, { recursive: true })
writeFileSync(outDataFile, dataFile)
writeFileSync(outSourcesFile, sources)

const total =
  statewideEntries.length +
  regions.reduce(
    (sum, region) => sum + region.cities.reduce((citySum, c) => citySum + c.services.length, 0),
    0,
  )

console.log(`Wrote ${outDataFile}`)
console.log(`Wrote ${outSourcesFile}`)
console.log(
  `${total} services (${hotlines.length} hotlines, ${missing.length} missing-person, ${support.length} statewide support).`,
)
if (warnings.length > 0) {
  console.log('\nReview warnings:')
  for (const warning of warnings) console.log('  - ' + warning)
}
