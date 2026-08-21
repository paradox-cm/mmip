'use client'

import { LuMonitor, LuMoon, LuSun } from 'react-icons/lu'

import { Button } from '@/app/components/ui/button'
import { cn } from '@/lib/utils'

import { useAppearance } from './appearance-provider'
import { type Appearance, APPEARANCES } from './config'

const OPTIONS: Record<Appearance, { label: string; Icon: typeof LuSun }> = {
  light: { label: 'Light', Icon: LuSun },
  dark: { label: 'Dark', Icon: LuMoon },
  system: { label: 'System', Icon: LuMonitor },
}

function nextAppearance(current: Appearance): Appearance {
  const index = APPEARANCES.indexOf(current)
  return APPEARANCES[(index + 1) % APPEARANCES.length]
}

export default function AppearanceToggle({
  className,
  compact = false,
}: {
  className?: string
  /** Single header button that cycles Light → Dark → System. */
  compact?: boolean
}) {
  const { appearance, setAppearance, ready } = useAppearance()
  const current = ready ? appearance : 'system'

  if (compact) {
    const { label, Icon } = OPTIONS[current]
    const next = nextAppearance(current)
    return (
      <Button
        type="button"
        variant="outline"
        size="icon"
        className={cn('size-[50px]', className)}
        aria-label={`Appearance: ${label}. Switch to ${OPTIONS[next].label}`}
        title={`${label} appearance`}
        onClick={() => setAppearance(next)}
      >
        <Icon className="size-5" aria-hidden="true" />
      </Button>
    )
  }

  return (
    <div
      role="radiogroup"
      aria-label="Appearance"
      className={cn(
        'inline-flex items-center gap-0.5 rounded-lg border border-strong bg-background p-1',
        className,
      )}
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
