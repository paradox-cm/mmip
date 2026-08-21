'use client'

import { useEffect, useState } from 'react'
import { LuMenu } from 'react-icons/lu'

import { usePathname } from 'next/navigation'

import AppearanceToggle from '@/app/components/global/appearance/appearance-toggle'
import ResolvedLink from '@/app/components/shared/resolved-link'
import { Button } from '@/app/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/app/components/ui/sheet'

import { filterPrimaryNav, type PrimaryNav } from './nav-items'

const LINK_CLASSES =
  'block rounded-lg px-3 py-2 text-body text-foreground outline-none transition-colors duration-fast ease-standard hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background'

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
      <SheetContent side="right" aria-describedby={undefined}>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        {items.length > 0 && (
          <nav
            aria-label="Primary"
            className="flex flex-col gap-6 overflow-y-auto"
            // ResolvedLink renders a plain fragment for unresolvable links, so
            // delegation is safer here than wrapping each item in SheetClose.
            onClick={() => setOpen(false)}
          >
            {items.map((item, index) =>
              item.type === 'dropdown' && item.dropdownItems ? (
                <div key={item._key ?? index} className="flex flex-col gap-1">
                  <p className="px-3 text-label font-medium uppercase tracking-wide text-foreground-muted">
                    {item.dropdownLabel}
                  </p>
                  <ul className="flex flex-col">
                    {item.dropdownItems.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <ResolvedLink link={link} className={LINK_CLASSES}>
                          {link.label}
                        </ResolvedLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                item.link && (
                  <ResolvedLink key={item._key ?? index} link={item.link} className={LINK_CLASSES}>
                    {item.link.label}
                  </ResolvedLink>
                )
              ),
            )}
          </nav>
        )}

        <div className="mt-auto flex items-center justify-between border-t pt-6">
          <span className="text-label text-foreground-muted">Appearance</span>
          <AppearanceToggle />
        </div>
      </SheetContent>
    </Sheet>
  )
}
