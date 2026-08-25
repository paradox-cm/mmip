import { type PortableTextBlock } from 'next-sanity'

import PortableText from '@/app/components/shared/portable-text'
import type { GetPageQueryResult } from '@/sanity.types'

type InfoBlock = Extract<
  NonNullable<NonNullable<GetPageQueryResult>['pageBuilder']>[number],
  { _type: 'infoSection' }
>

type InfoProps = {
  block: InfoBlock
  index: number
}

export default function Info({ block }: InfoProps) {
  return (
    <div className="container my-12">
      <div className="max-w-3xl">
        {block?.heading && (
          <h2 className="text-h3 font-bold text-foreground-heading md:text-3xl lg:text-4xl">
            {block.heading}
          </h2>
        )}
        {block?.subheading && (
          <span className="mb-8 mt-4 block text-body font-light uppercase text-foreground-subtle">
            {block.subheading}
          </span>
        )}
        <div className="mt-4">
          {block?.content?.length && (
            <PortableText value={block.content as PortableTextBlock[]} />
          )}
        </div>
      </div>
    </div>
  )
}
