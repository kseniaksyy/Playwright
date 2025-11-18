import { test as base } from '@playwright/test'
import GaragePage from '../pom/pages/GaragePage'
import SignInForm from '../pom/forms/SignInForm'
import HomePage from '../pom/pages/HomePage'

type MyFixtures = {
  garagePage: GaragePage
  signInForm: SignInForm
  homePage: HomePage
}

export const test = base.extend<MyFixtures>({
  storageState: async ({ browser }, use) => {
    const authContext = await browser.newContext()
    const authPage = await authContext.newPage()
    await authPage.goto('https://guest:welcome2qauto@qauto.forstudy.space/')
    const homePage = new HomePage(authPage)
    await homePage.clickSignInButton()
    const signInForm = new SignInForm(authPage)
    await signInForm.loginWithCredentials(
      process.env.VALID_USER1!,
      process.env.VALID_PASS1!
    )
    const state = await authContext.storageState()
    await use(state)
    await authContext.storageState({
      path: 'test-data/states/mainUserState.json',
    })
    await authContext.close()
  },

  garagePage: async ({ page }, use) => {
    const garagePage = new GaragePage(page)
    await use(garagePage)
  },
  signInForm: async ({ page }, use) => {
    const signInForm = new SignInForm(page)
    await use(signInForm)
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page)
    await use(homePage)
  },
})

export { expect } from '@playwright/test'
