import { type NextRequest, NextResponse } from 'next/server'

import {
  ADMIN_SESSION_COOKIE,
  getAdminCredentials,
  isAdminAuthRequired,
  safeAdminReturnPath,
  verifyAdminSessionToken,
} from '@/lib/admin-session'

function withPrivateCache(response: NextResponse) {
  response.headers.set('Cache-Control', 'private, no-store')
  return response
}

function loginUrl(request: NextRequest, pathname: string, search: string) {
  const url = request.nextUrl.clone()
  url.pathname = '/admin/login'
  const from = `${pathname}${search}`
  url.search = from && from !== '/admin/login' ? `?from=${encodeURIComponent(from)}` : ''
  return url
}

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const isLogin = pathname === '/admin/login'
  const required = isAdminAuthRequired()
  const { user, password, configured } = getAdminCredentials()

  if (!required) {
    return NextResponse.next()
  }

  const hasSession =
    configured &&
    (await verifyAdminSessionToken(
      request.cookies.get(ADMIN_SESSION_COOKIE)?.value,
      user,
      password,
    ))

  if (isLogin) {
    if (hasSession) {
      const next = safeAdminReturnPath(request.nextUrl.searchParams.get('from') ?? undefined)
      return withPrivateCache(NextResponse.redirect(new URL(next, request.url)))
    }
    return withPrivateCache(NextResponse.next())
  }

  if (hasSession) {
    return withPrivateCache(NextResponse.next())
  }

  return withPrivateCache(NextResponse.redirect(loginUrl(request, pathname, search)))
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
}
