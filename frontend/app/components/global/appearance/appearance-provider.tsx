'use client'

import * as React from 'react'

import {
  type Appearance,
  APPEARANCE_STORAGE_KEY,
  isAppearance,
  type ResolvedAppearance,
} from './config'

type AppearanceContextValue = {
  appearance: Appearance
  resolvedAppearance: ResolvedAppearance
  setAppearance: (next: Appearance) => void
  /** False until the client has read the stored preference. */
  ready: boolean
}

const AppearanceContext = React.createContext<AppearanceContextValue | null>(null)

const DARK_QUERY = '(prefers-color-scheme: dark)'

function systemAppearance(): ResolvedAppearance {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light'
}

function applyToDocument(resolved: ResolvedAppearance) {
  const root = document.documentElement
  root.classList.toggle('dark', resolved === 'dark')
  root.setAttribute('data-color-scheme', resolved)
  root.style.colorScheme = resolved
}

export function AppearanceProvider({ children }: { children: React.ReactNode }) {
  const [appearance, setAppearanceState] = React.useState<Appearance>('system')
  const [resolvedAppearance, setResolvedAppearance] = React.useState<ResolvedAppearance>('light')
  const [ready, setReady] = React.useState(false)

  // Adopt whatever the boot script already decided, then keep it in sync.
  React.useEffect(() => {
    const stored = window.localStorage.getItem(APPEARANCE_STORAGE_KEY)
    const next = isAppearance(stored) ? stored : 'system'
    setAppearanceState(next)
    setResolvedAppearance(next === 'system' ? systemAppearance() : next)
    setReady(true)
  }, [])

  React.useEffect(() => {
    if (!ready) return
    applyToDocument(resolvedAppearance)
  }, [ready, resolvedAppearance])

  React.useEffect(() => {
    if (appearance !== 'system') return
    const media = window.matchMedia(DARK_QUERY)
    const onChange = (event: MediaQueryListEvent) => {
      setResolvedAppearance(event.matches ? 'dark' : 'light')
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [appearance])

  const setAppearance = React.useCallback((next: Appearance) => {
    setAppearanceState(next)
    setResolvedAppearance(next === 'system' ? systemAppearance() : next)
    try {
      window.localStorage.setItem(APPEARANCE_STORAGE_KEY, next)
    } catch {
      // Private browsing and similar: the choice just will not persist.
    }
  }, [])

  const value = React.useMemo(
    () => ({ appearance, resolvedAppearance, setAppearance, ready }),
    [appearance, resolvedAppearance, setAppearance, ready],
  )

  return <AppearanceContext.Provider value={value}>{children}</AppearanceContext.Provider>
}

export function useAppearance() {
  const context = React.useContext(AppearanceContext)
  if (!context) {
    throw new Error('useAppearance must be used inside an AppearanceProvider')
  }
  return context
}
