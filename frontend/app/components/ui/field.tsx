'use client'

import * as React from 'react'

import { Label } from '@/app/components/ui/label'
import { cn } from '@/lib/utils'

export type FieldControlProps = {
  id?: string
  'aria-describedby'?: string
  'aria-invalid'?: boolean
  required?: boolean
}

type FieldProps = {
  label: React.ReactNode
  /**
   * A single control element, which gets the wiring props cloned onto it, or a
   * render function for controls that nest their focusable element (Select).
   */
  children: React.ReactElement<FieldControlProps> | ((props: FieldControlProps) => React.ReactNode)
  /** Renders the label for assistive tech only. */
  labelHidden?: boolean
  hint?: React.ReactNode
  error?: React.ReactNode
  required?: boolean
  id?: string
  className?: string
}

/**
 * Wires a single control to its label, hint and error without pulling in a
 * form library: it owns the ids and hands them to the control.
 */
export function Field({
  label,
  children,
  labelHidden = false,
  hint,
  error,
  required,
  id,
  className,
}: FieldProps) {
  const generatedId = React.useId()
  const fieldId = id ?? `field-${generatedId}`
  const hintId = hint ? `${fieldId}-hint` : undefined
  const errorId = error ? `${fieldId}-error` : undefined

  const controlProps: FieldControlProps = {
    id: fieldId,
    'aria-describedby': [hintId, errorId].filter(Boolean).join(' ') || undefined,
    'aria-invalid': error ? true : undefined,
    required,
  }

  const control =
    typeof children === 'function'
      ? children(controlProps)
      : React.cloneElement(children, {
          ...controlProps,
          'aria-describedby':
            controlProps['aria-describedby'] ?? children.props['aria-describedby'],
          'aria-invalid': controlProps['aria-invalid'] ?? children.props['aria-invalid'],
          required: controlProps.required ?? children.props.required,
        })

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <Label htmlFor={fieldId} required={required} className={cn(labelHidden && 'sr-only')}>
        {label}
      </Label>
      {control}
      {hint && (
        <p id={hintId} className="text-label text-foreground-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="text-label font-medium text-destructive-strong">
          {error}
        </p>
      )}
    </div>
  )
}
