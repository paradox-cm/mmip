'use client'

import Link from 'next/link'
import { SanityDocument } from 'next-sanity'
import { useOptimistic } from 'next-sanity/hooks'

import BlockRenderer from '@/app/components/shared/block-renderer'
import Section from '@/app/components/shared/section'
import { Button } from '@/app/components/ui/button'
import { GetPageQueryResult } from '@/sanity.types'
import { dataAttr } from '@/sanity/lib/utils'

type PageBuilderPageProps = {
  page: GetPageQueryResult
}

type PageBuilderSection = NonNullable<NonNullable<GetPageQueryResult>['pageBuilder']>[number]

type PageData = {
  _id: string
  _type: string
  pageBuilder?: PageBuilderSection[]
}

function renderSections(pageBuilderSections: PageBuilderSection[], page: GetPageQueryResult) {
  if (!page) {
    return null
  }
  return (
    <div
      data-sanity={dataAttr({
        id: page._id,
        type: page._type,
        path: `pageBuilder`,
      }).toString()}
    >
      {pageBuilderSections.map((block, index) => (
        <BlockRenderer
          key={block._key}
          index={index}
          block={block}
          pageId={page._id}
          pageType={page._type}
        />
      ))}
    </div>
  )
}

function renderEmptyState(page: GetPageQueryResult) {
  if (!page) {
    return null
  }
  return (
    <Section>
      <div className="container">
        <h1 className="text-h2 font-extrabold tracking-tight text-foreground-heading sm:text-h1">
          More content is on the way
        </h1>
        <p className="mt-4 max-w-xl text-body-small text-foreground-muted">
          We&apos;re working on bringing you more information here. Please check back soon.
        </p>
        <div className="mt-10 flex">
          <Button asChild size="lg">
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </div>
    </Section>
  )
}

export default function PageBuilder({ page }: PageBuilderPageProps) {
  const pageBuilderSections = useOptimistic<
    PageBuilderSection[] | undefined,
    SanityDocument<PageData>
  >(page?.pageBuilder || [], (currentSections, action) => {
    if (action.id !== page?._id) {
      return currentSections
    }

    if (action.document.pageBuilder) {
      // Reconcile References. https://www.sanity.io/docs/enabling-drag-and-drop#ffe728eea8c1
      return action.document.pageBuilder.map(
        section => currentSections?.find(s => s._key === section?._key) || section,
      )
    }

    return currentSections
  })

  if (!page) {
    return renderEmptyState(page)
  }

  return pageBuilderSections && pageBuilderSections.length > 0
    ? renderSections(pageBuilderSections, page)
    : renderEmptyState(page)
}
