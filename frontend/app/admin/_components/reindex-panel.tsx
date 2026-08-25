'use client'

import { useState } from 'react'

import { Button } from '@/app/components/ui/button'

export default function ReindexPanel({ enabled }: { enabled: boolean }) {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<unknown>(null)

  async function handleReindex() {
    setIsLoading(true)
    try {
      const response = await fetch('/api/search/index', { method: 'GET' })
      setResult(await response.json())
    } catch (error) {
      console.error('Reindex error:', error)
      setResult({ error: 'Failed to reindex' })
    }
    setIsLoading(false)
  }

  if (!enabled) {
    return (
      <p className="max-w-reading text-sm text-foreground-subtle">
        Full index refresh from this page is local development only. In production, POST to{' '}
        <code className="rounded bg-muted px-1 py-0.5 font-mono text-[0.9em] text-foreground">
          /api/search/index
        </code>{' '}
        with the webhook secret, as described in{' '}
        <code className="rounded bg-muted px-1 py-0.5 font-mono text-[0.9em] text-foreground">
          SEARCH_HANDOFF.md
        </code>
        .
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="max-w-reading text-sm text-foreground-subtle">
        Rebuilds the Algolia <code className="font-mono text-[0.9em]">posts</code>,{' '}
        <code className="font-mono text-[0.9em]">services</code>, and{' '}
        <code className="font-mono text-[0.9em]">tribes</code> indexes from published Sanity
        documents. Uses the development GET route; it is forbidden outside local dev.
      </p>
      <div>
        <Button type="button" onClick={handleReindex} loading={isLoading}>
          {isLoading ? 'Reindexing' : 'Reindex Algolia search'}
        </Button>
      </div>
      {result != null && (
        <pre className="overflow-x-auto rounded-lg bg-background-subtle p-4 text-label">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  )
}
