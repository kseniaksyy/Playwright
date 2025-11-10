import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('')
})

test.describe('Successfull Sign up', () => {
  test('Successfull sign in', async ({ page }) => {
    const signUpButton = await page.getByRole('button', { name: 'Sign up' })
    const nameField = await page.locator('//input[@id="signupName"]')
    const lastNameField = await page.locator('//input[@id="signupLastName"]')
    const emailField = await page.getByRole('textbox', { name: 'Email' })
    const passwordField = await page.locator('//input[@id="signupPassword"]')
    const reenterPasswordField = await page.locator('//input[@id="signupRepeatPassword"]')
    const registerButton = await page.getByRole('button', { name: 'Register' })

    await signUpButton.click()
    await nameField.fill('Kseniia')
    await lastNameField.fill('Orliuk')
    await emailField.fill('aqa+' + 'kseniaksyyy02' + '@gmail.com')
    await passwordField.pressSequentially('ValidPass123!')
    await reenterPasswordField.pressSequentially('ValidPass123!')
    await registerButton.click()
    await expect(page.locator('h1', { hasText: 'Garage' })).toBeVisible()
  })
})

test.describe('Name field validation', () => {
  test('Name field empty', async ({ page }) => {
    const signUpButton = await page.getByRole('button', { name: 'Sign up' })
    const nameField = await page.locator('//input[@id="signupName"]')
    const registerButton = await page.getByRole('button', { name: 'Register' })

    await signUpButton.click()
    await nameField.focus()
    await nameField.blur()
    await expect(page.getByText('Name required')).toBeVisible()
    await expect(nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)')
    await expect(registerButton).toBeDisabled()
  })

  test('Name field characters long)', async ({ page }) => {
    const signUpButton = await page.getByRole('button', { name: 'Sign up' })
    const nameField = await page.locator('//input[@id="signupName"]')
    const registerButton = await page.getByRole('button', { name: 'Register' })

    await signUpButton.click()
    await nameField.fill('K')
    await nameField.blur()
    await expect(page.getByText('Name has to be from 2 to 20 characters long')).toBeVisible()
    await expect(nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)')
    await expect(registerButton).toBeDisabled()
    
    await nameField.fill('KseniiaKseniiaKseniia')
    await nameField.blur()
    await expect (page.getByText('Name has to be from 2 to 20 characters long')).toBeVisible()
    await expect(nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)')
    await expect(registerButton).toBeDisabled()
  })

test('Name field invalid', async ({ page }) => {
    const signUpButton = await page.getByRole('button', { name: 'Sign up' })
    const nameField = await page.locator('//input[@id="signupName"]')
    const registerButton = await page.getByRole('button', { name: 'Register' })

    await signUpButton.click()
    await nameField.fill('Ксенія')
    await nameField.blur()
    await expect (page.getByText('Name is invalid')).toBeVisible()
    await expect(nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)')
    await expect(registerButton).toBeDisabled()
})
})

test.describe('Password field validation', () => {
  test('Password field wrong data', async ({ page }) => {
    const signUpButton = await page.getByRole('button', { name: 'Sign up' })
    const passwordField = await page.locator('//input[@id="signupPassword"]')
    const registerButton = await page.getByRole('button', { name: 'Register' })

  await signUpButton.click()
   const wrongPasswordsList = ['short1A', 'alllowercase1', 'ALLUPPERCASE1', 'NoNumbers', '12345678', 'longpasswordwithoutnumbersA']
    for (const wrongPassword of wrongPasswordsList) {
      await passwordField.fill(wrongPassword)
      await passwordField.blur()
      await expect(page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')).toBeVisible()
      await expect(passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)')
      await expect(registerButton).toBeDisabled()}
  })
})

test.describe('Re-enter password validation', () => {
  test('Re-enter password field wrong data', async ({ page }) => {
    const signUpButton = await page.getByRole('button', { name: 'Sign up' })
    const passwordField = await page.locator('//input[@id="signupPassword"]')
    const reenterPasswordField = await page.locator('//input[@id="signupRepeatPassword"]')
    const registerButton = await page.getByRole('button', { name: 'Register' })

    await signUpButton.click()
    await passwordField.fill('ValidPass123!')
    await reenterPasswordField.fill('DifferentPass1!')
    await reenterPasswordField.blur()
    await expect(page.getByText('Passwords do not match')).toBeVisible()
    await expect(reenterPasswordField).toHaveCSS('border-color', 'rgb(220, 53, 69)')
    await expect(registerButton).toBeDisabled()
  })
})