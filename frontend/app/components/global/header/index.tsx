import { LuEyeOff } from 'react-icons/lu'
import { PiMagnifyingGlassBold } from 'react-icons/pi'

import Image from 'next/image'
import Link from 'next/link'

import AppearanceToggle from '@/app/components/global/appearance/appearance-toggle'
import { Button } from '@/app/components/ui/button'
import LogoMark from '@/public/logo-mark.svg'
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
        <div className="flex items-center justify-between gap-5">
          <Link
            className="flex flex-1 items-center gap-3 rounded-lg outline-none transition-opacity duration-fast ease-standard hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            href="/"
            aria-label="Resilient Relatives Home"
          >
            <Image src={LogoMark} alt="Resilient Relatives logo" className="size-12" />
            <span className="text-body font-medium leading-none">
              Resilient
              <br />
              Relatives
            </span>
          </Link>

          <div className="hidden lg:block">
            <Navigation primaryNav={primaryNav} />
          </div>

          <div className="flex flex-1 items-center justify-end gap-2">
            <AppearanceToggle className="hidden sm:inline-flex" />
            <Button asChild variant="outline" size="icon" className="size-[50px]">
              <Link href="/api/escape" aria-label="Hide website quickly">
                <LuEyeOff className="size-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="icon" className="size-[50px]">
              <Link href="/search" aria-label="Search">
                <PiMagnifyingGlassBold className="size-5" />
              </Link>
            </Button>
            <MobileNav primaryNav={primaryNav} className="size-[50px] lg:hidden" />
          </div>
        </div>
      </div>
    </header>
  )
}
