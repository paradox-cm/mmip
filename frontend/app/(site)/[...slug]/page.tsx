// app/[...slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import Breadcrumbs from '@/app/components/shared/breadcrumbs'
import PageBuilderPage from '@/app/components/shared/page-builder'
import { POST_TYPE } from '@/lib/constants'
import {
  createArticleJsonLd,
  createCollectionPageJsonLd,
  createWebPageJsonLd,
  toJsonLdScript,
} from '@/lib/jsonld'
import { resolveRoute } from '@/lib/resolve-route'
import { resolveSocialImage } from '@/lib/social-image'
import type { GetPageQueryResult } from '@/sanity.types'
import { fetchSettings } from '@/sanity/lib/fetch'
import { sanityFetch } from '@/sanity/lib/live'
import { categoriesSlugs, pagesSlugs, postRoutesSlugs, topicsSlugs } from '@/sanity/lib/queries'
import { resolveOpenGraphImage } from '@/sanity/lib/utils'

import CategoryTemplate from './_components/category-template'
import PostTemplate from './_components/post-template'
import PostTypeTemplate from './_components/post-type-template'

type Props = {
  params: Promise<{ slug: string[] }>
}

/**
 * Generate the static params for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
  const [pagesResult, categoriesResult, topicsResult, postsResult] = await Promise.all([
    sanityFetch({
      query: pagesSlugs,
      perspective: 'published',
      stega: false,
    }),
    sanityFetch({
      query: categoriesSlugs,
      perspective: 'published',
      stega: false,
    }),
    sanityFetch({
      query: topicsSlugs,
      perspective: 'published',
      stega: false,
    }),
    sanityFetch({
      query: postRoutesSlugs,
      perspective: 'published',
      stega: false,
    }),
  ])

  const pages = (pagesResult.data || []) as Array<{ slug?: string }>
  const categories = (categoriesResult.data || []) as Array<{ slug?: string }>
  const topics = (topicsResult.data || []) as Array<{ slug?: string }>
  const posts = (postsResult.data || []) as Array<{ slug?: string; categorySlug?: string }>

  const staticParams = [
    ...pages.filter(page => page.slug).map(page => ({ slug: [page.slug as string] })),
    ...categories
      .filter(category => category.slug)
      .map(category => ({ slug: [category.slug as string] })),
    ...topics.filter(topic => topic.slug).map(topic => ({ slug: [topic.slug as string] })),
    ...Object.keys(POST_TYPE).map(postTypeSlug => ({ slug: [postTypeSlug] })),
    ...posts
      .filter(post => post.categorySlug && post.slug)
      .map(post => ({ slug: [post.categorySlug as string, post.slug as string] })),
  ]

  return staticParams
}

/**
 * ─────────────────────────────────────────
 * Generate Metadata
 * ─────────────────────────────────────────
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const settings = await fetchSettings()
  const resolved = await resolveRoute(slug)

  if (resolved.type === 'not-found') return {}

  const ogImage =
    resolved.type === 'post' ? resolveOpenGraphImage(resolved.metadata.openGraphImage) : undefined
  const baseOgImage = resolveOpenGraphImage(settings?.ogImage)
  const socialImage = resolveSocialImage(ogImage, baseOgImage)
  const path = `/${slug.join('/')}`

  return {
    title: resolved.metadata.title,
    description: resolved.metadata.description,
    openGraph: {
      title: resolved.metadata.title,
      description: resolved.metadata.description,
      url: path,
      type: 'website',
      images: [socialImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: resolved.metadata.title,
      description: resolved.metadata.description,
      images: [socialImage.url],
    },
    robots:
      resolved.type === 'post'
        ? {
            index: !resolved.metadata.hideSearchIndex,
            follow: !resolved.metadata.hideSearchIndex,
            googleBot: {
              index: !resolved.metadata.hideSearchIndex,
              follow: !resolved.metadata.hideSearchIndex,
            },
          }
        : {},
  }
}

/**
 * ─────────────────────────────────────────
 * Page switch
 * ─────────────────────────────────────────
 */
export default async function Page({ params }: Props) {
  const { slug } = await params
  const resolved = await resolveRoute(slug)
  const path = `/${slug.join('/')}`

  const renderWithJsonLd = (jsonLd: Record<string, unknown>, content: React.ReactNode) => (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLdScript(jsonLd) }}
      />
      {content}
    </>
  )

  switch (resolved.type) {
    case 'page':
      return renderWithJsonLd(
        createWebPageJsonLd({
          path,
          title: resolved.metadata.title,
          description: resolved.metadata.description,
        }),
        <RenderPage page={resolved.data} />,
      )
    case 'post-type':
      return renderWithJsonLd(
        createCollectionPageJsonLd({
          path,
          title: resolved.metadata.title,
          description: resolved.metadata.description,
          itemPaths: (resolved.data.posts || [])
            .filter(post => post.category?.slug && post.slug)
            .map(post => `/${post.category!.slug}/${post.slug}`),
        }),
        <PostTypeTemplate data={resolved} />,
      )
    case 'category':
      return renderWithJsonLd(
        createCollectionPageJsonLd({
          path,
          title: resolved.metadata.title,
          description: resolved.metadata.description,
          itemPaths: resolved.data.posts
            .filter(post => post.category?.slug && post.slug)
            .map(post => `/${post.category!.slug}/${post.slug}`),
        }),
        <CategoryTemplate data={resolved.data} />,
      )
    case 'topic':
      return renderWithJsonLd(
        createCollectionPageJsonLd({
          path,
          title: resolved.metadata.title,
          description: resolved.metadata.description,
          itemPaths: resolved.data.posts
            .filter(post => post.category?.slug && post.slug)
            .map(post => `/${post.category!.slug}/${post.slug}`),
        }),
        <CategoryTemplate data={resolved.data} />,
      )
    case 'post':
      return renderWithJsonLd(
        createArticleJsonLd({
          path,
          title: resolved.metadata.title,
          description: resolved.metadata.description,
          image: resolved.data.coverImage?.url || undefined,
          datePublished: resolved.data.date || undefined,
          section: resolved.data.category?.name || resolved.data.topic?.name || undefined,
        }),
        <PostTemplate post={resolved.data} />,
      )
    case 'not-found':
      return notFound()
    default:
      return notFound()
  }
}

/**
 * ─────────────────────────────────────────
 * Render: One-off static page
 * ─────────────────────────────────────────
 */
function RenderPage({ page }: { page: NonNullable<GetPageQueryResult> }) {
  return (
    <div className="my-12 lg:my-24">
      <div className="container border-b pb-6">
        <div className="max-w-3xl">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: page.heading }]} />
          <h2 className="mt-6 text-h1 font-bold tracking-tight text-foreground-heading sm:text-5xl lg:text-7xl">
            {page.heading}
          </h2>
          <p className="mt-4 text-body-small font-light uppercase leading-relaxed text-foreground-subtle lg:text-lg">
            {page.subheading}
          </p>
        </div>
      </div>

      <PageBuilderPage page={page} />
    </div>
  )
}
