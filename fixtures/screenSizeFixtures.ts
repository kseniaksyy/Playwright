import { test as base, Page } from '@playwright/test'

type MyFixtures = {
  smallScreen: Page
  mediumScreen: Page
  largeScreen: Page
}

export const test = base.extend<MyFixtures>({
  smallScreen: async ({ page }, use) => {
    await page.setViewportSize({ width: 300, height: 300 })
    use(page)
  },

  mediumScreen: async ({ page }, use) => {
    await page.setViewportSize({ width: 800, height: 800 })
    use(page)
  },

  largeScreen: async ({ page }, use) => {
    await page.setViewportSize({ width: 1200, height: 1200 })
    use(page)
  },
})

export { expect } from '@playwright/test'
