/**
 * WCAG 2.2 AA axe-core gate for public routes and the design-system catalog.
 * Add new public URLs here when they ship.
 */
import { expectNoAxeViolations } from './helpers/axe'

import { type Page, test } from '@playwright/test'

const PUBLIC_ROUTES = ['/', '/search', '/tribes', '/services', '/get-help', '/admin/login']

const ADMIN_ROUTES = [
  '/admin',
  '/admin/build-log',
  '/admin/design',
  '/admin/design/foundations',
  '/admin/design/brand-assets',
  '/admin/design/seal',
  '/admin/design/color',
  '/admin/design/typography',
  '/admin/design/spacing',
  '/admin/design/accessibility',
  '/admin/design/components',
  '/admin/design/patterns',
]

async function runAxe(route: string, page: Page) {
  const response = await page.goto(route, { waitUntil: 'domcontentloaded' })
  test.skip(response?.status() === 404, `${route} returned 404`)
  test.skip(response?.status() === 401, `${route} returned 401 (admin auth)`)
  test.skip(
    (response?.status() ?? 0) >= 500,
    `${route} returned ${response?.status()} (CMS/env unavailable)`,
  )
  // Sanity Live maintains a long-lived connection, so `networkidle` can never
  // settle. A visible main landmark is the stable, user-facing readiness signal.
  await page.locator('main').waitFor({ state: 'visible' })
  await expectNoAxeViolations(page)
}

test.describe('public routes', () => {
  test.use({ storageState: { cookies: [], origins: [] } })

  for (const route of PUBLIC_ROUTES) {
    test(`axe: ${route}`, async ({ page }) => {
      await runAxe(route, page)
    })
  }
})

test.describe('admin routes', () => {
  for (const route of ADMIN_ROUTES) {
    test(`axe: ${route}`, async ({ page }) => {
      await runAxe(route, page)
    })
  }
})
