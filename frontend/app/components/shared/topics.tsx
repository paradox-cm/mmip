import Link from 'next/link'

import SanityImage from '@/app/components/shared/sanity-image'
import Section from '@/app/components/shared/section'
import TaxonomyIcon from '@/app/components/shared/taxonomy-icon'
import Tile from '@/app/components/ui/tile'
import { CARD_INTERACTION } from '@/lib/constants'
import { getTaxonomyIconSrc } from '@/lib/taxonomy-icons'
import { cn } from '@/lib/utils'
import { fetchAllPosts, fetchTopics } from '@/sanity/lib/fetch'

export default async function Topics() {
  const [data, posts] = await Promise.all([fetchTopics(), fetchAllPosts()])

  if (!data || data.length === 0) {
    return null
  }

  const topicPostCounts = posts.reduce(
    (acc, post) => {
      const topicSlug = post.topic?.slug

      if (!topicSlug) return acc

      acc[topicSlug] = (acc[topicSlug] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const sortedTopics = [...data].sort((a, b) => {
    const countA = topicPostCounts[a.slug] || 0
    const countB = topicPostCounts[b.slug] || 0

    if (countB !== countA) {
      return countB - countA
    }

    return a.name.localeCompare(b.name)
  })

  const topicsWithPosts = sortedTopics.filter(topic => (topicPostCounts[topic.slug] || 0) > 0)

  if (topicsWithPosts.length === 0) {
    return null
  }

  return (
    <Section>
      <div className="container">
        <h2 className="mb-6 text-h3">Browse by topic</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {topicsWithPosts.map(topic => {
            const iconSrc = getTaxonomyIconSrc('topic', topic.slug, topic.name)

            return (
              <Link
                key={topic._id}
                href={`${topic.slug}`}
                className={cn('group block rounded-xl', CARD_INTERACTION)}
              >
                <Tile className="flex flex-col gap-2">
                  <div className="flex h-24 items-center justify-center">
                    {iconSrc ? (
                      <TaxonomyIcon kind="topic" slug={topic.slug} name={topic.name} />
                    ) : (
                      topic.image &&
                      topic.image.metadata && (
                        <SanityImage
                          source={topic.image}
                          alt={topic.image?.alt}
                          fill={false}
                          sizes="100vw"
                          className="mx-auto size-16 object-contain"
                        />
                      )
                    )}
                  </div>
                  <div className="flex flex-row justify-center">
                    <div className="text-center">
                      <p className="text-body font-medium">{topic.name}</p>
                      <p className="text-label text-foreground-subtle">
                        {topicPostCounts[topic.slug] || 0}{' '}
                        {(topicPostCounts[topic.slug] || 0) === 1 ? 'post' : 'posts'}
                      </p>
                    </div>
                  </div>
                </Tile>
              </Link>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
