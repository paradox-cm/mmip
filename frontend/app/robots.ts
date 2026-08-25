import type { MetadataRoute } from 'next'

import { BASE_URL } from '@/lib/constants'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin'],
    },
    sitemap: `${BASE_URL || 'http://localhost:3000'}/sitemap.xml`,
    host: BASE_URL || 'http://localhost:3000',
  }
}
