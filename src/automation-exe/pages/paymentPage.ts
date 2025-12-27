import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../base/basePage';
import { OrderPlacedPage } from './orderPlacedPage';

export class PaymentPage extends BasePage {
    private nameOnCardInput: Locator;
    private cardNumberInput: Locator;
    private cvcInput: Locator;
    private expiryMonthInput: Locator;
    private expiryYearInput: Locator;
    private payButton: Locator;
    private successMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.nameOnCardInput = page.locator('input[data-qa="name-on-card"]');
        this.cardNumberInput = page.locator('input[data-qa="card-number"]');
        this.cvcInput = page.locator('input[data-qa="cvc"]');
        this.expiryMonthInput = page.locator('input[data-qa="expiry-month"]');
        this.expiryYearInput = page.locator('input[data-qa="expiry-year"]');
        this.payButton = page.locator('button[data-qa="pay-button"]');
        this.successMessage = page.locator('#success_message');
    }

    async enterNameOnCard(name: string): Promise<void> {
        await this.nameOnCardInput.fill(name);
    }

    async enterCardNumber(cardNumber: string): Promise<void> {
        await this.cardNumberInput.fill(cardNumber);
    }

    async enterCvc(cvc: string): Promise<void> {
        await this.cvcInput.fill(cvc);
    }

    async enterExpiryMonth(month: string): Promise<void> {
        await this.expiryMonthInput.fill(month);
    }

    async enterExpiryYear(year: string): Promise<void> {
        await this.expiryYearInput.fill(year);
    }

    async clickPayButton(): Promise<OrderPlacedPage> {
        await this.payButton.click();
        return new OrderPlacedPage(this.page);
    }

    async isSuccessMessageDisplayed(): Promise<boolean> {
        return await this.successMessage.isVisible();
    }

    async getSuccessMessageText(): Promise<string> {
        return await this.successMessage.textContent() || '';
    }

    async fillPaymentForm(nameOnCard: string, cardNumber: string, cvc: string, expiryMonth: string, expiryYear: string): Promise<void> {
        await this.enterNameOnCard(nameOnCard);
        await this.enterCardNumber(cardNumber);
        await this.enterCvc(cvc);
        await this.enterExpiryMonth(expiryMonth);
        await this.enterExpiryYear(expiryYear);
    }
}