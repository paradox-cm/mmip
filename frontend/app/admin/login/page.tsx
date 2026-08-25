import Link from 'next/link'

import LogoMark from '@/app/components/shared/logo-mark'
import SkipLink from '@/app/components/shared/skip-link'
import { Button } from '@/app/components/ui/button'
import { getAdminCredentials, safeAdminReturnPath } from '@/lib/admin-session'

import LoginForm from './login-form'

export const dynamic = 'force-dynamic'

export const metadata = { title: 'Sign in' }

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string | string[] }>
}) {
  const params = await searchParams
  const from = safeAdminReturnPath(params.from)
  const { configured } = getAdminCredentials()

  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <SkipLink href="#admin-login">Skip to sign in</SkipLink>
      <header className="border-b bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between gap-4 px-4 lg:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <LogoMark className="size-8" />
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="truncate text-sm font-medium">Resilient Relatives</span>
              <span className="text-xs text-foreground-muted">Admin</span>
            </span>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/">View site</Link>
          </Button>
        </div>
      </header>

      <main
        id="admin-login"
        tabIndex={-1}
        className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-12 outline-none"
      >
        <div className="rounded-xl border bg-card p-6 shadow-card sm:p-8">
          <h1 className="font-heading text-3xl font-medium tracking-tight">Sign in</h1>
          <p className="mt-2 text-foreground-subtle">Access the internal console.</p>
          {configured ? (
            <div className="mt-6">
              <LoginForm from={from} />
            </div>
          ) : (
            <p className="mt-6 text-sm text-foreground-subtle" role="status">
              Admin sign-in is not configured on this deployment. Set{' '}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-[0.9em]">
                ADMIN_BASIC_USER
              </code>{' '}
              and{' '}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-[0.9em]">
                ADMIN_BASIC_PASSWORD
              </code>{' '}
              and redeploy.
            </p>
          )}
          <p className="mt-6 border-t pt-4 text-sm text-foreground-subtle">
            Need help signing in?{' '}
            <a
              href="mailto:caseykennedy@me.com?subject=Resilient%20Relatives%20admin%20access"
              className="rounded-sm font-medium text-primary outline-none hover:text-primary-hover focus-visible:ring-2 focus-visible:ring-ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-card"
            >
              Email support
            </a>
            .
          </p>
        </div>
      </main>
    </div>
  )
}
