'use client'

import { useEffect, useState } from 'react'
import { LuArrowLeft } from 'react-icons/lu'

import Link from 'next/link'

import { type InternalRoute, usePreviousInternalRoute } from './navigation-history'

type BackLinkProps = {
  fallback: InternalRoute
}

function labelFromPathname(pathname: string) {
  if (pathname === '/') return 'Home'
  if (pathname === '/search') return 'Search'

  const lastSegment = pathname.split('/').filter(Boolean).at(-1)
  if (!lastSegment) return 'previous page'

  return lastSegment.replace(/-/g, ' ').replace(/\b\w/g, character => character.toUpperCase())
}

function sameSiteReferrer(): InternalRoute | null {
  try {
    if (!document.referrer) return null

    const referrer = new URL(document.referrer)
    if (referrer.origin !== window.location.origin) return null

    const href = `${referrer.pathname}${referrer.search}${referrer.hash}`
    const current = `${window.location.pathname}${window.location.search}${window.location.hash}`
    if (href === current) return null

    return { href, label: labelFromPathname(referrer.pathname) }
  } catch {
    return null
  }
}

export default function BackLink({ fallback }: BackLinkProps) {
  const previousRoute = usePreviousInternalRoute()
  const [referrerRoute, setReferrerRoute] = useState<InternalRoute | null>(null)

  useEffect(() => {
    if (!previousRoute) {
      setReferrerRoute(sameSiteReferrer())
    }
  }, [previousRoute])

  const destination = previousRoute || referrerRoute || fallback

  return (
    <Link
      href={destination.href}
      className="focus-ring inline-flex w-fit items-center gap-2 rounded-sm text-label text-foreground-subtle transition-colors hover:text-foreground"
    >
      <LuArrowLeft aria-hidden="true" className="size-4" />
      <span>Back to {destination.label}</span>
    </Link>
  )
}
