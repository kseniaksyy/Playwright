import test from '@playwright/test'
import GaragePage from '../../pom/pages/GaragePage'
import SignInForm from '../../pom/forms/SignInForm'
import HomePage from '../../pom/pages/HomePage'

let garagePage: GaragePage
let signInForm: SignInForm
let homePage: HomePage

test.describe('Login to users and save states', () => {
  test.beforeEach(async ({ page }) => {
    garagePage = new GaragePage(page)
    signInForm = new SignInForm(page)
    homePage = new HomePage(page)

    await homePage.open()
    await homePage.clickSignInButton()
  })

    test('Successful sign in', async ({ page }) => {
      await signInForm.loginWithCredentials(
        process.env.VALID_USER1!,
        process.env.VALID_PASS1!
      )
      await page
        .context()
        .storageState({ path: 'test-data/states/mainUserState.json' })
    })
  })
