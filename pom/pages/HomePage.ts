import { Locator, Page } from '@playwright/test';
import BasePage from './BasePage';

export default class HomePage extends BasePage {
    private readonly signInButton: Locator = this.page.locator('//button[contains(@class,"header_signin")]');
    private readonly signUpButton: Locator = this.page.locator('//button[contains(@class,"hero-descriptor_btn")]');

    async open () {
        await this.page.goto('');
    }

    async clickSignInButton () {
        await this.signInButton.click();
    }

    async clickSignUpButton () {
        await this.signUpButton.click();
    }
}
