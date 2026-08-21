import { type PortableTextBlock } from 'next-sanity'

import PortableText from '@/app/components/shared/portable-text'
import { InfoSection } from '@/sanity.types'

type InfoProps = {
  block: InfoSection
  index: number
}

export default function CTA({ block }: InfoProps) {
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
            <PortableText className="" value={block.content as PortableTextBlock[]} />
          )}
        </div>
      </div>
    </div>
  )
}
