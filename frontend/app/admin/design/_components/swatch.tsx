import { cn } from '@/lib/utils'

import CopyButton from './copy-button'

export function ColorSwatch({
  label,
  className,
  cssVar,
  tokenClass,
}: {
  label: string
  className: string
  cssVar?: string
  tokenClass?: string
}) {
  return (
    <div className="flex min-w-0 flex-col overflow-hidden rounded-lg border bg-background">
      <div
        className={cn('h-16 w-full ring-1 ring-inset ring-border', className)}
        aria-hidden="true"
      />
      <div className="flex flex-col gap-0.5 p-2">
        <p className="text-sm font-medium">{label}</p>
        {tokenClass ? <CopyButton value={tokenClass} /> : null}
        {cssVar ? <CopyButton value={cssVar} /> : null}
      </div>
    </div>
  )
}

export function PaletteRow({
  name,
  role,
  swatches,
}: {
  name: string
  role: string
  swatches: { step: string; className: string; cssVar: string }[]
}) {
  return (
    <div className="space-y-3">
      <div>
        <h3 className="font-medium">{name}</h3>
        <p className="text-sm text-foreground-subtle">{role}</p>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(4.75rem,1fr))] gap-2">
        {swatches.map(swatch => (
          <ColorSwatch
            key={swatch.cssVar}
            label={swatch.step}
            className={swatch.className}
            cssVar={swatch.cssVar}
            tokenClass={swatch.className}
          />
        ))}
      </div>
    </div>
  )
}
