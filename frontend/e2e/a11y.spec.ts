/**
 * WCAG 2.2 AA axe-core gate for public routes and the design-system catalog.
 * Add new public URLs here when they ship.
 */
import { test } from '@playwright/test'

import { expectNoAxeViolations } from './helpers/axe'

const ROUTES = [
  '/',
  '/search',
  '/tribes',
  '/services',
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

for (const route of ROUTES) {
  test(`axe: ${route}`, async ({ page }) => {
    const response = await page.goto(route, { waitUntil: 'domcontentloaded' })
    test.skip(response?.status() === 404, `${route} returned 404`)
    test.skip(
      (response?.status() ?? 0) >= 500,
      `${route} returned ${response?.status()} (CMS/env unavailable)`,
    )
    await page.waitForLoadState('networkidle').catch(() => undefined)
    await expectNoAxeViolations(page)
  })
}
