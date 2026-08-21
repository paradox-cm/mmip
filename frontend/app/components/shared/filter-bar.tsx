'use client'

import { Button } from '@/app/components/ui/button'
import { Field } from '@/app/components/ui/field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select'
import { REGION_OPTIONS, SORT_OPTIONS, type SortOption, type ViewMode } from '@/lib/filters'
import { cn } from '@/lib/utils'

/**
 * The directory filter pattern shared by the services, tribes, category and
 * post-type templates. Same markup and behaviour they each had inline, minus
 * the copies — plus focus-visible, press and labelling for assistive tech.
 */
export function FilterBar({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={cn('flex flex-col gap-5', className)}>{children}</div>
}

export function FilterControls({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between',
        className,
      )}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">{children}</div>
    </div>
  )
}

export function SelectFilter({
  label,
  value,
  onValueChange,
  placeholder,
  options,
  className,
}: {
  label: string
  value: string | undefined
  onValueChange: (value: string) => void
  placeholder: string
  options: ReadonlyArray<{ value: string; label: string }>
  className?: string
}) {
  return (
    <Field label={label} labelHidden>
      {fieldProps => (
        <Select value={value} onValueChange={onValueChange}>
          <SelectTrigger {...fieldProps} className={cn('w-full', className)}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </Field>
  )
}

export function RegionFilter({
  value,
  onValueChange,
  className = 'sm:w-48',
}: {
  value: string
  onValueChange: (value: string) => void
  className?: string
}) {
  return (
    <SelectFilter
      label="Filter by region"
      placeholder="Filter by region"
      value={value}
      onValueChange={onValueChange}
      options={REGION_OPTIONS}
      className={className}
    />
  )
}

export function SortFilter({
  value,
  onValueChange,
  className = 'sm:w-56',
}: {
  value: SortOption | undefined
  onValueChange: (value: string) => void
  className?: string
}) {
  return (
    <SelectFilter
      label="Sort results"
      placeholder="Sort"
      value={value}
      onValueChange={onValueChange}
      options={SORT_OPTIONS}
      className={className}
    />
  )
}

const SEGMENT_CLASSES =
  'rounded-md px-3 py-1.5 text-label font-medium outline-none transition-colors duration-fast ease-standard focus-visible:ring-2 focus-visible:ring-ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] motion-reduce:active:scale-100'

export function ViewToggle({
  value,
  onValueChange,
}: {
  value: ViewMode
  onValueChange: (value: ViewMode) => void
}) {
  return (
    <div
      role="group"
      aria-label="Result layout"
      className="inline-flex items-center rounded-lg border bg-background p-1"
    >
      {(['grid', 'list'] as const).map(mode => (
        <button
          key={mode}
          type="button"
          aria-pressed={value === mode}
          className={cn(
            SEGMENT_CLASSES,
            value === mode
              ? 'bg-foreground text-background'
              : 'text-foreground-subtle hover:bg-accent hover:text-foreground active:bg-accent-active',
          )}
          onClick={() => onValueChange(mode)}
        >
          {mode === 'grid' ? 'Grid' : 'List'}
        </button>
      ))}
    </div>
  )
}

const CHIP_CLASSES =
  'rounded-pill border px-3 py-1.5 text-label font-medium outline-none transition-colors duration-fast ease-standard focus-visible:ring-2 focus-visible:ring-ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] motion-reduce:active:scale-100'

export function FilterChips({
  label,
  allLabel,
  value,
  onValueChange,
  options,
}: {
  label: string
  allLabel: string
  value: string
  onValueChange: (value: string) => void
  options: ReadonlyArray<{ name: string; slug: string }>
}) {
  const chips = [{ name: allLabel, slug: 'all' }, ...options]

  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {chips.map(chip => (
        <button
          key={chip.slug}
          type="button"
          aria-pressed={value === chip.slug}
          className={cn(
            CHIP_CLASSES,
            value === chip.slug
              ? 'border-foreground bg-foreground text-background'
              : 'border-border bg-background text-foreground-subtle hover:border-strong hover:bg-accent hover:text-foreground active:bg-accent-active',
          )}
          onClick={() => onValueChange(chip.slug)}
        >
          {chip.name}
        </button>
      ))}
    </div>
  )
}

export function ClearFiltersButton({ onClick }: { onClick: () => void }) {
  return (
    <Button variant="ghost" onClick={onClick} size="sm">
      Clear Filters
    </Button>
  )
}
