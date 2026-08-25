import { LuMapPin } from 'react-icons/lu'

import Link from 'next/link'
import { PortableTextBlock } from 'next-sanity'

import CustomPortableText from '@/app/components/shared/portable-text'
import { Badge } from '@/app/components/ui/badge'
import Tile from '@/app/components/ui/tile'
import { CARD_INTERACTION } from '@/lib/constants'
import { cn } from '@/lib/utils'
import type { GetServiceQueryResult } from '@/sanity.types'

type Props = {
  className?: string
  layout?: 'grid' | 'list'
  service: Pick<
    NonNullable<GetServiceQueryResult>,
    'name' | 'shortDescription' | 'serviceType' | 'slug' | 'contactInfo'
  >
}

export default function ServiceCard({ className, layout = 'grid', service }: Props) {
  return (
    <Link
      aria-label={service.name}
      href={`/services/${service.slug}`}
      className={cn('group block min-w-0 rounded-xl', CARD_INTERACTION)}
    >
      <article className={cn('flex size-full min-w-0', layout === 'list' && 'w-full', className)}>
        <Tile
          className={cn(
            'flex min-w-0 flex-1',
            layout === 'grid'
              ? 'flex-col gap-8'
              : 'w-full flex-row items-center justify-between gap-3 p-4 sm:gap-4 sm:p-6',
            className,
          )}
        >
          <div className="flex min-w-0 grow flex-col gap-2">
            <h3 className="break-words font-sans text-lg font-medium">{service.name}</h3>
            {layout === 'grid' && service.shortDescription && (
              <CustomPortableText
                className="min-w-0"
                paragraphClassName="line-clamp-3 text-sm text-foreground-subtle"
                value={service.shortDescription as PortableTextBlock[]}
              />
            )}
            {layout === 'list' && service.contactInfo?.city && (
              <div className="flex flex-row items-center gap-1 text-foreground-subtle">
                <LuMapPin className="size-4" />
                <p className="text-sm">
                  {service.contactInfo.city}, {service.contactInfo.state}
                </p>
              </div>
            )}
          </div>

          <div
            className={cn(
              'flex min-w-0 flex-row flex-wrap items-center',
              layout === 'grid' ? 'justify-between gap-2' : 'shrink-0 justify-end gap-4',
            )}
          >
            {layout === 'grid' && service.contactInfo?.city && (
              <div className="flex flex-row items-center gap-1 text-foreground-subtle">
                <LuMapPin className="size-4" />
                <p className="text-sm">
                  {service.contactInfo?.city}, {service.contactInfo?.state}
                </p>
              </div>
            )}

            <Badge variant="secondary" className="font-normal">
              {service.serviceType.name}
            </Badge>
          </div>
        </Tile>
      </article>
    </Link>
  )
}
