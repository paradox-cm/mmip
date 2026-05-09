import * as React from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

import { Slot } from '@radix-ui/react-slot'

export const badgeVariants = cva(
  'focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-md border px-2 py-0.5 text-xs font-medium transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring [&>svg]:pointer-events-none [&>svg]:size-3',
  {
    variants: {
      variant: {
        default: '[a&]:hover:bg-primary/90 border-transparent bg-primary text-primary-foreground',
        secondary: '[a&]:hover:bg-secondary/90 bg-surface text-foreground-subtle',
        destructive:
          '[a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 border-transparent bg-destructive text-white',
        outline: 'text-foreground-subtle [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
        // Post type variants
        article: 'border-twilight-500 bg-twilight-500 text-twilight-900',
        guide: 'border-terracota-500 bg-terracota-500 text-terracota-900',
        tool: 'border-sage-500 bg-sage-500 text-sage-900',
        service: 'border-gold-500 bg-gold-500 text-gold-900',
        tribe: 'border-sand-500 bg-sand-500 text-sand-900',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

type BadgeProps = React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }

export function Badge({ className, variant, asChild = false, ...props }: BadgeProps) {
  const Comp = asChild ? Slot : 'span'
  return <Comp className={cn(badgeVariants({ variant }), className)} {...props} />
}
