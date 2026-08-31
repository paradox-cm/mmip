import PostCard from '@/app/components/shared/card/post-card'
import Categories from '@/app/components/shared/categories'
import HeroSearch from '@/app/components/shared/hero-search'
import SealAnimation from '@/app/components/shared/seal-animation'
import Section from '@/app/components/shared/section'
import Topics from '@/app/components/shared/topics'
import { loadSealMarkup } from '@/lib/seal-markup'
import { cn } from '@/lib/utils'
import { GetHomepageQueryResult } from '@/sanity.types'

export default async function HomePage({ data }: { data: GetHomepageQueryResult }) {
  const { hero, featuredPosts } = data ?? {}
  const sealMarkup = await loadSealMarkup()
  return (
    <>
      {hero && (
        <Section className="border-b lg:py-28">
          <div className="container">
            <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-[minmax(0,1fr)_16rem] md:items-center md:gap-x-32 md:gap-y-6">
              <h1 className="display max-w-[16ch] text-foreground-heading md:col-start-1 md:row-start-1">
                {hero.heading}
              </h1>
              <div className="w-[180px] justify-self-start md:col-start-2 md:row-span-3 md:row-start-1 md:w-64 md:justify-self-auto">
                <SealAnimation
                  svgMarkup={sealMarkup}
                  showCaption={false}
                  className="max-w-none items-start gap-0"
                />
              </div>
              <p className="lead max-w-[50ch] md:col-start-1 md:row-start-2">{hero.subheading}</p>
              <div className="md:col-start-1 md:row-start-3 md:mt-10">
                <HeroSearch />
              </div>
            </div>
          </div>
        </Section>
      )}
      <Categories />
      {featuredPosts && featuredPosts.length > 0 && (
        <Section>
          <div className="container">
            <h2 className="mb-6 text-2xl">Featured resources</h2>
            <FeaturedPosts posts={featuredPosts} />
          </div>
        </Section>
      )}
      <Topics />
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
