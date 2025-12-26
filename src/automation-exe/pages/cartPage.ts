import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../base/basePage';

export class CartPage extends BasePage {

    // Locators
    private readonly proceedToCheckoutBtn: Locator;
    private readonly continueOnCartBtn: Locator;
    private readonly cartTable: Locator;
    private readonly productRows: Locator;
    private readonly emptyCartMessage: Locator;
    private readonly checkoutModal: Locator;
    private readonly deleteProductLinks: Locator;
    private readonly productLinks: Locator;

    constructor(page: Page) {
        super(page);
        this.proceedToCheckoutBtn = page.locator('.btn.btn-default.check_out');
        this.continueOnCartBtn = page.locator('.btn.btn-success.close-checkout-modal.btn-block');
        this.cartTable = page.locator('#cart_info_table');
        this.productRows = page.locator('#cart_info_table tbody tr');
        this.emptyCartMessage = page.locator('#empty_cart');
        this.checkoutModal = page.locator('#checkoutModal');
        this.deleteProductLinks = page.locator('.cart_quantity_delete');
        this.productLinks = page.locator('.cart_description h4 a');
    }

    // Action methods
    async clickProceedToCheckout(): Promise<void> {
        await this.proceedToCheckoutBtn.click();
    }

    async clickContinueOnCart(): Promise<void> {
        await this.continueOnCartBtn.click();
    }

    async deleteProduct(productName: string): Promise<void> {
        const deleteBtn = this.page.locator(`//a[normalize-space()='${productName}']/ancestor::tr//a[@class='cart_quantity_delete']`);
        await this.clickElement(deleteBtn);
        // wait for the row to be removed
        await deleteBtn.waitFor({ state: 'detached' });
    }

    async clickProductLink(productName: string): Promise<void> {
        await this.page.locator(`text=${productName}`).click();
    }

    async getProductCount(): Promise<number> {
        return await this.productRows.count();
    }

    async getProductPrice(productId: string): Promise<string> {
        const row = this.page.locator(`#product-${productId}`);
        return await row.locator('.cart_price p').textContent() || '';
    }

    async getProductTotal(productId: string): Promise<string> {
        const row = this.page.locator(`#product-${productId}`);
        return await row.locator('.cart_total_price').textContent() || '';
    }

    async getProductName(productId: string): Promise<string> {
        const row = this.page.locator(`#product-${productId}`);
        return await row.locator('.cart_description h4 a').textContent() || '';
    }

    async isCartEmpty(): Promise<boolean> {
        return await this.emptyCartMessage.isVisible();
    }

    async isCheckoutModalVisible(): Promise<boolean> {
        return await this.checkoutModal.isVisible();
    }

    async isProductInCart(productId: string): Promise<boolean> {
        return await this.page.locator(`#product-${productId}`).isVisible();
    }

    async waitForCartTable(): Promise<void> {
        await this.cartTable.waitFor({ state: 'visible' });
    }
}