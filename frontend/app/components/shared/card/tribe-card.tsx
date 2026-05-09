import { LuMapPin } from 'react-icons/lu'

import Link from 'next/link'
import { PortableTextBlock } from 'next-sanity'

import CustomPortableText from '@/app/components/shared/portable-text'
import SanityImage from '@/app/components/shared/sanity-image'
// import { Badge } from '@/app/components/ui/badge'
import Tile from '@/app/components/ui/tile'
import { cn } from '@/lib/utils'
import type { GetTribeQueryResult } from '@/sanity.types'

type Props = {
  className?: string
  layout?: 'grid' | 'list'
  tribe: Pick<
    NonNullable<GetTribeQueryResult>,
    'name' | 'shortDescription' | 'slug' | 'contactInfo' | 'coverImage'
  >
}

export default function TribeCard({ className, layout = 'grid', tribe }: Props) {
  return (
    <Link aria-label={tribe.name} href={`/tribes/${tribe.slug}`}>
      <article className={cn('flex size-full', layout === 'list' && 'w-full', className)}>
        <Tile
          className={cn(
            'flex flex-1',
            layout === 'grid'
              ? 'flex-col gap-8'
              : 'w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between',
            className,
          )}
        >
          <div className={cn('w-full', { 'sm:max-w-72 sm:flex-1': layout === 'list' })}>
            <SanityImage
              source={tribe.coverImage}
              alt={tribe.coverImage?.alt || tribe.name}
              className="aspect-video w-full rounded-lg"
            />
          </div>

          <div className="flex grow flex-col gap-2">
            <h3 className="font-sans text-lg font-medium">{tribe.name}</h3>
            {layout === 'grid' && tribe.shortDescription && (
              <CustomPortableText
                paragraphClassName="line-clamp-3 text-sm text-foreground-subtle"
                value={tribe.shortDescription as PortableTextBlock[]}
              />
            )}
            {layout === 'list' && tribe.contactInfo?.city && tribe.contactInfo?.state && (
              <div className="flex flex-row items-center gap-1 text-foreground-subtle">
                <LuMapPin className="size-4" />
                <p className="text-sm">
                  {tribe.contactInfo.city}, {tribe.contactInfo.state}
                </p>
              </div>
            )}
          </div>

          <div
            className={cn(
              'flex flex-row items-center',
              layout === 'grid' ? 'justify-between' : 'justify-end gap-4',
            )}
          >
            {layout === 'grid' && tribe.contactInfo?.city && tribe.contactInfo?.state && (
              <div className="flex flex-row items-center gap-1 text-foreground-subtle">
                <LuMapPin className="size-4" />
                <p className="text-sm">
                  {tribe.contactInfo.city}, {tribe.contactInfo.state}
                </p>
              </div>
            )}
          </div>
        </Tile>
      </article>
    </Link>
  )
}
