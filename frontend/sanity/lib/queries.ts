import { defineQuery } from 'next-sanity'

const imageFields = /* groq */ `
  alt,
  asset,
  "metadata": asset->metadata,
  "url": asset->url,
  "extension": asset->extension
`

const linkReference = /* groq */ `
  _type == "link" => {
    _type,
    linkType,
    label,
    openInNewTab,
    page->{
      name,
      "slug": slug.current
    },
    post->{
      title,
      "slug": slug.current
    },
    category->{
      name,
      description,
      "slug": slug.current,
      image{
        ${imageFields}
      }
    }
  }
`

const linkFields = /* groq */ `
  link {
    ${linkReference}
  }
`

const commonPostFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  postType,
  "slug": slug.current,
  "title": coalesce(title, "Untitled"),
  excerpt,
  coverImage{
    ${imageFields}
  },
  "date": coalesce(date, _updatedAt),
  category->{name, "slug": slug.current, description},
  topic->{name, "slug": slug.current, description},
  region
`

const postFields = /* groq */ `
  ${commonPostFields},
  body[]{
    ...,
    markDefs[]{
      ...,
      ${linkReference}
    }
  },
  "headings": body[_type == "block" && style in ["h2", "h3"]]{
    _key,
    "level": style,
    "text": pt::text(@)
  },
  authors[]->{firstName, lastName, picture},
  toolFile{
    _type,
    asset->{
      extension,
      mimeType,
      originalFilename,
      size,
      url
    },
    media
  },
  externalLink,
  metadata
`

// Singletons
export const settingsQuery = defineQuery(`*[_type == "settings"][0]`)

export const navigationQuery = defineQuery(`
  *[_type == "navigation"][0]{
    primaryNav[]{
      _key,
      _type,
      type,
      link{
        ${linkReference}
      },
      dropdownLabel,
      dropdownItems[]{
        ${linkReference}
      }
    },
    footerNav[]{
      ${linkReference}
    }
  }
`)

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subheading,
    metadata,
    "pageBuilder": pageBuilder[]{
      ...,
      _type == "callToAction" => {
        ${linkFields},
      },
      _type == "infoSection" => {
        content[]{
          ...,
          markDefs[]{
            ...,
            ${linkReference}
          }
        }
      },
    },
  }
`)

// Homepage
export const getHomepageQuery = defineQuery(`
  *[_type == "home"][0]{
    hero{
      heading,
      subheading,
      image{
        ${imageFields}
      }
    },
    featuredPosts[]->{
      ${commonPostFields}
    },
    featuredServices[]->{
      ...
    },
    seo
  }
`)

// Sitemap

export const sitemapData = defineQuery(`
  *[_type in ["page", "post", "service", "tribe"] && defined(slug.current)] | order(_type asc) {
    "slug": slug.current,
    "categorySlug": category->slug.current,
    _type,
    _updatedAt,
  }
`)

// Posts

export const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`)

export const getPostsByTypeQuery = defineQuery(`
  *[_type == "post" && postType == $postType] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`)

export const morePostsQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`)

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    ${postFields}
  }
`)

export const getPostQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug && category->slug.current == $categorySlug][0] {
    body[]{
      ...,
      markDefs[]{
        ...,
        ${linkReference}
      }
    },
    ${postFields}
  }
`)

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  {"slug": slug.current}
`)

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`)

export const categoriesSlugs = defineQuery(`
  *[_type == "category" && defined(slug.current)]
  {"slug": slug.current}
`)

export const topicsSlugs = defineQuery(`
  *[_type == "topic" && defined(slug.current)]
  {"slug": slug.current}
`)

export const postRoutesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current) && defined(category->slug.current)]
  {
    "slug": slug.current,
    "categorySlug": category->slug.current
  }
`)

// Categories
const categoryFields = /* groq */ `
  _id,
  name,
  "slug": slug.current,
  description,
  image{
    ${imageFields}
  },
  order
`

export const allCategoriesQuery = defineQuery(`
  *[_type == "category" && defined(slug.current)] | order(order asc) {
    ${categoryFields}
  }
`)

export const getCategoryQuery = defineQuery(`
  *[_type == 'category' && slug.current == $slug][0]{
    ${categoryFields}
  }
`)

export const getCategoryWithAllPostsQuery = defineQuery(`
  *[_type == 'category' && slug.current == $slug][0]{
    ${categoryFields},
    "posts": *[_type == "post" && category._ref == ^._id] | order(date desc, _updatedAt desc) {
      ${commonPostFields}
    },
    "availableTopics": array::unique(*[_type == "post" && category._ref == ^._id && defined(topic)].topic->{
      name,
      "slug": slug.current
    })
  }
`)

// Topics
const topicFields = /* groq */ `
  _id,
  name,
  "slug": slug.current,
  description,
  image{
    ${imageFields}
  },
  order
`

export const allTopicsQuery = defineQuery(`
  *[_type == "topic" && defined(slug.current)] | order(order asc) {
    ${topicFields}
  }
`)

export const getTopicQuery = defineQuery(`
  *[_type == 'topic' && slug.current == $slug][0]{
    ${topicFields}
  }
`)

export const getTopicWithAllPostsQuery = defineQuery(`
  *[_type == 'topic' && slug.current == $slug][0]{
    ${topicFields},
    "posts": *[_type == "post" && topic._ref == ^._id] | order(date desc, _updatedAt desc) {
      ${commonPostFields}
    },
    "availableTopics": array::unique(*[_type == "post" && category._ref == ^._id && defined(topic)].topic->{
      name,
      "slug": slug.current
    })
  }
`)

// Services
const commonServiceFields = /* groq */ `
  _id,
  _type,
  _updatedAt,
  contactInfo,
  coverImage{
    ${imageFields}
  },
  name,
  region,
  serviceType->{
    name,
    "slug": slug.current
  },
  "slug": slug.current,
  shortDescription
`

const serviceFields = /* groq */ `
  ${commonServiceFields},
  description,
  hours,
  metadata
`

export const allServicesQuery = defineQuery(`
  *[_type == "service" && defined(slug.current)] | order(name asc) {
    ${commonServiceFields}
  }
`)

export const getServiceQuery = defineQuery(`
  *[_type == "service" && slug.current == $slug][0] {
    ${serviceFields}
  }
`)

// Tribes
const commonTribeFields = /* groq */ `
  _id,
  _type,
  _updatedAt,
  contactInfo,
  coverImage{
    ${imageFields}
  },
  name,
  region,
  "slug": slug.current,
  shortDescription
`

const tribeFields = /* groq */ `
  ${commonTribeFields},
  description,
  metadata
`

export const allTribesQuery = defineQuery(`
  *[_type == "tribe" && defined(slug.current)] | order(name asc) {
    ${commonTribeFields}
  }
`)

export const getTribeQuery = defineQuery(`
  *[_type == "tribe" && slug.current == $slug][0] {
    ${tribeFields}
  }
`)
