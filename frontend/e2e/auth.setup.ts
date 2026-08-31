import { mkdirSync } from 'node:fs'
import { dirname } from 'node:path'

import { test as setup } from '@playwright/test'

const authFile = 'e2e/.auth/admin.json'

setup('authenticate admin', async ({ page }) => {
  mkdirSync(dirname(authFile), { recursive: true })

  const user = process.env.ADMIN_BASIC_USER?.trim()
  const password = process.env.ADMIN_BASIC_PASSWORD?.trim()
  const configured = Boolean(user && password && !user.startsWith('<') && !password.startsWith('<'))

  if (!configured || !user || !password) {
    await page.context().storageState({ path: authFile })
    return
  }

  await page.goto('/admin/login')
  await page.getByLabel('Username').fill(user)
  await page.locator('input[name="password"]').fill(password)
  await page.getByRole('button', { name: 'Sign in' }).click()
  await page.waitForURL(/\/admin(?!\/login)/)
  await page.context().storageState({ path: authFile })
})
