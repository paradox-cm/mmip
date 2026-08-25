/**
 * This config is used to configure your Sanity Studio.
 * Learn more: https://www.sanity.io/docs/configuration
 */

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/schemas'
import { structure } from './src/structure'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import {
  type DocumentLocationResolver,
  type DocumentLocationsState,
  presentationTool,
  defineDocuments,
  defineLocations,
  type DocumentLocation,
} from 'sanity/presentation'
import { assist } from '@sanity/assist'

// Environment variables for project configuration
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 't4dq0r7i'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

// URL for preview functionality, defaults to localhost:3000 if not set
const SANITY_STUDIO_PREVIEW_URL = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'

// Define the home location for the presentation tool
const homeLocation = {
  title: 'Home',
  href: '/',
} satisfies DocumentLocation

const servicesLocation = {
  title: 'Services',
  href: '/services',
} satisfies DocumentLocation

// resolveHref() is a convenience function that resolves the URL
// path for different document types and used in the presentation tool.
function resolveHref(
  documentType?: string,
  slug?: string,
  categorySlug?: string,
  postType?: string,
): string | undefined {
  switch (documentType) {
    case 'home':
      return '/'
    case 'post':
      return slug && categorySlug ? `/${categorySlug}/${slug}` : undefined
    case 'service':
      return slug ? `/services/${slug}` : undefined
    case 'page':
      return slug ? `/${slug}` : undefined
    case 'category':
      return slug ? `/${slug}` : undefined
    case 'topic':
      return slug ? `/${slug}` : undefined
    case 'articles':
    case 'guides':
    case 'tools':
      return `/${documentType}`
    default:
      console.warn('Invalid document type:', documentType)
      return undefined
  }
}

// Main Sanity configuration
export default defineConfig({
  name: 'cahuilla-mmip',
  title: 'Resilient Relatives',
  projectId,
  dataset,
  plugins: [
    // Presentation tool configuration for Visual Editing
    presentationTool({
      previewUrl: {
        origin: SANITY_STUDIO_PREVIEW_URL,
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
      resolve: {
        // The Main Document Resolver API provides a method of resolving a main document from a given route or route pattern. https://www.sanity.io/docs/presentation-resolver-api#57720a5678d9
        mainDocuments: defineDocuments([
          {
            route: '/',
            filter: `_type == "home"`,
          },
          {
            route: '/articles',
            filter: `_type == "post" && postType == "article"`,
          },
          {
            route: '/guides',
            filter: `_type == "post" && postType == "guide"`,
          },
          {
            route: '/tools',
            filter: `_type == "post" && postType == "tool"`,
          },
          {
            route: '/services',
            filter: `_type == "service"`,
          },
          {
            route: '/services/:slug',
            filter: `_type == "service" && slug.current == $slug || _id == $slug`,
          },
          {
            route: '/:categorySlug/:slug',
            filter: `_type == "post" && slug.current == $slug && category->slug.current == $categorySlug || _id == $slug`,
          },
          {
            route: '/:slug',
            filter: `(_type == "page" && slug.current == $slug) || (_type == "category" && slug.current == $slug) || (_type == "topic" && slug.current == $slug) || _id == $slug`,
          },
        ]),
        // Locations Resolver API allows you to define where data is being used in your application. https://www.sanity.io/docs/visual-editing/presentation-resolver-api
        locations: {
          settings: defineLocations({
            locations: [homeLocation],
            message: 'This document is used on all pages',
            tone: 'positive',
          }),
          home: defineLocations({
            locations: [homeLocation],
            message: 'This is the homepage',
            tone: 'positive',
          }),
          navigation: defineLocations({
            locations: [homeLocation],
            message: 'This navigation appears on all pages',
            tone: 'positive',
          }),
          page: defineLocations({
            select: {
              name: 'name',
              slug: 'slug.current',
            },
            resolve: doc => ({
              locations: [
                {
                  title: doc?.name || 'Untitled',
                  href: resolveHref('page', doc?.slug)!,
                },
              ],
            }),
          }),
          post: defineLocations({
            select: {
              title: 'title',
              slug: 'slug.current',
              categorySlug: 'category.slug.current',
              postType: 'postType',
            },
            resolve: doc => {
              const postLocation =
                doc?.slug && doc?.categorySlug
                  ? {
                      title: doc.title || 'Untitled',
                      href: resolveHref('post', doc.slug, doc.categorySlug)!,
                    }
                  : null

              const postTypeLocation = doc?.postType
                ? {
                    title: `${doc.postType.charAt(0).toUpperCase() + doc.postType.slice(1)}s`,
                    href: resolveHref(`${doc.postType}s` as any)!,
                  }
                : null

              return {
                locations: [postLocation, postTypeLocation].filter(Boolean) as DocumentLocation[],
              }
            },
          }),
          category: defineLocations({
            select: {
              name: 'name',
              slug: 'slug.current',
            },
            resolve: doc => ({
              locations: [
                {
                  title: doc?.name || 'Untitled Category',
                  href: resolveHref('category', doc?.slug)!,
                },
              ],
            }),
          }),
          topic: defineLocations({
            select: {
              name: 'name',
              slug: 'slug.current',
            },
            resolve: doc => ({
              locations: [
                {
                  title: doc?.name || 'Untitled Topic',
                  href: resolveHref('topic', doc?.slug)!,
                },
              ],
            }),
          }),
          service: defineLocations({
            select: {
              name: 'name',
              slug: 'slug.current',
            },
            resolve: doc => ({
              locations: [
                {
                  title: doc?.name || 'Untitled',
                  href: resolveHref('service', doc?.slug)!,
                },
                servicesLocation,
              ].filter(Boolean) as DocumentLocation[],
            }),
          }),
          serviceType: defineLocations({
            locations: [servicesLocation],
            message: 'This service type is used to categorize services',
            tone: 'positive',
          }),
          person: defineLocations({
            locations: [homeLocation],
            message: 'This person may be referenced throughout the site',
            tone: 'positive',
          }),
          tag: defineLocations({
            locations: [homeLocation],
            message: 'This tag may be used throughout the site',
            tone: 'positive',
          }),
        },
      },
    }),
    structureTool({
      structure, // Custom studio structure configuration, imported from ./src/structure.ts
    }),
    // Additional plugins for enhanced functionality
    unsplashImageAsset(),
    assist(),
    visionTool(),
  ],

  // Schema configuration, imported from ./src/schemaTypes/index.ts
  schema: {
    types: schemaTypes,
  },
})
