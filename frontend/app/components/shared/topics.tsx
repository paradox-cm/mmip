import Link from 'next/link'

import SanityImage from '@/app/components/shared/sanity-image'
import Tile from '@/app/components/ui/tile'
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

  return (
    <div>
      <h2 className="mb-6 text-2xl">Browse by topic</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {sortedTopics.map(topic => {
          return (
            <Link key={topic._id} href={`${topic.slug}`}>
              <Tile className="group flex flex-col gap-2">
                {topic.image && topic.image.metadata && (
                  <div className="relative flex items-center justify-center py-6">
                    <SanityImage
                      source={topic.image}
                      alt={topic.image?.alt}
                      fill={false}
                      sizes="100vw"
                    />
                  </div>
                )}
                <div className="flex flex-row justify-center">
                  <div className="text-center">
                    <p className="text-lg font-medium">{topic.name}</p>
                    <p className="text-sm text-foreground-subtle">
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
  )
}
