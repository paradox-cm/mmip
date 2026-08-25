'use client'

import { useState } from 'react'

import HeroSearch from '@/app/components/shared/hero-search'
import { Button } from '@/app/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/app/components/ui/command'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/components/ui/dialog'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/app/components/ui/navigation-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select'

import Preview from './preview'

export function SelectDemo() {
  return (
    <Preview label="Select">
      <div className="flex max-w-sm flex-col gap-2">
        <p id="region-label" className="text-sm font-medium">
          Region
        </p>
        <Select>
          <SelectTrigger className="w-full" aria-labelledby="region-label">
            <SelectValue placeholder="Choose a region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="north">Northern CA</SelectItem>
            <SelectItem value="central">Central CA</SelectItem>
            <SelectItem value="south">Southern CA</SelectItem>
            <SelectItem value="statewide">Statewide</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </Preview>
  )
}

export function DialogDemo() {
  return (
    <Preview label="Dialog">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Open dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share this resource</DialogTitle>
            <DialogDescription>
              Dialogs keep the close control inside the content so keyboard focus stays trapped
              correctly.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button>Confirm</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Preview>
  )
}

export function CommandDemo() {
  const [value, setValue] = useState('')

  return (
    <Preview label="Command">
      <Command className="rounded-xl border" shouldFilter>
        <CommandInput
          id="command-demo"
          placeholder="Filter commands…"
          value={value}
          onValueChange={setValue}
        />
        <CommandList>
          <CommandEmpty>No results.</CommandEmpty>
          <CommandGroup heading="Pages">
            <CommandItem value="search">Search</CommandItem>
            <CommandItem value="tribes">Tribes</CommandItem>
            <CommandItem value="services">Services</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </Preview>
  )
}

export function NavigationMenuDemo() {
  return (
    <Preview label="Navigation menu">
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="#button">Button</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#badge">Badge</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#input">Input</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </Preview>
  )
}

export function HeroSearchDemo() {
  return <HeroSearch onSearch={() => {}} />
}
