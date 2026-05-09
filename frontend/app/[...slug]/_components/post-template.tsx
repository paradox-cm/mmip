import { Suspense } from 'react'
import { LuDownload, LuExternalLink } from 'react-icons/lu'

import { link } from 'fs'
import Link from 'next/link'
import { PortableTextBlock } from 'next-sanity'
import pluralize from 'pluralize-esm'

import Avatar from '@/app/components/shared/avatar'
import PostCard from '@/app/components/shared/card/post-card'
import CoverImage from '@/app/components/shared/cover-image'
import PortableText from '@/app/components/shared/portable-text'
import Section from '@/app/components/shared/section'
import { Badge } from '@/app/components/ui/badge'
import { Button } from '@/app/components/ui/button'
import { formatWebsiteUrl } from '@/lib/utils'
import { cn } from '@/lib/utils'
import type { GetPostQueryResult } from '@/sanity.types'
import { fetchMorePosts } from '@/sanity/lib/fetch'

import TableOfContents from './table-of-contents'

export const CARD_THEME: Record<string, string> = {
  article: 'bg-sage-100',
  guide: 'bg-terracota-100',
  tool: 'bg-twilight-100',
  service: 'bg-gold-100',
}

export default async function PostTemplate({ post }: { post: NonNullable<GetPostQueryResult> }) {
  return (
    <>
      <Section className="border-b bg-sand-50 lg:py-24">
        <div className="container">
          <PostHeader {...post} />
        </div>
      </Section>

      <Section className="border-b">
        <div className="container">
          <PostBody {...post} />
        </div>
      </Section>

      <Section>
        <div className="container">
          <aside>
            <MorePosts skip={post._id} limit={3} />
          </aside>
        </div>
      </Section>
    </>
  )
}

function PostHeader({
  title,
  excerpt,
  category,
  topic,
  postType,
  authors,
  date,
  coverImage,
}: Pick<
  NonNullable<GetPostQueryResult>,
  'title' | 'excerpt' | 'category' | 'topic' | 'postType' | 'authors' | 'date' | 'coverImage'
>) {
  return (
    <div className="flex flex-col gap-16 md:flex-row md:items-center">
      <div className="flex w-full flex-[2] flex-col gap-6">
        <div className="flex flex-row items-center gap-1">
          <Link href={`/${pluralize(postType)}`}>
            <Badge variant={postType} className="capitalize text-white">
              {postType}
            </Badge>
          </Link>
          <Link href={`/${topic.slug}`}>
            <Badge variant={postType} className="bg-transparent">
              {topic.name}
            </Badge>
          </Link>
          {/* <Badge variant={postType} className="bg-transparent">
            {topic.name}
          </Badge> */}
        </div>
        <h1>{title}</h1>
        {excerpt?.length && (
          <PortableText
            className=""
            paragraphClassName="text-lg"
            value={excerpt as PortableTextBlock[]}
          />
        )}
        {authors?.[0] && <Avatar person={authors[0]} date={date} />}
      </div>

      <div className="flex-1">
        <CoverImage image={coverImage} />
      </div>
    </div>
  )
}

function PostBody({
  body,
  headings,
  postType,
  toolFile,
  externalLink,
}: Pick<
  NonNullable<GetPostQueryResult>,
  'body' | 'headings' | 'postType' | 'toolFile' | 'externalLink'
>) {
  console.log('externalLink:', externalLink)
  return (
    <div className="flex flex-col gap-16 md:flex-row">
      <aside className="flex-1">
        <div className="flex max-w-80 flex-col gap-6 md:sticky md:top-36 lg:top-40">
          {postType === 'tool' && toolFile !== null && (
            <a href={toolFile.asset?.url ?? ''} target="_blank" rel="noopener noreferrer">
              <Button className="flex w-full items-center justify-between gap-2">
                <span>
                  Download
                  {toolFile.asset?.mimeType === 'application/pdf' ? ' PDF' : 'File'}
                </span>
                <LuDownload />
              </Button>
            </a>
          )}
          {(postType === 'tool' || postType === 'guide') && externalLink !== null && (
            <a href={externalLink ?? ''} target="_blank" rel="noopener noreferrer">
              <Button className="flex w-full items-center justify-between gap-2">
                {formatWebsiteUrl(externalLink)}
                <LuExternalLink />
              </Button>
            </a>
          )}
          {headings && headings.length > 0 && <TableOfContents headings={headings} />}
        </div>
      </aside>
      <article className="flex-[2]">
        <PortableText className="max-w-reading" value={body as PortableTextBlock[]} />
      </article>
    </div>
  )
}

async function MorePosts({ skip, limit }: { skip: string; limit: number }) {
  const data = await fetchMorePosts(skip, limit)

  if (!data || data.length === 0) {
    return null
  }

  const postGrid =
    data.length > 0 ? (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.map(post => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    ) : (
      <div className="flex justify-center">
        <p className="text-lg text-gray-500">No related posts found.</p>
      </div>
    )

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl">Related resources</h2>
      {postGrid}
    </div>
  )
}
