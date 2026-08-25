'use client'

import { useEffect, useState } from 'react'

import { Toaster } from 'sonner'

type ToasterTheme = 'light' | 'dark'

function readTheme(): ToasterTheme {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

export default function ThemeToaster() {
  const [theme, setTheme] = useState<ToasterTheme>('light')

  useEffect(() => {
    const root = document.documentElement
    const sync = () => setTheme(readTheme())
    sync()
    const observer = new MutationObserver(sync)
    observer.observe(root, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  return (
    <Toaster
      theme={theme}
      toastOptions={{
        classNames: {
          toast: 'border-border bg-popover text-popover-foreground',
          description: 'text-foreground-subtle',
          actionButton: 'bg-primary text-primary-foreground',
          cancelButton: 'bg-muted text-muted-foreground',
        },
      }}
    />
  )
}
