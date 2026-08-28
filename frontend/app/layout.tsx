import type { Metadata, Viewport } from 'next'
import { draftMode } from 'next/headers'
import { toPlainText, VisualEditing } from 'next-sanity'

import { AppearanceProvider } from '@/app/components/global/appearance/appearance-provider'
import { AppearanceToaster } from '@/app/components/global/appearance/appearance-toaster'
import {
  APPEARANCE_THEME_COLORS,
  appearanceBootScript,
} from '@/app/components/global/appearance/config'
import DraftModeToast from '@/app/components/shared/draft-mode-toast'
import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/constants'
import { handleError } from '@/lib/handle-error'
import { DEFAULT_SOCIAL_IMAGES, resolveMetadataBase } from '@/lib/social-image'
import { cn } from '@/lib/utils'
import { fetchSettings } from '@/sanity/lib/fetch'
import { SanityLive } from '@/sanity/lib/live'

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

export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchSettings()

  const title = settings?.title || SITE_NAME
  const description = settings?.description ? toPlainText(settings.description) : SITE_DESCRIPTION
  const metadataBase = resolveMetadataBase(settings?.ogImage?.metadataBase)

  return {
    metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description,
    authors: [{ name: SITE_NAME }],
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
      description,
      url: '/',
      siteName: SITE_NAME,
      images: DEFAULT_SOCIAL_IMAGES,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: DEFAULT_SOCIAL_IMAGES,
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
        <meta name="theme-color" content={APPEARANCE_THEME_COLORS.light} />
        <script dangerouslySetInnerHTML={{ __html: appearanceBootScript }} />
      </head>
      <body id="top">
        <AppearanceProvider>
          <AppearanceToaster />
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
          <SpeedInsights />
        </AppearanceProvider>
      </body>
    </html>
  )
}
