import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { toPlainText, VisualEditing } from 'next-sanity'

import { AppearanceProvider } from '@/app/components/global/appearance/appearance-provider'
import { AppearanceToaster } from '@/app/components/global/appearance/appearance-toaster'
import {
  APPEARANCE_THEME_COLORS,
  appearanceBootScript,
} from '@/app/components/global/appearance/config'
import Footer from '@/app/components/global/footer'
import Header from '@/app/components/global/header'
import DraftModeToast from '@/app/components/shared/draft-mode-toast'
import { SITE_NAME } from '@/lib/constants'
import { handleError } from '@/lib/handle-error'
import { cn } from '@/lib/utils'
import * as demo from '@/sanity/lib/demo'
import { fetchSettings } from '@/sanity/lib/fetch'
import { SanityLive } from '@/sanity/lib/live'
import { resolveOpenGraphImage } from '@/sanity/lib/utils'

import { HelveticaNowFont, RealHeadFont } from './fonts'

import './globals.css'
import { SpeedInsights } from '@vercel/speed-insights/next'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchSettings()

  const title = settings?.title || demo.title
  const description = settings?.description || demo.description

  const ogImage = resolveOpenGraphImage(settings?.ogImage)

  let metadataBase: URL | undefined = undefined
  try {
    metadataBase = settings?.ogImage?.metadataBase
      ? new URL(settings.ogImage.metadataBase)
      : undefined
  } catch {
    // ignore invalid URL
  }

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
    manifest: `/manifest.webmanifest`,
    openGraph: {
      title: title,
      description: toPlainText(description),
      url: '/',
      siteName: SITE_NAME,
      images: ogImage ? [ogImage] : [],
      locale: 'en_US',
      type: 'website',
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
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png',
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
      <body>
        <AppearanceProvider>
          <section className="min-h-screen pt-20">
            {/* The toaster follows the resolved appearance so draft-mode
                notices do not flash a light panel on a dark page. */}
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
            <Header />
            <main className="">{children}</main>
            <Footer />
          </section>
          {/* Command palette stays unwired; /search is the supported entry point. */}
          <SpeedInsights />
        </AppearanceProvider>
      </body>
    </html>
  )
}
