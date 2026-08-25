'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import {
  ADMIN_REMEMBER_MAX_AGE_SECONDS,
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE_SECONDS,
  adminSessionCookieOptions,
  createAdminSessionToken,
  getAdminCredentials,
  safeAdminReturnPath,
  timingSafeEqualUtf8,
} from '@/lib/admin-session'

export type LoginState = { error: string } | null

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const { user, password, configured } = getAdminCredentials()
  if (!configured) {
    return { error: 'Admin sign-in is not configured on this deployment.' }
  }

  const submittedUser = String(formData.get('username') ?? '')
  const submittedPassword = String(formData.get('password') ?? '')
  const remember = formData.get('remember') === '1'
  const next = safeAdminReturnPath(String(formData.get('from') ?? ''))

  const userMatches = timingSafeEqualUtf8(submittedUser, user)
  const passwordMatches = timingSafeEqualUtf8(submittedPassword, password)
  if (!userMatches || !passwordMatches) {
    return { error: 'Username or password is incorrect.' }
  }

  const maxAgeSeconds = remember ? ADMIN_REMEMBER_MAX_AGE_SECONDS : ADMIN_SESSION_MAX_AGE_SECONDS
  const token = await createAdminSessionToken(user, password, maxAgeSeconds)
  const cookieStore = await cookies()
  cookieStore.set(
    ADMIN_SESSION_COOKIE,
    token,
    adminSessionCookieOptions(remember ? maxAgeSeconds : undefined),
  )
  redirect(next)
}

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.set(ADMIN_SESSION_COOKIE, '', { ...adminSessionCookieOptions(), maxAge: 0 })
  redirect('/admin/login')
}
