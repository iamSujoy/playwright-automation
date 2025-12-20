import {Page, Locator} from '@playwright/test';

export class BasePage {

    protected page: Page; 

    constructor(page: Page) {
        this.page = page;       
    }

    async navigateTo(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async getTitle(): Promise<string> {
        return await this.page.title();
    }

    async getURL(): Promise<string> {
        return this.page.url();
    }

    async clickElement(locator: Locator): Promise<void> {
        await locator.click();
    }

    async getElementText(locator: Locator): Promise<string> {
        return await locator.textContent() || '';
    }

    async fillInput(locator: Locator, text: string): Promise<void> {
        await locator.fill(text);
    }

    async checkRadioButton(locator: Locator): Promise<void> {
        await locator.check();
    }

    async checkCheckbox(locator: Locator): Promise<void> {
        await locator.check();
    }

    async uncheckCheckbox(locator: Locator): Promise<void> {
        await locator.uncheck();
    }

    async getInputValue(locator: Locator): Promise<string> {
        return await locator.inputValue();
    }

    async isElementChecked(locator: Locator): Promise<boolean> {
        return await locator.isChecked();
    }

    async selectDropdownByValue(locator: Locator, value: string): Promise<void> {
        await locator.selectOption({ value });
    }

    async selectDropdownByLabel(locator: Locator, label: string): Promise<void> {
        await locator.selectOption({ label });
    }
}