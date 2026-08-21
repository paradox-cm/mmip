import * as React from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import { Spinner } from '@/app/components/ui/spinner'
import { cn } from '@/lib/utils'

import { Slot } from '@radix-ui/react-slot'

const buttonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg text-button font-medium outline-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
    'transition-[color,background-color,border-color,box-shadow,transform] duration-fast ease-standard',
    // Press is a scale plus a token remap — no ripple, no state layer.
    'active:scale-[0.98] motion-reduce:active:scale-100',
    'focus-visible:ring-2 focus-visible:ring-ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-ring-error',
    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
    'aria-busy:cursor-progress',
  ],
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary-hover active:bg-secondary-active',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive-hover active:bg-destructive',
        // border-strong, not border: an outline button's edge is what
        // identifies the control, so it needs 3:1 against the background.
        outline:
          'border border-strong bg-background hover:bg-accent hover:text-foreground active:bg-accent-active',
        ghost: 'hover:bg-accent hover:text-foreground active:bg-accent-active',
        link: 'text-link underline-offset-4 hover:text-link-hover hover:underline active:scale-100',
      },
      size: {
        default: 'h-10 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 gap-1.5 rounded-md px-3 text-label has-[>svg]:px-2.5',
        lg: 'h-12 rounded-lg px-6 has-[>svg]:px-4',
        icon: 'size-10',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    /** Shows a spinner, marks the button busy and blocks interaction. */
    loading?: boolean
  }

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'

  // Slot forwards to a single child, so the spinner is only ours to render.
  const content = asChild ? (
    children
  ) : (
    <>
      {loading && <Spinner className="size-4 text-current" aria-hidden="true" />}
      {children}
    </>
  )

  return (
    <Comp
      data-slot="button"
      data-loading={loading || undefined}
      aria-busy={loading || undefined}
      disabled={asChild ? undefined : disabled || loading}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {content}
    </Comp>
  )
}

export { Button, buttonVariants }
