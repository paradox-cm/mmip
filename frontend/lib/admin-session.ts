export const ADMIN_SESSION_COOKIE = 'rr_admin_session'
/** Server-side expiry when “Remember me” is off (browser session cookie). */
export const ADMIN_SESSION_MAX_AGE_SECONDS = 60 * 60 * 12
/** Persistent cookie when “Remember me” is on. */
export const ADMIN_REMEMBER_MAX_AGE_SECONDS = 60 * 60 * 24 * 30

type SessionPayload = {
  u: string
  exp: number
}

function isConfiguredValue(value: string | undefined) {
  const trimmed = value?.trim()
  return Boolean(trimmed && !trimmed.startsWith('<'))
}

export function getAdminCredentials() {
  const user = process.env.ADMIN_BASIC_USER?.trim() ?? ''
  const password = process.env.ADMIN_BASIC_PASSWORD?.trim() ?? ''
  return {
    user,
    password,
    configured: isConfiguredValue(user) && isConfiguredValue(password),
  }
}

/** Production always requires a session. Local `next dev` stays open if creds are unset. */
export function isAdminAuthRequired() {
  if (getAdminCredentials().configured) return true
  return process.env.NODE_ENV === 'production'
}

export function adminSessionCookieOptions(maxAgeSeconds?: number) {
  return {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: Boolean(process.env.VERCEL),
    path: '/admin',
    ...(typeof maxAgeSeconds === 'number' ? { maxAge: maxAgeSeconds } : {}),
  }
}

/** Constant-time compare that works on the Edge runtime (no node:crypto). */
export function timingSafeEqualUtf8(left: string, right: string) {
  const encoder = new TextEncoder()
  const a = encoder.encode(left)
  const b = encoder.encode(right)
  const len = Math.max(a.length, b.length)
  let mismatch = a.length === b.length ? 0 : 1
  for (let i = 0; i < len; i++) {
    mismatch |= (a[i] ?? 0) ^ (b[i] ?? 0)
  }
  return mismatch === 0
}

function sessionSecret(user: string, password: string) {
  return `rr-admin-session-v1:${user}:${password}`
}

function toBase64Url(bytes: Uint8Array) {
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

function fromBase64Url(value: string) {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/')
  const withPad = padded + '='.repeat((4 - (padded.length % 4)) % 4)
  const binary = atob(withPad)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return bytes
}

async function hmacKey(secret: string) {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  )
}

export async function createAdminSessionToken(
  user: string,
  password: string,
  maxAgeSeconds = ADMIN_SESSION_MAX_AGE_SECONDS,
) {
  const payload = new TextEncoder().encode(
    JSON.stringify({
      u: user,
      exp: Math.floor(Date.now() / 1000) + maxAgeSeconds,
    } satisfies SessionPayload),
  )
  const key = await hmacKey(sessionSecret(user, password))
  const signature = new Uint8Array(await crypto.subtle.sign('HMAC', key, payload))
  return `${toBase64Url(payload)}.${toBase64Url(signature)}`
}

export async function verifyAdminSessionToken(
  token: string | undefined,
  user: string,
  password: string,
) {
  if (!token) return false
  const parts = token.split('.')
  if (parts.length !== 2 || !parts[0] || !parts[1]) return false

  let payloadBytes: Uint8Array
  let signatureBytes: Uint8Array
  try {
    payloadBytes = fromBase64Url(parts[0])
    signatureBytes = fromBase64Url(parts[1])
  } catch {
    return false
  }

  const key = await hmacKey(sessionSecret(user, password))
  const valid = await crypto.subtle.verify('HMAC', key, signatureBytes, payloadBytes)
  if (!valid) return false

  try {
    const payload = JSON.parse(new TextDecoder().decode(payloadBytes)) as SessionPayload
    if (typeof payload.u !== 'string' || typeof payload.exp !== 'number') return false
    if (payload.exp < Math.floor(Date.now() / 1000)) return false
    return timingSafeEqualUtf8(payload.u, user)
  } catch {
    return false
  }
}

export function safeAdminReturnPath(value: string | string[] | undefined) {
  const raw = Array.isArray(value) ? value[0] : value
  if (!raw) return '/admin'

  let decoded = raw
  try {
    decoded = decodeURIComponent(raw)
  } catch {
    return '/admin'
  }

  if (!decoded.startsWith('/admin')) return '/admin'
  if (decoded === '/admin/login' || decoded.startsWith('/admin/login?')) return '/admin'
  if (
    decoded.includes('..') ||
    decoded.startsWith('//') ||
    decoded.includes('\\') ||
    decoded.includes('://')
  ) {
    return '/admin'
  }
  return decoded
}
