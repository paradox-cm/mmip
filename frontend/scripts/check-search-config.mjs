import { algoliasearch } from 'algoliasearch'

const indexes = ['posts', 'services', 'tribes']
const requirements = [
  {
    name: 'NEXT_PUBLIC_ALGOLIA_APP_ID',
    value: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  },
  {
    name: 'NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY',
    value: process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY,
  },
  {
    name: 'ALGOLIA_WRITE_API_KEY',
    value: process.env.ALGOLIA_WRITE_API_KEY || process.env.ALGOLIA_ADMIN_API_KEY,
  },
  {
    name: 'SANITY_WEBHOOK_SECRET',
    value: process.env.SANITY_WEBHOOK_SECRET,
  },
]

function isConfigured(value) {
  const trimmed = value?.trim()
  return Boolean(trimmed && !trimmed.startsWith('<'))
}

const missing = requirements.filter(requirement => !isConfigured(requirement.value))

if (missing.length > 0) {
  console.error('Search configuration is incomplete. Missing:')
  for (const requirement of missing) {
    console.error(`- ${requirement.name}`)
  }
  process.exitCode = 1
} else {
  const client = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY,
  )

  try {
    const response = await client.search(
      indexes.map(indexName => ({
        indexName,
        params: { query: '', hitsPerPage: 0 },
      })),
    )

    console.log('Search configuration and public index access are valid:')
    response.results.forEach((result, index) => {
      console.log(`- ${indexes[index]}: ${result.nbHits ?? 0} records`)
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown Algolia error'
    console.error(`Search connectivity check failed: ${message}`)
    process.exitCode = 1
  }
}
