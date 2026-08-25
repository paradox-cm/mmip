import { LuDownload, LuExternalLink } from 'react-icons/lu'

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
import type { GetPostQueryResult } from '@/sanity.types'
import { fetchMorePosts } from '@/sanity/lib/fetch'

import TableOfContents from './table-of-contents'

export default async function PostTemplate({ post }: { post: NonNullable<GetPostQueryResult> }) {
  return (
    <>
      <Section className="border-b bg-background-subtle lg:py-24">
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
    <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-16">
      <div className="flex w-full flex-[2] flex-col gap-6">
        <div className="flex flex-row flex-wrap items-center gap-1">
          <Link href={`/${pluralize(postType)}`} className="rounded-md">
            <Badge variant={postType} className="capitalize">
              {postType}
            </Badge>
          </Link>
          <Link href={`/${topic.slug}`} className="rounded-md">
            <Badge variant={postType} appearance="soft">
              {topic.name}
            </Badge>
          </Link>
        </div>
        <h1>{title}</h1>
        {excerpt?.length && (
          <PortableText
            className=""
            paragraphClassName="text-lg"
            value={excerpt as PortableTextBlock[]}
          />
        )}
        {/* {authors?.[0] && <Avatar person={authors[0]} date={date} />} */}
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
  return (
    <div className="flex flex-col-reverse gap-8 md:flex-row md:gap-16">
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
      <div className="grid min-w-0 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.map(post => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    ) : (
      <div className="flex justify-center">
        <p className="text-body text-foreground-muted">No related posts found.</p>
      </div>
    )

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-h3">Related resources</h2>
      {postGrid}
    </div>
  )
}
