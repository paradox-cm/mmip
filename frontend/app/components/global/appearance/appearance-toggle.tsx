'use client'

import { LuMonitor, LuMoon, LuSun } from 'react-icons/lu'

import { cn } from '@/lib/utils'

import { useAppearance } from './appearance-provider'
import { APPEARANCES, type Appearance } from './config'

const OPTIONS: Record<Appearance, { label: string; Icon: typeof LuSun }> = {
  light: { label: 'Light', Icon: LuSun },
  dark: { label: 'Dark', Icon: LuMoon },
  system: { label: 'System', Icon: LuMonitor },
}

export default function AppearanceToggle({ className }: { className?: string }) {
  const { appearance, setAppearance, ready } = useAppearance()

  return (
    <div
      role="radiogroup"
      aria-label="Appearance"
      className={cn('inline-flex items-center gap-0.5 rounded-lg border bg-background p-1', className)}
    >
      {APPEARANCES.map(option => {
        const { label, Icon } = OPTIONS[option]
        const selected = ready && appearance === option

        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={label}
            title={`${label} appearance`}
            onClick={() => setAppearance(option)}
            className={cn(
              'inline-flex size-8 items-center justify-center rounded-md outline-none transition-colors duration-fast ease-standard',
              'focus-visible:ring-2 focus-visible:ring-ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background',
              'active:scale-95 motion-reduce:active:scale-100',
              selected
                ? 'bg-foreground text-background'
                : 'text-foreground-subtle hover:bg-accent hover:text-foreground active:bg-accent-active',
            )}
          >
            <Icon className="size-4" aria-hidden="true" />
          </button>
        )
      })}
    </div>
  )
}
