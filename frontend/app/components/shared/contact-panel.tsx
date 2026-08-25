'use client'

import { useCallback } from 'react'
import { LuCopy, LuGlobe, LuMail, LuMapPin, LuPhone } from 'react-icons/lu'

import { toast } from 'sonner'

import { Button } from '@/app/components/ui/button'
import { formatWebsiteUrl } from '@/lib/utils'

export type ContactInfo = {
  address?: string
  city?: string
  state?: string
  zip?: string
  phone?: string
  email?: string
  website?: string
}

function addressLines(contact: ContactInfo): string[] {
  const street = contact.address?.trim()
  const locality = [contact.city, contact.state, contact.zip].filter(Boolean).join(', ')
  return [street, locality].filter((line): line is string => Boolean(line))
}

function mapsHref(contact: ContactInfo): string | null {
  const query = addressLines(contact).join(', ')
  if (!query) return null
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

function CopyButton({ value, label }: { value: string; label: string }) {
  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value)
      toast.success('Copied')
    } catch {
      toast.error('Could not copy')
    }
  }, [value])

  return (
    <Button type="button" variant="ghost" size="icon" aria-label={label} onClick={onCopy}>
      <LuCopy aria-hidden="true" />
    </Button>
  )
}

const rowClass = 'flex min-h-11 items-center gap-2 rounded-lg text-sm text-foreground'

const linkClass =
  'focus-ring inline-flex min-h-11 min-w-0 flex-1 items-center gap-2 rounded-lg px-1 text-sm text-foreground hover:underline'

export default function ContactPanel({ contact }: { contact: ContactInfo }) {
  const lines = addressLines(contact)
  const maps = mapsHref(contact)
  const hasAnything = lines.length > 0 || contact.phone || contact.email || contact.website
  if (!hasAnything) return null

  return (
    <div className="rounded-lg border bg-card p-6">
      <h3 className="mb-4 font-sans text-lg font-semibold">Contact Information</h3>
      <div className="flex flex-col gap-1">
        {lines.length > 0 ? (
          <div className={rowClass}>
            <LuMapPin className="size-4 shrink-0 text-foreground-muted" aria-hidden="true" />
            <div className="min-w-0 flex-1 text-sm">
              {lines.map(line => (
                <div key={line}>{line}</div>
              ))}
              {maps ? (
                <a
                  href={maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring mt-1 inline-flex min-h-11 items-center rounded-sm text-sm font-medium text-primary"
                >
                  Open in maps
                </a>
              ) : null}
            </div>
            <CopyButton value={lines.join(', ')} label="Copy address" />
          </div>
        ) : null}

        {contact.phone ? (
          <div className={rowClass}>
            <a href={`tel:${contact.phone}`} className={linkClass}>
              <LuPhone className="size-4 shrink-0 text-foreground-muted" aria-hidden="true" />
              {contact.phone}
            </a>
            <CopyButton value={contact.phone} label="Copy phone number" />
          </div>
        ) : null}

        {contact.email ? (
          <div className={rowClass}>
            <a href={`mailto:${contact.email}`} className={linkClass}>
              <LuMail className="size-4 shrink-0 text-foreground-muted" aria-hidden="true" />
              <span className="truncate">{contact.email}</span>
            </a>
            <CopyButton value={contact.email} label="Copy email address" />
          </div>
        ) : null}

        {contact.website ? (
          <div className={rowClass}>
            <a
              href={contact.website}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              <LuGlobe className="size-4 shrink-0 text-foreground-muted" aria-hidden="true" />
              <span className="truncate">{formatWebsiteUrl(contact.website)}</span>
            </a>
          </div>
        ) : null}
      </div>
    </div>
  )
}
