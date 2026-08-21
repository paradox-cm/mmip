'use client'

import { Toaster } from 'sonner'

import { useAppearance } from './appearance-provider'

export function AppearanceToaster() {
  const { resolvedAppearance } = useAppearance()

  return (
    <Toaster
      theme={resolvedAppearance}
      toastOptions={{
        classNames: {
          toast:
            'border border-strong bg-popover text-popover-foreground shadow-layer',
          title: 'text-foreground-heading',
          description: 'text-foreground-muted',
          actionButton: 'bg-primary text-primary-foreground',
          cancelButton: 'bg-muted text-muted-foreground',
        },
      }}
    />
  )
}
