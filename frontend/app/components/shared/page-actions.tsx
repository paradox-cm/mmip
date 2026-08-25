'use client'

import { useCallback, useState } from 'react'
import { LuCheck, LuLink, LuPrinter, LuShare2 } from 'react-icons/lu'

import { toast } from 'sonner'

import { Button } from '@/app/components/ui/button'
import { cn } from '@/lib/utils'

type PageActionsProps = {
  title: string
  className?: string
}

export default function PageActions({ title, className }: PageActionsProps) {
  const [copied, setCopied] = useState(false)

  const currentUrl = () => (typeof window === 'undefined' ? '' : window.location.href)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(currentUrl())
      setCopied(true)
      toast.success('Link copied')
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Could not copy the link')
    }
  }, [])

  const handleShare = useCallback(async () => {
    const url = currentUrl()
    if (typeof navigator.share !== 'function') {
      await handleCopy()
      return
    }
    try {
      await navigator.share({ title, url })
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return
      toast.error('Could not share this page')
    }
  }, [handleCopy, title])

  const handlePrint = useCallback(() => {
    window.print()
  }, [])

  return (
    <div
      data-print-hide
      className={cn('flex flex-wrap items-center gap-2', className)}
      role="group"
      aria-label="Page actions"
    >
      <Button type="button" variant="outline" onClick={handleCopy} aria-label="Copy link">
        {copied ? <LuCheck aria-hidden="true" /> : <LuLink aria-hidden="true" />}
        Copy link
      </Button>
      <Button type="button" variant="outline" onClick={handleShare}>
        <LuShare2 aria-hidden="true" />
        Share
      </Button>
      <Button type="button" variant="outline" onClick={handlePrint}>
        <LuPrinter aria-hidden="true" />
        Print
      </Button>
    </div>
  )
}
