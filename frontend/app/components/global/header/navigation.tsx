import ResolvedLink from '@/app/components/shared/resolved-link'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/app/components/ui/navigation-menu'

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
                  <ul className="grid w-[330px] gap-4">
                    {dropdownItems.map((link, idx) => (
                      <li key={idx}>
                        <NavigationMenuLink asChild>
                          <ResolvedLink link={link}>
                            <div className="font-medium">{link.label}</div>
                          </ResolvedLink>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              link && (
                <NavigationMenuLink asChild>
                  <ResolvedLink link={link}>{link?.label}</ResolvedLink>
                </NavigationMenuLink>
              )
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
