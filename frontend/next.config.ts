import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  env: {
    // Matches the behavior of `sanity dev` which sets styled-components to use the fastest way of inserting CSS rules in both dev and production. It's default behavior is to disable it in dev mode.
    SC_DISABLE_SPEEDY: 'false',
  },
  images: {
    remotePatterns: [{ hostname: 'cdn.sanity.io' }, { hostname: 'source.unsplash.com' }],
    dangerouslyAllowSVG: true,
  },
  trailingSlash: false,
  async rewrites() {
    return [
      {
        source: '/og.png',
        destination: '/opengraph-image',
      },
    ]
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // {
          //   key: 'X-Frame-Options',
          //   value: 'DENY',
          // },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          // You can add Content-Security-Policy here for the whole app if you want
          // {
          //   key: 'Content-Security-Policy',
          //   value:
          //     "default-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com; " +
          //     "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com; " +
          //     "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
          //     "img-src 'self' data: https://cdn.sanity.io; " +
          //     "frame-ancestors 'none';",
          // },
        ],
      },
      // {
      //   source: '/sw.js',
      //   headers: [
      //     {
      //       key: 'Content-Type',
      //       value: 'application/javascript; charset=utf-8',
      //     },
      //     {
      //       key: 'Cache-Control',
      //       value: 'no-cache', // keep some caching but allow updates
      //     },
      //     {
      //       key: 'Content-Security-Policy',
      //       value:
      //         "default-src 'self'; script-src 'self'; style-src 'self'; font-src 'self'; img-src 'self' data:;",
      //     },
      //   ],
      // },
    ]
  },
}

export default nextConfig
