import Link from 'next/link'
import { PortableTextBlock } from 'next-sanity'

import CustomPortableText from '@/app/components/shared/portable-text'
import SanityImage from '@/app/components/shared/sanity-image'
import { Badge } from '@/app/components/ui/badge'
import { CARD_INTERACTION, CARD_THEME } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { GetPostQueryResult } from '@/sanity.types'

type PostCardData = {
  className?: string
  orientation?: 'horizontal' | 'vertical'
  viewMode?: 'grid' | 'list'
  post: Pick<
    NonNullable<GetPostQueryResult>,
    'title' | 'excerpt' | 'coverImage' | 'category' | 'topic' | 'postType' | 'slug'
  >
}

export default function PostCard({
  className,
  orientation = 'vertical',
  viewMode = 'grid',
  post,
}: PostCardData) {
  const isHorizontal = orientation === 'horizontal' || viewMode === 'list'
  const isMobileList = viewMode === 'list'
  const themeClasses = CARD_THEME[post.postType ?? 'default']

  return (
    <article className={cn('flex w-full min-w-0 flex-1', className)}>
      <Link
        aria-label={post.title}
        href={`/${post.category.slug}/${post.slug}`}
        className={cn(
          'flex min-w-0 flex-1 flex-col gap-6 rounded-xl border p-4',
          CARD_INTERACTION,
          isHorizontal && 'md:flex-row md:items-center',
          isMobileList && 'flex-row gap-4',
          themeClasses,
        )}
      >
        <div className={cn('w-full', isMobileList && 'w-28 shrink-0', isHorizontal && 'md:flex-1')}>
          <SanityImage
            source={post.coverImage}
            alt={post.coverImage?.alt || post.title}
            className="aspect-video w-full rounded-lg"
          />
        </div>

        <div
          className={cn(
            'flex w-full flex-col gap-2 @container',
            isMobileList && 'min-w-0 flex-1',
            isHorizontal && 'md:flex-1',
          )}
        >
          <div className="mb-1 flex flex-row items-center gap-1">
            <Badge variant={post.postType} className="capitalize">
              {post.postType}
            </Badge>
            <Badge variant={post.postType} appearance="soft">
              {post.topic.name}
            </Badge>
          </div>
          <h4 className="max-w-[34ch] font-sans text-xl font-medium @md:text-h3">{post.title}</h4>
          {post.excerpt && (
            <CustomPortableText
              paragraphClassName={cn('line-clamp-3', isMobileList && 'hidden md:block')}
              value={post.excerpt as PortableTextBlock[]}
            />
          )}
        </div>
      </Link>
    </article>
  )
}
