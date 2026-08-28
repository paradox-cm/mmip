import { LuEyeOff, LuLifeBuoy } from 'react-icons/lu'
import { PiMagnifyingGlassBold } from 'react-icons/pi'

import Link from 'next/link'

import AppearanceToggle from '@/app/components/global/appearance/appearance-toggle'
import LogoMark from '@/app/components/shared/logo-mark'
import { Button } from '@/app/components/ui/button'
import { fetchNavigation } from '@/sanity/lib/fetch'

import MobileNav from './mobile-nav'
import Navigation from './navigation'

export default async function Header() {
  // Fetched once here and handed to both the desktop menu and the mobile sheet
  // so they always render the same Sanity nav.
  const data = await fetchNavigation()
  const primaryNav = data?.primaryNav

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-20 items-center border-b bg-background">
      <div className="container">
        <div className="flex items-center justify-between gap-3 md:gap-5">
          <Link
            className="group flex min-w-0 flex-1 items-center gap-3 rounded-lg outline-none transition-opacity duration-fast ease-standard hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            href="/"
            aria-label="Resilient Relatives Home"
          >
            <LogoMark className="size-10 shrink-0 transition-transform duration-fast ease-standard motion-reduce:transform-none max-lg:group-active:scale-110 sm:size-12 lg:group-hover:scale-110" />
            {/* One step smaller below sm so the wordmark clears the four-button
                cluster (Get Help included) on 360px-wide phones. */}
            <span className="min-w-0 text-sm font-medium leading-none text-foreground-heading sm:text-body">
              Resilient
              <br />
              Relatives
            </span>
          </Link>

          <div className="hidden lg:block">
            <Navigation primaryNav={primaryNav} />
          </div>

          <div className="flex min-w-0 flex-1 items-center justify-end gap-2">
            {/* The crisis CTA stays in the chrome at every width: a labeled
                button from sm up, a compact icon button on phones. */}
            <Button asChild variant="help" className="hidden h-[50px] px-5 sm:inline-flex">
              <Link href="/get-help">
                <LuLifeBuoy aria-hidden="true" className="size-5" />
                Get Help
              </Link>
            </Button>
            <Button asChild variant="help" size="icon" className="size-11 sm:hidden">
              <Link href="/get-help" aria-label="Get Help">
                <LuLifeBuoy className="size-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="icon"
              className="size-11 sm:size-[50px]"
            >
              <Link href="/api/escape" aria-label="Hide website quickly">
                <LuEyeOff className="size-5" />
              </Link>
            </Button>
            <AppearanceToggle className="hidden size-[50px] sm:inline-flex" />
            <Button
              asChild
              variant="outline"
              size="icon"
              className="size-11 sm:size-[50px]"
            >
              <Link href="/search" aria-label="Search">
                <PiMagnifyingGlassBold className="size-5" />
              </Link>
            </Button>
            <MobileNav primaryNav={primaryNav} className="size-11 sm:size-[50px] lg:hidden" />
          </div>
        </div>
      </div>
    </header>
  )
}
