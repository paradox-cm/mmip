'use client'

import { useActionState, useState } from 'react'
import { LuEye, LuEyeOff } from 'react-icons/lu'

import { Button } from '@/app/components/ui/button'
import { Field } from '@/app/components/ui/field'
import { Input } from '@/app/components/ui/input'

import { loginAction, type LoginState } from './actions'

export default function LoginForm({ from }: { from: string }) {
  const [state, action, pending] = useActionState<LoginState, FormData>(loginAction, null)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <form action={action} className="flex flex-col gap-4">
      <input type="hidden" name="from" value={from} />
      <Field label="Username" required>
        <Input
          name="username"
          type="text"
          autoComplete="username"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          className="h-11 min-h-11"
        />
      </Field>
      <Field label="Password" required>
        {controlProps => (
          <div className="relative">
            <Input
              {...controlProps}
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              className="h-11 min-h-11 pr-12"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 z-10 flex items-center px-3 text-foreground-muted outline-none hover:text-foreground focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring-focus"
              aria-pressed={showPassword}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword(visible => !visible)}
            >
              {showPassword ? (
                <LuEyeOff className="size-4" aria-hidden="true" />
              ) : (
                <LuEye className="size-4" aria-hidden="true" />
              )}
            </button>
          </div>
        )}
      </Field>
      <label className="flex min-h-11 cursor-pointer items-start gap-3">
        <input
          name="remember"
          type="checkbox"
          value="1"
          className="mt-1 size-5 shrink-0 rounded border-2 border-strong accent-primary"
        />
        <span className="text-sm text-foreground-subtle">
          <span className="font-medium text-foreground">Remember me</span>
          <span className="mt-0.5 block text-label text-foreground-muted">
            Stay signed in on this device for 30 days.
          </span>
        </span>
      </label>
      {state?.error ? (
        <p role="alert" className="text-label font-medium text-destructive-strong">
          {state.error}
        </p>
      ) : null}
      <Button type="submit" className="min-h-11" loading={pending}>
        Sign in
      </Button>
    </form>
  )
}
