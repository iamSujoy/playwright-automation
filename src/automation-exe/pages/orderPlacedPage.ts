import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../base/basePage';

export class OrderPlacedPage extends BasePage {
    readonly orderPlacedTitle: Locator;
    readonly confirmationMessage: Locator;
    readonly downloadInvoiceButton: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        super(page);
        this.orderPlacedTitle = page.locator('[data-qa="order-placed"]');
        this.confirmationMessage = page.locator('p').filter({ hasText: 'Congratulations! Your order has been confirmed!' });
        this.downloadInvoiceButton = page.locator('a.btn.btn-default.check_out').filter({ hasText: 'Download Invoice' });
        this.continueButton = page.locator('[data-qa="continue-button"]');
    }

    async getOrderPlacedTitle(): Promise<string> {
        return await this.orderPlacedTitle.textContent() || '';
    }

    async getConfirmationMessage(): Promise<string> {
        return await this.confirmationMessage.textContent() || '';
    }

    async clickDownloadInvoice(): Promise<void> {
        await this.downloadInvoiceButton.click();
    }

    async clickContinue(): Promise<void> {
        await this.continueButton.click();
    }

    async isOrderPlacedTitleVisible(): Promise<boolean> {
        return await this.orderPlacedTitle.isVisible();
    }

    async isConfirmationMessageVisible(): Promise<boolean> {
        return await this.confirmationMessage.isVisible();
    }

    async isDownloadInvoiceButtonVisible(): Promise<boolean> {
        return await this.downloadInvoiceButton.isVisible();
    }

    async isContinueButtonVisible(): Promise<boolean> {
        return await this.continueButton.isVisible();
    }

    async waitForOrderPlacedPage(): Promise<void> {
        await this.orderPlacedTitle.waitFor({ state: 'visible' });
    }

    async validateOrderPlacedPage(): Promise<boolean> {
        this.waitForOrderPlacedPage();
        return await this.isOrderPlacedTitleVisible() &&
            await this.isConfirmationMessageVisible() &&
            await this.isDownloadInvoiceButtonVisible() &&
            await this.isContinueButtonVisible();
    }
}