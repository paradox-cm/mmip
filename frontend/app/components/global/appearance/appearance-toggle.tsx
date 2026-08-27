'use client'

import { useState } from 'react'
import { LuCheck, LuMoon, LuSun } from 'react-icons/lu'

import { Button } from '@/app/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/app/components/ui/popover'
import { cn } from '@/lib/utils'

import { useAppearance } from './appearance-provider'
import { type Appearance, APPEARANCES } from './config'

const OPTION_LABELS: Record<Appearance, string> = {
  light: 'Light',
  dark: 'Dark',
  system: 'System',
}

export default function AppearanceToggle({
  className,
  container,
}: {
  className?: string
  /** Portal target. Pass the open sheet so the menu stays above it. */
  container?: HTMLElement | null
}) {
  const { appearance, resolvedAppearance, setAppearance, ready } = useAppearance()
  const [open, setOpen] = useState(false)

  const isDark = ready && resolvedAppearance === 'dark'
  const Icon = isDark ? LuMoon : LuSun

  function handleSelect(option: Appearance) {
    setAppearance(option)
    setOpen(false)
  }

  return (
    <Popover modal open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className={cn(
            'data-[state=open]:border-strong data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
            className,
          )}
          aria-label="Choose appearance"
          aria-pressed={isDark}
          disabled={!ready}
        >
          <Icon className="size-5" aria-hidden="true" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        side="bottom"
        container={container}
        className="min-w-40"
        onCloseAutoFocus={event => event.preventDefault()}
      >
        <p className="px-2 py-1.5 text-caption font-medium uppercase tracking-wide text-foreground-muted">
          Appearance
        </p>
        <div role="radiogroup" aria-label="Appearance" className="flex flex-col gap-0.5">
          {APPEARANCES.map(option => {
            const selected = ready && appearance === option

            return (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => handleSelect(option)}
                className={cn(
                  'relative flex w-full cursor-default select-none items-center rounded-md py-2 pl-2 pr-8 text-label outline-none',
                  'transition-colors duration-fast ease-standard',
                  'hover:bg-accent hover:text-accent-foreground active:bg-accent-active',
                  'focus-visible:ring-2 focus-visible:ring-ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-popover',
                  selected && 'bg-accent font-medium text-accent-foreground',
                )}
              >
                {OPTION_LABELS[option]}
                {selected && (
                  <span className="absolute right-2 flex size-3.5 items-center justify-center">
                    <LuCheck className="size-4" aria-hidden="true" />
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}
