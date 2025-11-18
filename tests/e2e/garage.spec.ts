import test from '@playwright/test'
import GaragePage from '../../pom/pages/GaragePage'
import SignInForm from '../../pom/forms/SignInForm'
import HomePage from '../../pom/pages/HomePage'

let garagePage: GaragePage
let signInForm: SignInForm
let homePage: HomePage

test.describe('Garage Page tests', () => {
  test.use({ storageState: 'test-data/states/mainUserState.json' })

  test.beforeEach(async ({ page }) => {
    garagePage = new GaragePage(page)
    signInForm = new SignInForm(page)
    homePage = new HomePage(page)

    // await homePage.open()
    // await homePage.clickSignInButton()
    // await signInForm.loginWithCredentials(process.env.VALID_USER1!, process.env.VALID_PASS1!)
    //await garagePage.verifyPageIsOpen()
    await garagePage.open()
  })
  test('Add BMW X5 to Garage', async () => {
    await garagePage.addNewCar('BMW', 'X5', '333')
    await garagePage.verifyLastAddedCarName('BMW X5')
  })
})
