import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../base/basePage';
import { CartPage } from './cartPage';

export class ProductsPage extends BasePage {

    // Search elements
    private searchProductInput: Locator;
    private submitSearchButton: Locator;

    // Product elements
    private productCards: Locator;
    private addToCartButtons: Locator;
    private viewProductLinks: Locator;

    // Modal elements
    private cartModal: Locator;
    private continueShoppingButton: Locator;
    private viewCartLink: Locator;

    // Page title
    private pageTitle: Locator;

    constructor(page: Page) {
        super(page);

        // Search elements
        this.searchProductInput = page.locator('#search_product');
        this.submitSearchButton = page.locator('#submit_search');

        // Product elements
        this.productCards = page.locator('.product-image-wrapper');
        this.addToCartButtons = page.locator('.add-to-cart');
        this.viewProductLinks = page.locator('a[href*="/product_details/"]');

        // Modal elements
        this.cartModal = page.locator('#cartModal');
        this.continueShoppingButton = page.locator('.close-modal');
        this.viewCartLink = page.locator('#cartModal [href="/view_cart"]');

        // Page title
        this.pageTitle = page.locator('.title.text-center');
    }

    // Search actions
    async enterSearchTerm(searchTerm: string): Promise<void> {
        await this.fillInput(this.searchProductInput, searchTerm);
    }

    async clickSearchButton(): Promise<void> {
        await this.submitSearchButton.click();
    }

    async searchProduct(searchTerm: string): Promise<void> {
        await this.enterSearchTerm(searchTerm);
        await this.clickSearchButton();
    }

    async getSearchResults(): Promise<string[]> {
        const results: string[] = [];
        const count = await this.productCards.count();

        for (let i = 0; i < count; i++) {
            const productName = await this.productCards.nth(i).locator('.productinfo p').textContent();
            if (productName) {
                results.push(productName);
            }
        }
        return results;
    }

    // Product actions
    async addProductToCart(productIndex: number): Promise<void> {
        await this.addToCartButtons.nth(productIndex).click();
    }

    async addProductToCartById(productId: string): Promise<void> {
        await this.page.locator(`[data-product-id="${productId}"]`).click();
    }

    async addProductToCartByName(productName: string): Promise<void> {
        const addToCartBtn = this.page.locator(`(//p[text()="${productName}"]/following-sibling::a[contains(@class,'add-to-cart')])`)
        await addToCartBtn.first().hover();
        await this.clickElement(addToCartBtn.nth(1));
    }

    async viewProductDetails(productIndex: number): Promise<void> {
        await this.viewProductLinks.nth(productIndex).click();
    }

    async getProductCount(): Promise<number> {
        return await this.productCards.count();
    }

    async getProductName(productIndex: number): Promise<string> {
        return await this.productCards.nth(productIndex).locator('.productinfo p').textContent() || '';
    }

    async getProductPrice(productIndex: number): Promise<string> {
        return await this.productCards.nth(productIndex).locator('.productinfo h2').textContent() || '';
    }


    // Brand actions
    async clickBrand(brandName: string): Promise<ProductsPage> {
        const brandLink = this.page.locator(`a[href="/brand_products/${brandName}"]`);
        await this.clickElement(brandLink);
        return this;
    }

    async getBrandCount(brandName: string): Promise<string> {
        const brandElement = this.page.locator(`a[href="/brand_products/${brandName}"] .pull-right`);
        return await brandElement.textContent() || '';
    }

    // Modal actions
    async waitForCartModal(): Promise<void> {
        await this.cartModal.waitFor({ state: 'visible' });
    }

    async clickContinueShopping(): Promise<void> {
        await this.clickElement(this.continueShoppingButton);
    }

    async clickViewCartFromModal(): Promise<CartPage> {
        await this.clickElement(this.viewCartLink);
        return new CartPage(this.page);
    }

    async isCartModalVisible(): Promise<boolean> {
        return await this.cartModal.isVisible();
    }

    // Page verification
    async getPageTitle(): Promise<string> {
        return await this.pageTitle.textContent() || '';
    }

    async isPageLoaded(): Promise<boolean> {
        await this.pageTitle.waitFor({ state: 'visible' });
        return await this.pageTitle.isVisible();
    }

    async waitForProductsToLoad(): Promise<void> {
        await this.productCards.first().waitFor({ state: 'visible' });
    }
}