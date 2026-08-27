import { getExtension, getImageDimensions } from '@sanity/asset-utils'
import { defineType, defineField } from 'sanity'
import { EarthGlobeIcon } from '@sanity/icons'

export const metadata = defineType({
  name: 'metadata',
  title: 'Metadata',
  type: 'object',
  icon: EarthGlobeIcon,
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Used in the HTML <title> tag and search engine listings',
      validation: Rule => Rule.max(60).warning('Try to keep under 60 characters'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 2,
      description: 'Used in search engine results and social shares',
      validation: Rule => Rule.max(160).warning('Try to keep under 160 characters'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description:
        'Not used for sharing. Social previews use the generated site brand card from the design system.',
      options: {
        hotspot: true,
      },
      validation: rule =>
        rule.custom(value => {
          if (!value?.asset?._ref) {
            return true
          }

          const filetype = getExtension(value.asset._ref)

          if (filetype !== 'jpg' && filetype !== 'png') {
            return 'Image must be a JPG or PNG'
          }

          const { width, height } = getImageDimensions(value.asset._ref)

          if (width < 1200 || height < 630) {
            return 'Image must be at least 1200x630 pixels'
          }

          return true
        }),
    }),
    defineField({
      name: 'hideSearchIndex',
      title: 'Do not index',
      description: `Hide this page from search engines and the sitemap`,
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
