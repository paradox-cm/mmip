import type { MetadataRoute } from 'next'

import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/constants'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: 'RrMMIP',
    description: SITE_DESCRIPTION,
    lang: 'en',
    start_url: '/',
    display: 'standalone',
    background_color: '#FCF8F3',
    theme_color: '#FCF8F3',
    icons: [
      {
        src: '/logo/logo-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logo/logo-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/logo/logo-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
