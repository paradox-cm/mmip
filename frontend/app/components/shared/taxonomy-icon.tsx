import type { CSSProperties } from 'react'

import type { TaxonomyIconKind } from '@/lib/taxonomy-icons'
import { getTaxonomyIconSrc } from '@/lib/taxonomy-icons'
import { cn } from '@/lib/utils'

type TaxonomyIconProps = {
  kind: TaxonomyIconKind
  slug?: string | null
  name?: string | null
  className?: string
}

const ICON_SIZE_BY_KIND: Record<TaxonomyIconKind, string> = {
  category: 'size-24',
  topic: 'size-16',
}

export default function TaxonomyIcon({ kind, slug, name, className }: TaxonomyIconProps) {
  const src = getTaxonomyIconSrc(kind, slug, name)

  if (!src) return null

  if (kind === 'category') {
    const maskStyle = { '--taxonomy-icon-source': `url("${src}")` } as CSSProperties

    return (
      <span
        aria-hidden
        className={cn('taxonomy-icon', ICON_SIZE_BY_KIND[kind], className)}
        style={maskStyle}
      />
    )
  }

  return (
    <img
      src={src}
      alt=""
      aria-hidden
      className={cn('mx-auto shrink-0 object-contain', ICON_SIZE_BY_KIND[kind], className)}
    />
  )
}
