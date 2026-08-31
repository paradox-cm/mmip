import { expect, test } from '@playwright/test'

const user = process.env.ADMIN_BASIC_USER?.trim()
const password = process.env.ADMIN_BASIC_PASSWORD?.trim()
const adminConfigured = Boolean(
  user && password && !user.startsWith('<') && !password.startsWith('<'),
)

test.describe('admin login', () => {
  test.use({ storageState: { cookies: [], origins: [] } })

  test('redirects /admin to the sign-in page when signed out', async ({ page }) => {
    test.skip(!adminConfigured, 'ADMIN_BASIC_* are not set')
    await page.goto('/admin')
    await expect(page).toHaveURL(/\/admin\/login/)
    await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible()
  })

  test('rejects an incorrect password', async ({ page }) => {
    test.skip(!adminConfigured, 'ADMIN_BASIC_* are not set')
    await page.goto('/admin/login')
    await page.getByLabel('Username').fill(user!)
    await page.locator('input[name="password"]').fill('incorrect-password')
    await page.getByRole('button', { name: 'Sign in' }).click()
    await expect(
      page.getByRole('alert').filter({ hasText: 'Username or password is incorrect.' }),
    ).toContainText('Username or password is incorrect.')
    await expect(page).toHaveURL(/\/admin\/login/)
  })

  test('toggles password visibility, remember-me, and help mail', async ({ page }) => {
    await page.goto('/admin/login')
    const password = page.locator('input[name="password"]')
    await password.fill('secret-value')
    await expect(password).toHaveAttribute('type', 'password')
    await page.getByRole('button', { name: 'Show password' }).click()
    await expect(password).toHaveAttribute('type', 'text')
    await expect(page.getByRole('checkbox', { name: 'Remember me' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Email support' })).toHaveAttribute(
      'href',
      'mailto:caseykennedy@me.com?subject=Resilient%20Relatives%20admin%20access',
    )
  })

  test('signs in and returns to the console', async ({ page }) => {
    test.skip(!adminConfigured, 'ADMIN_BASIC_* are not set')
    await page.goto('/admin/design')
    await expect(page).toHaveURL(/\/admin\/login/)
    await page.getByLabel('Username').fill(user!)
    await page.locator('input[name="password"]').fill(password!)
    await page.getByRole('button', { name: 'Sign in' }).click()
    await expect(page).toHaveURL(/\/admin\/design/)
    await expect(page.getByRole('button', { name: 'Sign out' })).toBeVisible()
  })
})
