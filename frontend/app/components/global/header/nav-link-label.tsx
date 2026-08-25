import type { CSSProperties } from 'react'

import { getTaxonomyIconSrc } from '@/lib/taxonomy-icons'
import { cn } from '@/lib/utils'

import { getNavLinkIcon, type NavLinkLike } from './nav-items'

export default function NavLinkLabel({
  link,
  iconClassName,
  className,
}: {
  link: NavLinkLike
  iconClassName?: string
  className?: string
}) {
  const icon = getNavLinkIcon(link)
  const src = icon ? getTaxonomyIconSrc(icon.kind, icon.slug, icon.name) : null

  return (
    <span className={cn('inline-flex min-w-0 items-center gap-3', className)}>
      {src ? (
        <span
          aria-hidden
          className={cn('taxonomy-icon size-5', iconClassName)}
          style={{ '--taxonomy-icon-source': `url("${src}")` } as CSSProperties}
        />
      ) : null}
      <span className="min-w-0">{link.label}</span>
    </span>
  )
}
