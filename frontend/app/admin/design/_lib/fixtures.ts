import type { SearchResult } from '@/lib/hooks/use-search'
import type {
  BlockContentBasic,
  GetPostQueryResult,
  GetServiceQueryResult,
  GetTribeQueryResult,
} from '@/sanity.types'

function paragraph(text: string): BlockContentBasic {
  return [
    {
      _type: 'block',
      _key: 'fixture-block',
      style: 'normal',
      children: [{ _type: 'span', _key: 'fixture-span', text, marks: [] }],
      markDefs: null,
    },
  ]
}

const emptyCoverImage = {
  alt: '',
  asset: null,
  metadata: null,
  url: null,
  extension: null,
}

export const fixtureTribe: Pick<
  NonNullable<GetTribeQueryResult>,
  'name' | 'shortDescription' | 'slug' | 'contactInfo' | 'coverImage'
> = {
  name: 'Example Tribal Nation',
  slug: 'example-tribal-nation',
  shortDescription: paragraph(
    'A California Tribal community resource listing used here as fixture content for the design system.',
  ),
  contactInfo: {
    city: 'Palm Springs',
    state: 'CA',
  },
  coverImage: emptyCoverImage,
}

export const fixtureService: Pick<
  NonNullable<GetServiceQueryResult>,
  'name' | 'shortDescription' | 'serviceType' | 'slug' | 'contactInfo'
> = {
  name: 'Family advocacy line',
  slug: 'family-advocacy-line',
  shortDescription: paragraph(
    'Connect with advocates who can help families navigate reporting, resources, and next steps.',
  ),
  serviceType: { name: 'Crisis support', slug: 'crisis-support' },
  contactInfo: {
    city: 'Sacramento',
    state: 'CA',
  },
}

export const fixturePost: Pick<
  NonNullable<GetPostQueryResult>,
  'title' | 'excerpt' | 'coverImage' | 'category' | 'topic' | 'postType' | 'slug'
> = {
  title: 'How to document a missing person report',
  slug: 'document-missing-person-report',
  postType: 'guide',
  excerpt: paragraph(
    'A calm, stepwise guide for families gathering information before contacting authorities.',
  ),
  coverImage: emptyCoverImage,
  category: { name: 'Guides', slug: 'guides', description: null },
  topic: { name: 'Reporting', slug: 'reporting', description: null },
}

export const fixtureSearchPost: SearchResult = {
  objectID: 'fixture-post',
  title: 'How to document a missing person report',
  slug: 'document-missing-person-report',
  excerpt: 'A calm, stepwise guide for families gathering information before contacting authorities.',
  postType: 'guide',
  category: { name: 'Guides', slug: 'guides' },
  topic: { name: 'Reporting', slug: 'reporting' },
  region: 'statewide',
  url: '/guides/document-missing-person-report',
  type: 'post',
}
