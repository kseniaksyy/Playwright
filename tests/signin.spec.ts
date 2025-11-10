import test, { expect } from '@playwright/test'
import { usersList } from '../test-data/users'
import HomePage from '../pom/pages/HomePage'
import SignInForm from '../pom/forms/SignInForm'
let homePage: HomePage
let signInForm: SignInForm

test.describe('Sign In Tests with POM', () => {
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    signInForm = new SignInForm(page)
    await homePage.open()
    await homePage.clickSignInButton()
  })

  test('Successful sign in', async ({ page }) => {
    await signInForm.loginWithCredentials(
      usersList.mainUser.email,
      usersList.mainUser.password
    )
    await expect(page.locator('h1', { hasText: 'Garage' })).toBeVisible()
  })

  test('Sign in without Email', async () => {
    await signInForm.triggerEmptyErrorOnField('email')
    await signInForm.verifyErrorIsDisplayed('Email required')
  })

  test('Sign in without Password', async () => {
    await signInForm.triggerEmptyErrorOnField('password')
    await signInForm.verifyErrorIsDisplayed('Password required')
  })

  test('Sign in with incorrect Email', async () => {
    await signInForm.enterEmail('qwerty')
    await signInForm.triggerEmptyErrorOnField('email')
    await signInForm.verifyErrorIsDisplayed('Email is incorrect')
  })
})

// test.describe('Sign In Tests without POM', () => {
//   test.beforeEach(async ({ page }) => {
//   await page.goto('')
// })
//   test('Successfull sign in', async ({ page }) => {
//     const emailField = page.getByRole('textbox', { name: 'Email' })
//     const passwordField = page.getByRole('textbox', { name: 'Password' })
//     const signInButton = page.locator(
//       '//button[contains(@class,"header_signin")]'
//     )
//     const logInButton = page.getByText('Login')

//     await signInButton.click()
//     await emailField.fill(usersList.mainUser.email)
//     await passwordField.pressSequentially(usersList.mainUser.password) // набирати по символам
//     await logInButton.click()
//     await expect(page.locator('h1', { hasText: 'Garage' })).toBeVisible()
//   })
// })

// test.describe('Practice with text', () => {
//   test('Text', async ({ page }) => {
//     console.log (await page.locator('//h1').textContent()); //виводить текст першого знайденого елемента
//     console.log (await page.locator('//button').allTextContents()); //виводить тексти всіх знайдених елементів у вигляді масиву
//   })
// })
