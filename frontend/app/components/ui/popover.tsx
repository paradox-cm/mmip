'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

import * as PopoverPrimitive from '@radix-ui/react-popover'

function Popover({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

function PopoverTrigger({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

function PopoverContent({
  className,
  align = 'center',
  side = 'bottom',
  sideOffset = 6,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        side={side}
        sideOffset={sideOffset}
        className={cn(
          // Radix Dialog sets `pointer-events: none` on <body> while a Sheet/modal is
          // open and only restores it on the Dialog's own content. Since this Portal
          // renders as a body-level sibling (e.g. when nested inside the mobile nav
          // Sheet), it would otherwise inherit that `none` and be unclickable.
          'pointer-events-auto z-50 min-w-[var(--radix-popover-trigger-width)] origin-[var(--radix-popover-content-transform-origin)] rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none',
          'data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          'duration-fast ease-standard',
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}

export { Popover, PopoverContent, PopoverTrigger }
