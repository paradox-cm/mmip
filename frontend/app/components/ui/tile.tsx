import { cn } from '@/lib/utils'

export default function Tile({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'rounded-xl border border-strong bg-card p-6',
        'transition-[background-color,border-color] duration-fast ease-standard',
        // Responds to its own hover and to an interactive ancestor marked `group`.
        'hover:border-strong hover:bg-card-hover',
        'group-hover:border-strong group-hover:bg-card-hover',
        className,
      )}
    >
      {children}
    </div>
  )
}
