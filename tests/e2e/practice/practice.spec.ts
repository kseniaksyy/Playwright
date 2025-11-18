import { test, expect } from '@playwright/test'
import { usersList } from '../../../test-data/users'

test.describe('Practice', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('')
  })
  test('Switch between tabs', async ({ page, context }) => {
    const faceBookPromise = context.waitForEvent('page')
    await page.locator('.icon-facebook').click()

    const faceBookPage = await faceBookPromise
    await expect(faceBookPage.getByText('Create new account')).toBeVisible()
  })
})
