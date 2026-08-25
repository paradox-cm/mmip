import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

export default function PageHeader({
  title,
  description,
}: {
  title: string
  description?: string
}) {
  return (
    <header className="flex flex-col gap-3 border-b pb-8">
      <h1 className="font-heading text-4xl font-medium tracking-tight md:text-5xl">{title}</h1>
      {description ? (
        <p className="lead max-w-reading text-foreground-subtle">{description}</p>
      ) : null}
    </header>
  )
}

export function DocSection({
  id,
  title,
  description,
  children,
  className,
}: {
  id?: string
  title: string
  description?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} className={cn('flex scroll-mt-24 flex-col gap-4', className)}>
      <div className="space-y-1">
        <h2 className="font-heading text-2xl font-medium tracking-tight md:text-3xl">{title}</h2>
        {description ? <p className="max-w-reading text-foreground-subtle">{description}</p> : null}
      </div>
      {children}
    </section>
  )
}

export function DocCode({ children }: { children: string }) {
  return (
    <code className="rounded bg-muted px-1 py-0.5 font-mono text-[0.9em] text-foreground">
      {children}
    </code>
  )
}
