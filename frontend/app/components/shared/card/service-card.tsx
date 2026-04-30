import { LuMapPin } from 'react-icons/lu'

import Link from 'next/link'
import { PortableTextBlock } from 'next-sanity'

import CustomPortableText from '@/app/components/shared/portable-text'
import { Badge } from '@/app/components/ui/badge'
import Tile from '@/app/components/ui/tile'
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
    <Link aria-label={service.name} href={`/services/${service.slug}`}>
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
          <div className="flex grow flex-col gap-2">
            <h3 className="font-sans text-lg font-medium">{service.name}</h3>
            {layout === 'grid' && service.shortDescription && (
              <CustomPortableText
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
              'flex flex-row items-center',
              layout === 'grid' ? 'justify-between' : 'justify-between gap-4 sm:justify-end',
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

            <Badge variant="outline" className="bg-sand-200/50 font-normal">
              {service.serviceType.name}
            </Badge>
          </div>
        </Tile>
      </article>
    </Link>
  )
}
