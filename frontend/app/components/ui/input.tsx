import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'peer h-9 w-full min-w-0 rounded-lg border-2 border-input bg-input px-3 py-1 text-body-small text-foreground outline-none placeholder:text-foreground-muted/80 selection:bg-primary selection:text-primary-foreground md:text-label',
        'transition-[color,background-color,border-color,box-shadow] duration-fast ease-standard',
        'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-label file:font-medium file:text-foreground',
        'hover:border-strong',
        'focus-visible:border-ring-focus focus-visible:ring-0 focus-visible:ring-offset-0',
        'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-input',
        'aria-invalid:border-destructive',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
