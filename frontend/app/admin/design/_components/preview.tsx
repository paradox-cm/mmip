import { cn } from '@/lib/utils'

export default function Preview({
  label,
  children,
  className,
}: {
  label?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <figure className="flex flex-col gap-2">
      {label ? (
        <figcaption className="text-sm font-medium text-foreground-subtle">{label}</figcaption>
      ) : null}
      <div className={cn('rounded-xl border bg-card p-4 sm:p-6', className)}>{children}</div>
    </figure>
  )
}
