import ResolvedLink from '@/app/components/shared/resolved-link'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/app/components/ui/navigation-menu'

import NavLinkLabel from './nav-link-label'
import { filterPrimaryNav, type PrimaryNav } from './nav-items'

export default function Navigation({ primaryNav }: { primaryNav: PrimaryNav | null | undefined }) {
  const items = filterPrimaryNav(primaryNav)

  if (items.length === 0) {
    return null
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {items.map(({ dropdownLabel, link, type, dropdownItems }, i) => (
          <NavigationMenuItem key={i}>
            {type === 'dropdown' && dropdownItems ? (
              <>
                <NavigationMenuTrigger>{dropdownLabel}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[360px] gap-1 p-1">
                    {dropdownItems.map((item, idx) => (
                      <li key={idx}>
                        <NavigationMenuLink asChild className="flex-row items-center">
                          <ResolvedLink link={item}>
                            <NavLinkLabel link={item} />
                          </ResolvedLink>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              link && (
                <NavigationMenuLink asChild className="flex-row items-center">
                  <ResolvedLink link={link}>
                    <NavLinkLabel link={link} />
                  </ResolvedLink>
                </NavigationMenuLink>
              )
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
