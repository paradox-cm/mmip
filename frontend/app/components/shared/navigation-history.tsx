'use client'

import { createContext, Suspense, useContext, useEffect, useRef, useState } from 'react'

import { usePathname, useSearchParams } from 'next/navigation'

export type InternalRoute = {
  href: string
  label: string
}

const STORAGE_KEY = 'resilient-relatives:last-internal-route'
const NavigationHistoryContext = createContext<InternalRoute | null>(null)

function pageTitle(title: string) {
  return title.split(' | ')[0]?.trim() || 'previous page'
}

function readStoredRoute(): InternalRoute | null {
  try {
    const value = window.sessionStorage.getItem(STORAGE_KEY)
    if (!value) return null

    const route = JSON.parse(value) as Partial<InternalRoute>
    return typeof route.href === 'string' &&
      route.href.startsWith('/') &&
      typeof route.label === 'string'
      ? { href: route.href, label: route.label }
      : null
  } catch {
    return null
  }
}

function NavigationHistoryTracker({
  onPreviousChange,
}: {
  onPreviousChange: (route: InternalRoute | null) => void
}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const previousRoute = useRef<InternalRoute | null>(null)
  const search = searchParams.toString()

  useEffect(() => {
    const route = {
      href: `${pathname}${search ? `?${search}` : ''}${window.location.hash}`,
      label: pageTitle(document.title),
    }

    if (!previousRoute.current) {
      const storedRoute = readStoredRoute()
      if (storedRoute && storedRoute.href !== route.href) {
        onPreviousChange(storedRoute)
      }
    } else if (previousRoute.current.href !== route.href) {
      onPreviousChange(previousRoute.current)
    }

    previousRoute.current = route
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(route))
  }, [onPreviousChange, pathname, search])

  return null
}

export default function NavigationHistory({ children }: { children: React.ReactNode }) {
  const [previous, setPrevious] = useState<InternalRoute | null>(null)

  return (
    <NavigationHistoryContext.Provider value={previous}>
      <Suspense fallback={null}>
        <NavigationHistoryTracker onPreviousChange={setPrevious} />
      </Suspense>
      {children}
    </NavigationHistoryContext.Provider>
  )
}

export function usePreviousInternalRoute() {
  return useContext(NavigationHistoryContext)
}
