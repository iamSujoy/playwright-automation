import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../base/basePage';

export class ProductsPage extends BasePage {

    // Search elements
    private searchProductInput: Locator;
    private submitSearchButton: Locator;

    // Product elements
    private productCards: Locator;
    private addToCartButtons: Locator;
    private viewProductLinks: Locator;

    // Category elements
    private womenCategory: Locator;
    private menCategory: Locator;
    private kidsCategory: Locator;
    private dressLink: Locator;
    private topsLink: Locator;
    private sareeLink: Locator;
    private tshirtsLink: Locator;
    private jeansLink: Locator;

    // Brand elements
    private brandLinks: Locator;

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

        // Category elements
        this.womenCategory = page.locator('a[href="#Women"]');
        this.menCategory = page.locator('a[href="#Men"]');
        this.kidsCategory = page.locator('a[href="#Kids"]');
        this.dressLink = page.locator('a[href="/category_products/1"]');
        this.topsLink = page.locator('a[href="/category_products/2"]');
        this.sareeLink = page.locator('a[href="/category_products/7"]');
        this.tshirtsLink = page.locator('a[href="/category_products/3"]');
        this.jeansLink = page.locator('a[href="/category_products/6"]');

        // Brand elements
        this.brandLinks = page.locator('.brands-name a[href*="/brand_products/"]');

        // Modal elements
        this.cartModal = page.locator('#cartModal');
        this.continueShoppingButton = page.locator('.close-modal');
        this.viewCartLink = page.locator('a[href="/view_cart"]');

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

    // Category actions
    async clickWomenCategory(): Promise<void> {
        await this.womenCategory.click();
    }

    async clickMenCategory(): Promise<void> {
        await this.menCategory.click();
    }

    async clickKidsCategory(): Promise<void> {
        await this.kidsCategory.click();
    }

    async clickDressCategory(): Promise<void> {
        await this.dressLink.click();
    }

    async clickTopsCategory(): Promise<void> {
        await this.topsLink.click();
    }

    async clickSareeCategory(): Promise<void> {
        await this.sareeLink.click();
    }

    async clickTshirtsCategory(): Promise<void> {
        await this.tshirtsLink.click();
    }

    async clickJeansCategory(): Promise<void> {
        await this.jeansLink.click();
    }

    // Brand actions
    async clickBrand(brandName: string): Promise<void> {
        await this.page.locator(`a[href="/brand_products/${brandName}"]`).click();
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
        await this.continueShoppingButton.click();
    }

    async clickViewCartFromModal(): Promise<void> {
        await this.viewCartLink.click();
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