import test, { expect } from '@playwright/test'
import SignInForm from '../../../pom/forms/SignInForm'
import HomePage from '../../../pom/pages/HomePage'
import AuthController from '../../../api/controllers/AuthControllers'

let signInForm: SignInForm
let homePage: HomePage
let authController: AuthController

test.beforeEach(async ({ page }) => {
  signInForm = new SignInForm(page)
  homePage = new HomePage(page)
})

test('Mock response', async ({ page }) => {
  await homePage.open()
  await homePage.clickSignInButton()
  await signInForm.loginWithCredentials(
    process.env.VALID_USER1!,
    process.env.VALID_PASS1!
  )
  await page.route('**/api/users/profile', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        data: {
          userId: 283004,
          photoFilename: 'default-user.png',
          name: 'НАТАЛКА',
          lastName: 'ПОЛТАВКА',
        },
      }),
    })
  })
  await page
    .locator('//a[@class="btn btn-white btn-sidebar sidebar_btn -profile"]')
    .click()
})

//
