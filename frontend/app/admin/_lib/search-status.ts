function isConfigured(value: string | undefined) {
  const trimmed = value?.trim()
  return Boolean(trimmed && !trimmed.startsWith('<'))
}

export type SearchStatusFlag = {
  id: string
  label: string
  configured: boolean
  exposure: 'public' | 'server'
}

export function getSearchStatus(): SearchStatusFlag[] {
  return [
    {
      id: 'app-id',
      label: 'NEXT_PUBLIC_ALGOLIA_APP_ID',
      configured: isConfigured(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID),
      exposure: 'public',
    },
    {
      id: 'search-key',
      label: 'NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY',
      configured: isConfigured(process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY),
      exposure: 'public',
    },
    {
      id: 'write-key',
      label: 'ALGOLIA_WRITE_API_KEY',
      configured: isConfigured(
        process.env.ALGOLIA_WRITE_API_KEY || process.env.ALGOLIA_ADMIN_API_KEY,
      ),
      exposure: 'server',
    },
    {
      id: 'webhook',
      label: 'SANITY_WEBHOOK_SECRET',
      configured: isConfigured(process.env.SANITY_WEBHOOK_SECRET),
      exposure: 'server',
    },
  ]
}

export function isSearchPublicReady(flags: SearchStatusFlag[]) {
  return flags.filter(flag => flag.exposure === 'public').every(flag => flag.configured)
}
