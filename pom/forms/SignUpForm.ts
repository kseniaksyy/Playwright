import { expect, Locator } from '@playwright/test'
import BasePage from '../pages/BasePage'

export default class SignUpForm extends BasePage {
  private readonly nameField: Locator = this.page.locator(
    '//input[@id="signupName"]'
  )
  private readonly lastNameField: Locator = this.page.locator(
    '//input[@id="signupLastName"]'
  )
  private readonly emailField: Locator = this.page.locator(
    '//input[@id="signupEmail"]'
  )
  private readonly passwordField: Locator = this.page.locator(
    '//input[@id="signupPassword"]'
  )
  private readonly reEnterPasswordField: Locator = this.page.locator(
    '//input[@id="signupRepeatPassword"]'
  )
  private readonly registerButton: Locator = this.page.getByRole('button', {
    name: 'Register',
  })

  async fillName(name: string): Promise<any> {
    await this.nameField.fill(name)
  }

  async fillLastName(lastName: string): Promise<any> {
    await this.lastNameField.fill(lastName)
  }

  async fillEmail(email: string): Promise<any> {
    await this.emailField.fill(email)
  }

  async fillPassword(password: string): Promise<any> {
    await this.passwordField.fill(password)
  }

  async fillReEnterPassword(reEnterPassword: string): Promise<any> {
    await this.reEnterPasswordField.fill(reEnterPassword)
  }

  async clickRegisterButton(): Promise<any> {
    await this.registerButton.click()
  }

  async successSignUp(
    name: string,
    lastName: string,
    email: string,
    password: string,
    reEnterPassword: string
  ): Promise<any> {
    await this.fillName(name)
    await this.fillLastName(lastName)
    await this.fillEmail(email)
    await this.fillPassword(password)
    await this.fillReEnterPassword(reEnterPassword)
    await this.clickRegisterButton()
  }


  async triggerEmptyErrorOnNameField(nameField:Locator): Promise<any> {
    await nameField.focus()
    await nameField.blur()
  }

    async expectRedBorder(locator: any) {
  //функція перевірки червоної рамки
  await expect(locator).toHaveCSS('border-color', 'rgb(220, 53, 69)')
}
}
