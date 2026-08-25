'use client'

import { useLayoutEffect, useState } from 'react'
import { LuMoon, LuSun } from 'react-icons/lu'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { APPEARANCE_STORAGE_KEY } from '@/app/components/global/appearance/config'
import LogoMark from '@/app/components/shared/logo-mark'
import SkipLink from '@/app/components/shared/skip-link'
import { Button } from '@/app/components/ui/button'
import { cn } from '@/lib/utils'

import { ADMIN_NAV, isAdminNavActive } from '../_lib/nav'
import SignOutButton from './sign-out-button'

type Theme = 'light' | 'dark'

function applyHtmlTheme(theme: Theme) {
  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dark')
  root.setAttribute('data-color-scheme', theme)
}

function readStoredTheme(): Theme | null {
  try {
    const stored = window.localStorage.getItem(APPEARANCE_STORAGE_KEY)
    if (stored === 'dark' || stored === 'light') return stored
    if (stored === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
  } catch {
    // Ignore storage access errors (private mode, etc.)
  }
  return null
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [theme, setTheme] = useState<Theme>('light')

  useLayoutEffect(() => {
    const stored = readStoredTheme()
    if (stored) {
      setTheme(stored)
      applyHtmlTheme(stored)
    }
  }, [])

  const isDark = theme === 'dark'

  function toggleTheme() {
    const next: Theme = isDark ? 'light' : 'dark'
    setTheme(next)
    applyHtmlTheme(next)
    try {
      window.localStorage.setItem(APPEARANCE_STORAGE_KEY, next)
    } catch {
      // Ignore storage access errors
    }
  }

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <SkipLink href="#admin-content">Skip to admin content</SkipLink>
      <header className="sticky top-0 z-30 border-b bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between gap-4 px-4 lg:px-6">
          <Link href="/admin" className="focus-ring flex min-w-0 items-center gap-3 rounded-lg">
            <LogoMark className="size-8" />
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="truncate text-sm font-medium">Resilient Relatives</span>
              <span className="text-xs text-foreground-muted">Admin</span>
            </span>
          </Link>
          <div className="flex shrink-0 items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              aria-pressed={isDark}
              aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
              onClick={toggleTheme}
            >
              {isDark ? <LuSun aria-hidden="true" /> : <LuMoon aria-hidden="true" />}
              {isDark ? 'Light' : 'Dark'}
            </Button>
            <SignOutButton />
            <Button asChild variant="outline" size="sm">
              <Link href="/">View site</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-screen-xl gap-8 px-4 py-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:px-6">
        <aside className="hidden lg:block">
          <nav aria-label="Admin" className="sticky top-24 flex flex-col gap-6">
            {ADMIN_NAV.map(section => (
              <div key={section.title}>
                <h2 className="mb-2 font-sans text-xs font-medium uppercase tracking-wide text-foreground-muted">
                  {section.title}
                </h2>
                <ul className="flex flex-col gap-0.5">
                  {section.items.map(item => {
                    const active = isAdminNavActive(pathname, item.href)
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          aria-current={active ? 'page' : undefined}
                          className={cn(
                            'focus-ring flex min-h-10 items-center rounded-lg px-3 py-2 text-sm',
                            active
                              ? 'bg-accent font-medium text-foreground'
                              : 'text-foreground-subtle hover:bg-accent/70 hover:text-foreground',
                          )}
                        >
                          {item.label}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        <div className="lg:hidden">
          <label htmlFor="admin-mobile-nav" className="mb-2 block text-sm font-medium">
            Admin section
          </label>
          <select
            id="admin-mobile-nav"
            className="focus-ring min-h-11 w-full rounded-lg border border-input bg-input p-3 text-base"
            value={pathname}
            onChange={event => router.push(event.target.value)}
          >
            {ADMIN_NAV.map(section => (
              <optgroup key={section.title} label={section.title}>
                {section.items.map(item => (
                  <option key={item.href} value={item.href}>
                    {item.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <main
          id="admin-content"
          tabIndex={-1}
          className="flex min-w-0 flex-col gap-12 outline-none"
        >
          {children}
        </main>
      </div>
    </div>
  )
}
