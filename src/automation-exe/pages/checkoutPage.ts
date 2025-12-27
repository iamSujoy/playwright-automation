import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../base/basePage';

export class CheckoutPage extends BasePage {

    // Locators
    private deliveryAddress: Locator;
    private billingAddress: Locator;
    private orderTable: Locator;
    private totalAmount: Locator;
    private commentTextarea: Locator;
    private placeOrderButton: Locator;

    constructor(page: Page) {
        super(page);
        this.deliveryAddress = page.locator('#address_delivery');
        this.billingAddress = page.locator('#address_invoice');
        this.orderTable = page.locator('#cart_info table');
        this.totalAmount = page.locator('.cart_total_price').last();
        this.commentTextarea = page.locator('textarea[name="message"]');
        this.placeOrderButton = page.locator('a.check_out');
    }

    // Action Methods
    async enterComment(comment: string): Promise<void> {
        await this.commentTextarea.fill(comment);
    }

    async clickPlaceOrder(): Promise<void> {
        await this.placeOrderButton.click();
    }

    async getDeliveryAddressText(): Promise<string> {
        return await this.deliveryAddress.textContent() || '';
    }

    async getBillingAddressText(): Promise<string> {
        return await this.billingAddress.textContent() || '';
    }

    async getTotalAmount(): Promise<string> {
        return await this.totalAmount.textContent() || '';
    }

    async getProductName(): Promise<string> {
        return await this.page.locator('.cart_description h4 a').textContent() || '';
    }

    async getProductPrice(): Promise<string> {
        return await this.page.locator('.cart_price p').textContent() || '';
    }

    async getProductQuantity(): Promise<string> {
        return await this.page.locator('.cart_quantity button').textContent() || '';
    }

    async isOrderTableVisible(): Promise<boolean> {
        return await this.orderTable.isVisible();
    }

    async isPlaceOrderButtonEnabled(): Promise<boolean> {
        return await this.placeOrderButton.isEnabled();
    }

    async completeCheckout(comment?: string): Promise<void> {
        if (comment) {
            await this.enterComment(comment);
        }
        await this.clickPlaceOrder();
    }
}