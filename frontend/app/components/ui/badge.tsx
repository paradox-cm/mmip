import * as React from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

import { Slot } from '@radix-ui/react-slot'

/**
 * Post-type badges carry their own foreground so call sites never have to
 * patch contrast. `solid` fills at the 600 step (white ink clears AA on every
 * scale); `soft` is the tinted companion used for secondary metadata.
 */
export const badgeVariants = cva(
  [
    'inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-md border px-2 py-0.5 text-caption font-medium',
    'transition-[color,background-color,border-color,box-shadow] duration-fast ease-standard',
    'focus-visible:ring-2 focus-visible:ring-ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-ring-error',
    '[&>svg]:pointer-events-none [&>svg]:size-3',
  ],
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary-hover',
        secondary: 'border-transparent bg-surface text-foreground-subtle [a&]:hover:bg-surface-hover',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive-hover',
        outline: 'text-foreground-subtle [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
        // Post type variants — styling comes from the compound variants below.
        article: '',
        guide: '',
        tool: '',
        service: '',
        tribe: '',
      },
      appearance: {
        solid: '',
        soft: '',
      },
    },
    compoundVariants: [
      {
        variant: 'article',
        appearance: 'solid',
        class: 'border-transparent bg-twilight-600 text-white [a&]:hover:bg-twilight-700',
      },
      {
        variant: 'article',
        appearance: 'soft',
        class:
          'border-twilight-200 bg-twilight-100 text-twilight-900 dark:border-twilight-700 dark:bg-twilight-900 dark:text-twilight-100',
      },
      {
        variant: 'guide',
        appearance: 'solid',
        class: 'border-transparent bg-terracota-600 text-white [a&]:hover:bg-terracota-700',
      },
      {
        variant: 'guide',
        appearance: 'soft',
        class:
          'border-terracota-200 bg-terracota-100 text-terracota-900 dark:border-terracota-700 dark:bg-terracota-900 dark:text-terracota-100',
      },
      {
        variant: 'tool',
        appearance: 'solid',
        class: 'border-transparent bg-sage-600 text-white [a&]:hover:bg-sage-700',
      },
      {
        variant: 'tool',
        appearance: 'soft',
        class:
          'border-sage-200 bg-sage-100 text-sage-900 dark:border-sage-700 dark:bg-sage-900 dark:text-sage-100',
      },
      {
        variant: 'service',
        appearance: 'solid',
        class: 'border-transparent bg-gold-600 text-white [a&]:hover:bg-gold-700',
      },
      {
        variant: 'service',
        appearance: 'soft',
        class:
          'border-gold-200 bg-gold-100 text-gold-900 dark:border-gold-700 dark:bg-gold-900 dark:text-gold-100',
      },
      {
        variant: 'tribe',
        appearance: 'solid',
        class: 'border-transparent bg-sand-600 text-white [a&]:hover:bg-sand-700',
      },
      {
        variant: 'tribe',
        appearance: 'soft',
        class:
          'border-sand-300 bg-sand-100 text-sand-900 dark:border-sand-700 dark:bg-sand-900 dark:text-sand-100',
      },
    ],
    defaultVariants: {
      variant: 'default',
      appearance: 'solid',
    },
  },
)

type BadgeProps = React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }

export function Badge({ className, variant, appearance, asChild = false, ...props }: BadgeProps) {
  const Comp = asChild ? Slot : 'span'
  return <Comp className={cn(badgeVariants({ variant, appearance }), className)} {...props} />
}
