import test, { expect } from '@playwright/test'
import { usersList } from '../test-data/users'

test.beforeEach(async ({ page }) => {
  await page.goto('')
})

test.describe('Sign In Tests', () => {
  test('Successfull sign in', async ({ page }) => {
    const emailField = page.getByRole('textbox', { name: 'Email' })
    const passwordField = page.getByRole('textbox', { name: 'Password' })
    const signInButton = page.locator(
      '//button[contains(@class,"header_signin")]'
    )
    const logInButton = page.getByText('Login')

    await signInButton.click()
    await emailField.fill(usersList.mainUser.email)
    await passwordField.pressSequentially(usersList.mainUser.password) // набирати по символам
    await logInButton.click()
    await expect(page.locator('h1', { hasText: 'Garage' })).toBeVisible()
  })
})

test.describe('Practice with text', () => {
  test('Text', async ({ page }) => {
    console.log (await page.locator('//h1').textContent()); //виводить текст першого знайденого елемента
    console.log (await page.locator('//button').allTextContents()); //виводить тексти всіх знайдених елементів у вигляді масиву
  })
})