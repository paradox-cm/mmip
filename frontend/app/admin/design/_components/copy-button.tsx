'use client'

import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

export default function CopyButton({
  value,
  className,
}: {
  value: string
  className?: string
}) {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    }
  }, [])

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
      timeoutRef.current = window.setTimeout(() => setCopied(false), 1400)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        'focus-ring min-h-8 max-w-full truncate rounded-md px-1.5 py-1 text-left font-mono text-xs text-foreground-muted hover:bg-accent hover:text-foreground',
        className,
      )}
      aria-label={`Copy ${value}`}
    >
      <span>{copied ? 'Copied' : value}</span>
      {copied ? (
        <span className="sr-only" aria-live="polite">
          Copied to clipboard
        </span>
      ) : null}
    </button>
  )
}
