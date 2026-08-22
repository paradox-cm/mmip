import PostCard from '@/app/components/shared/card/post-card'
import Categories from '@/app/components/shared/categories'
import HeroSearch from '@/app/components/shared/hero-search'
import SanityImage from '@/app/components/shared/sanity-image'
import Section from '@/app/components/shared/section'
import Topics from '@/app/components/shared/topics'
import { cn } from '@/lib/utils'
import { GetHomepageQueryResult } from '@/sanity.types'

export default async function HomePage({ data }: { data: GetHomepageQueryResult }) {
  const { hero, featuredPosts, featuredServices } = data ?? {}
  return (
    <>
      {hero && (
        <Section className="border-b lg:py-28">
          <div className="container">
            <div className="flex flex-col items-center justify-between gap-32 md:flex-row">
              <div className="flex flex-col gap-16">
                <div className="flex flex-col gap-6">
                  <h1 className="display max-w-[16ch] text-foreground-heading">{hero.heading}</h1>
                  <p className="lead max-w-[50ch]">{hero.subheading}</p>
                </div>
                <div>
                  <HeroSearch />
                </div>
              </div>
              {hero.image && (
                <div className="shrink-0">
                  <SanityImage
                    source={hero.image}
                    alt={hero.image.alt}
                    className="w-64 max-w-full"
                  />
                </div>
              )}
            </div>
          </div>
        </Section>
      )}
      <Section>
        <div className="container">
          <Categories />
        </div>
      </Section>
      {featuredPosts && featuredPosts.length > 0 && (
        <Section>
          <div className="container">
            <h2 className="mb-6 text-2xl">Featured resources</h2>
            <FeaturedPosts posts={featuredPosts} />
          </div>
        </Section>
      )}
      {featuredServices && featuredServices.length > 0 && (
        <Section>
          <div className="container">
            <aside className="">{/* <FeaturedServices services={featuredServices} /> */}</aside>
          </div>
        </Section>
      )}
      <Section>
        <div className="container">
          <Topics />
        </div>
      </Section>
    </>
  )
}

function FeaturedPosts({ posts }: { posts: NonNullable<GetHomepageQueryResult>['featuredPosts'] }) {
  if (!posts || posts.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {posts.map((post, index) => {
        const isLast = index === posts.length - 1
        return (
          <PostCard
            key={post._id}
            post={post}
            className={cn('col-span-1', { 'md:col-span-2': isLast })}
            orientation={!isLast ? 'vertical' : 'horizontal'}
          />
        )
      })}
    </div>
  )
}
