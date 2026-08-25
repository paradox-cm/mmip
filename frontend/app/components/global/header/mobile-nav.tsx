'use client'

import { Fragment, useEffect, useState } from 'react'
import { LuMenu, LuX } from 'react-icons/lu'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import AppearanceToggle from '@/app/components/global/appearance/appearance-toggle'
import LogoMark from '@/app/components/shared/logo-mark'
import ResolvedLink from '@/app/components/shared/resolved-link'
import { Button } from '@/app/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/app/components/ui/sheet'

import NavLinkLabel from './nav-link-label'
import { filterPrimaryNav, matchesNavLabel, navItemLabel, type PrimaryNav } from './nav-items'

const LINK_CLASSES =
  'flex min-h-14 items-center rounded-lg px-4 py-3 text-body text-foreground outline-none touch-manipulation transition-colors duration-fast ease-standard hover:bg-accent active:bg-accent-active focus-visible:ring-2 focus-visible:ring-ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background'

const CLOSE_CLASSES =
  'inline-flex size-11 shrink-0 items-center justify-center rounded-lg border bg-background text-foreground outline-none transition-[background-color,box-shadow,transform] duration-fast ease-standard hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-95 motion-reduce:active:scale-100'

export default function MobileNav({
  primaryNav,
  className,
}: {
  primaryNav: PrimaryNav | null | undefined
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const items = filterPrimaryNav(primaryNav)

  // Close once a navigation actually lands.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className={className} aria-label="Open menu">
          <LuMenu className="size-5" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        showCloseButton={false}
        aria-describedby={undefined}
        className="max-w-none gap-6 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))] sm:max-w-sm sm:p-6"
      >
        <SheetHeader>
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/"
              aria-label="Resilient Relatives Home"
              className="flex items-center gap-3 rounded-lg outline-none transition-opacity duration-fast ease-standard hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              onClick={() => setOpen(false)}
            >
              <LogoMark className="size-12" />
              <span className="text-body font-medium leading-none">
                Resilient
                <br />
                Relatives
              </span>
            </Link>
            <SheetClose className={CLOSE_CLASSES}>
              <LuX className="size-5" aria-hidden="true" />
              <span className="sr-only">Close menu</span>
            </SheetClose>
          </div>
        </SheetHeader>

        {items.length > 0 && (
          <nav
            aria-label="Primary"
            className="flex flex-col overflow-y-auto"
            // ResolvedLink renders a plain fragment for unresolvable links, so
            // delegation is safer here than wrapping each item in SheetClose.
            onClick={() => setOpen(false)}
          >
            {items.map((item, index) => {
              const label = navItemLabel(item)
              const dividerBefore = matchesNavLabel(label, 'about')
              const dividerAfter = matchesNavLabel(label, 'home')

              return (
                <Fragment key={item._key ?? index}>
                  {dividerBefore && <hr className="my-3 border-border" />}
                  {item.type === 'dropdown' && item.dropdownItems ? (
                    <div className="flex flex-col">
                      <p className="px-4 pb-1 pt-2 text-label font-medium uppercase tracking-wide text-foreground-muted">
                        {item.dropdownLabel}
                      </p>
                      <ul className="flex flex-col">
                        {item.dropdownItems.map((link, linkIndex) => (
                          <li key={linkIndex}>
                            <ResolvedLink link={link} className={LINK_CLASSES}>
                              <NavLinkLabel link={link} iconClassName="size-6" />
                            </ResolvedLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    item.link && (
                      <ResolvedLink link={item.link} className={LINK_CLASSES}>
                        <NavLinkLabel link={item.link} iconClassName="size-6" />
                      </ResolvedLink>
                    )
                  )}
                  {dividerAfter && <hr className="my-3 border-border" />}
                </Fragment>
              )
            })}
          </nav>
        )}

        <div className="mt-auto flex min-h-12 items-center justify-between border-t pt-6">
          <span className="text-label text-foreground-muted">Appearance</span>
          <AppearanceToggle className="size-11" />
        </div>
      </SheetContent>
    </Sheet>
  )
}
