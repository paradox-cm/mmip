import type { ReactNode } from 'react'

import Cta from '@/app/components/shared/cta'
import Info from '@/app/components/shared/info-section'
import type { GetPageQueryResult } from '@/sanity.types'
import { dataAttr } from '@/sanity/lib/utils'

type PageBuilderSection = NonNullable<NonNullable<GetPageQueryResult>['pageBuilder']>[number]

type BlockProps = {
  index: number
  block: PageBuilderSection
  pageId: string
  pageType: string
}

function BlockFrame({
  block,
  pageId,
  pageType,
  children,
}: {
  block: PageBuilderSection
  pageId: string
  pageType: string
  children: ReactNode
}) {
  return (
    <div
      data-sanity={dataAttr({
        id: pageId,
        type: pageType,
        path: `pageBuilder[_key=="${block._key}"]`,
      }).toString()}
    >
      {children}
    </div>
  )
}

export default function BlockRenderer({ block, index, pageId, pageType }: BlockProps) {
  switch (block._type) {
    case 'callToAction':
      return (
        <BlockFrame block={block} pageId={pageId} pageType={pageType}>
          <Cta block={block} index={index} />
        </BlockFrame>
      )
    case 'infoSection':
      return (
        <BlockFrame block={block} pageId={pageId} pageType={pageType}>
          <Info block={block} index={index} />
        </BlockFrame>
      )
    default: {
      const _exhaustive: never = block
      return _exhaustive
    }
  }
}
