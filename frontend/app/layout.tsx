import type { Metadata, Viewport } from 'next'
import { draftMode } from 'next/headers'
import { toPlainText, VisualEditing } from 'next-sanity'
import { Toaster } from 'sonner'

import { AppearanceProvider } from '@/app/components/global/appearance/appearance-provider'
import { appearanceBootScript } from '@/app/components/global/appearance/config'
import DraftModeToast from '@/app/components/shared/draft-mode-toast'
import { BASE_URL, SITE_NAME } from '@/lib/constants'
import { handleError } from '@/lib/handle-error'
import { resolveSocialImage } from '@/lib/social-image'
import { cn } from '@/lib/utils'
import * as demo from '@/sanity/lib/demo'
import { fetchSettings } from '@/sanity/lib/fetch'
import { SanityLive } from '@/sanity/lib/live'
import { resolveOpenGraphImage } from '@/sanity/lib/utils'

import { HelveticaNowFont, RealHeadFont } from './fonts'

import './globals.css'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FCF8F3' },
    { media: '(prefers-color-scheme: dark)', color: '#26231F' },
  ],
  width: 'device-width',
  initialScale: 1,
}

function resolveMetadataBase(value: string | undefined) {
  for (const candidate of [value, BASE_URL]) {
    if (!candidate) continue

    try {
      return new URL(candidate)
    } catch {
      // Try the next known base URL.
    }
  }

  return undefined
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchSettings()

  const title = settings?.title || demo.title
  const description = settings?.description || demo.description

  const ogImage = resolveOpenGraphImage(settings?.ogImage)

  const metadataBase = resolveMetadataBase(settings?.ogImage?.metadataBase)
  const socialImage = resolveSocialImage(ogImage)

  return {
    metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: toPlainText(description),
    keywords: ['default', 'keywords'],
    authors: [{ name: 'Default Author' }],
    generator: 'Next.js',
    applicationName: SITE_NAME,
    publisher: SITE_NAME,
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: SITE_NAME,
    },
    manifest: `/manifest.webmanifest`,
    openGraph: {
      title: title,
      description: toPlainText(description),
      url: '/',
      siteName: SITE_NAME,
      images: [socialImage],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: toPlainText(description),
      images: [socialImage.url],
    },
    alternates: {
      canonical: '/',
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
    },
    icons: {
      icon: '/logo/logo.svg',
      shortcut: '/logo/logo.svg',
      apple: '/logo/apple-touch-icon.png',
    },
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled: isDraftMode } = await draftMode()

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        'bg-background text-foreground',
        HelveticaNowFont.variable,
        RealHeadFont.variable,
      )}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: appearanceBootScript }} />
      </head>
      <body id="top">
        <AppearanceProvider>
          {/* The <Toaster> component is responsible for rendering toast notifications used in /app/client-utils.ts and /app/components/DraftModeToast.tsx */}
          <Toaster />
          {isDraftMode && (
            <>
              <DraftModeToast />
              {/*  Enable Visual Editing, only to be rendered when Draft Mode is enabled */}
              <VisualEditing />
            </>
          )}
          {/* The <SanityLive> component is responsible for making all sanityFetch calls in your application live, so should always be rendered. */}
          <SanityLive onError={handleError} />
          {children}
          {/* Command palette stays unwired; /search is the supported entry point. */}
          <SpeedInsights />
        </AppearanceProvider>
      </body>
    </html>
  )
}
