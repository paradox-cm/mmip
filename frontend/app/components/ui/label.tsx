import * as React from 'react'

import { cn } from '@/lib/utils'

function Label({
  className,
  required,
  children,
  ...props
}: React.ComponentProps<'label'> & { required?: boolean }) {
  return (
    <label
      data-slot="label"
      className={cn(
        'inline-flex items-center gap-1 text-label font-medium text-foreground-subtle',
        'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        className,
      )}
      {...props}
    >
      {children}
      {required && (
        <>
          <span aria-hidden="true" className="text-destructive-strong">
            *
          </span>
          <span className="sr-only">(required)</span>
        </>
      )}
    </label>
  )
}

export { Label }
