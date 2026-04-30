'use client'

import { Suspense, useMemo, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import PostCard from '@/app/components/shared/card/post-card'
import Section from '@/app/components/shared/section'
import { Button } from '@/app/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select'
import type { PostTypeRoute } from '@/lib/resolve-route'

function PostTypeContent({ data }: { data: PostTypeRoute }) {
  const { postType, posts = [] } = data.data ?? {}
  const metadata = data.metadata

  const router = useRouter()
  const searchParams = useSearchParams()

  // Initialize state directly from search params
  const [selectedRegion, setSelectedRegion] = useState<string>(
    () => searchParams.get('region') || 'all',
  )
  const [selectedTopic, setSelectedTopic] = useState<string>(
    () => searchParams.get('topic') || 'all',
  )
  const [displayCount, setDisplayCount] = useState(9)

  // Update URL when filters change
  const updateSearchParams = (region: string, topic: string) => {
    const params = new URLSearchParams(searchParams)

    if (region === 'all') {
      params.delete('region')
    } else {
      params.set('region', region)
    }

    if (topic === 'all') {
      params.delete('topic')
    } else {
      params.set('topic', topic)
    }

    const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname
    router.replace(newUrl, { scroll: false })
  }

  // Get unique topics from posts
  const availableTopics = useMemo(() => {
    const topicsMap = new Map<string, { name: string; slug: string }>()

    posts.forEach(post => {
      if (post.topic && post.topic.slug) {
        topicsMap.set(post.topic.slug, {
          name: post.topic.name,
          slug: post.topic.slug,
        })
      }
    })

    return Array.from(topicsMap.values())
  }, [posts])

  // Filter posts based on selected filters
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const regionMatch = selectedRegion === 'all' || post.region === selectedRegion
      const topicMatch = selectedTopic === 'all' || post.topic?.slug === selectedTopic
      return regionMatch && topicMatch
    })
  }, [posts, selectedRegion, selectedTopic])

  // Posts to display (with load more functionality)
  const displayedPosts = useMemo(() => {
    return filteredPosts.slice(0, displayCount)
  }, [filteredPosts, displayCount])

  // Check if there are more posts to load
  const hasMorePosts = displayedPosts.length < filteredPosts.length

  // Load more function
  const loadMore = () => {
    setDisplayCount(prev => prev + 12)
  }

  // Reset display count when filters change
  const handleRegionChange = (value: string) => {
    setSelectedRegion(value)
    setDisplayCount(12)
    updateSearchParams(value, selectedTopic)
  }

  const handleTopicChange = (value: string) => {
    setSelectedTopic(value)
    setDisplayCount(12)
    updateSearchParams(selectedRegion, value)
  }

  // Clear all filters
  const clearFilters = () => {
    setSelectedRegion('all')
    setSelectedTopic('all')
    setDisplayCount(12)
    updateSearchParams('all', 'all')
  }

  return (
    <>
      <Section className="pb-8 sm:pb-8 lg:pb-8">
        <div className="container flex flex-col gap-16">
          {/* Header */}
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl text-foreground-heading">{metadata.title}</h1>
            {metadata.description && (
              <p className="max-w-reading text-lg text-foreground-subtle">{metadata.description}</p>
            )}
          </div>

          {/* Filters */}
          <div className="flex flex-col justify-end md:flex-row md:items-center">
            <div className="flex flex-wrap items-center justify-end gap-4">
              {/* Region Filter */}
              <Select value={selectedRegion} onValueChange={handleRegionChange}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="north">Northern CA</SelectItem>
                  <SelectItem value="central">Central CA</SelectItem>
                  <SelectItem value="south">Southern CA</SelectItem>
                </SelectContent>
              </Select>

              {/* Topic Filter */}
              <Select value={selectedTopic} onValueChange={handleTopicChange}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Topics</SelectItem>
                  {availableTopics.map(topic => (
                    <SelectItem key={topic.slug} value={topic.slug}>
                      {topic.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Clear Filters Button */}
              {(selectedRegion !== 'all' || selectedTopic !== 'all') && (
                <Button variant="ghost" onClick={clearFilters} size="sm">
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
        </div>
      </Section>

      <Section className="border-t">
        <div className="container">
          {/* Posts Grid */}
          {displayedPosts.length > 0 ? (
            <div className="space-y-8">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {displayedPosts.map(post => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>

              {/* Load More Button */}
              {hasMorePosts && (
                <div className="flex justify-center">
                  <Button onClick={loadMore} variant="outline" size="lg">
                    Load More Posts
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex justify-center py-12">
              <p className="text-lg text-gray-500">No posts found matching the selected filters.</p>
            </div>
          )}

          {/* Results Summary */}
          <div className="mt-8 text-center text-sm text-gray-500">
            Showing {displayedPosts.length} of {filteredPosts.length} posts
          </div>
        </div>
      </Section>
    </>
  )
}

export default function PostTypeTemplate({ data }: { data: PostTypeRoute }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PostTypeContent data={data} />
    </Suspense>
  )
}
