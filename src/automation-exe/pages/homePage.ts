import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../base/basePage';
import { LoginPage } from './loginPage';
import { ProductsPage } from './productsPage';

export class HomePage extends BasePage {

    // Navigation elements
    private homeLink: Locator;
    private productsLink: Locator;
    private cartLink: Locator;
    private loginLink: Locator;
    private testCasesLink: Locator;
    private apiTestingLink: Locator;
    private videoTutorialsLink: Locator;
    private contactUsLink: Locator;
    private logoutLink: Locator;
    private deleteAccountLink: Locator;


    constructor(page: Page) {
        super(page);
        this.homeLink = page.locator('a[href="/"]').first();
        this.productsLink = page.locator('a[href="/products"]');
        this.cartLink = page.locator('a[href="/view_cart"]');
        this.loginLink = page.locator('a[href="/login"]');
        this.testCasesLink = page.locator('a[href="/test_cases"]');
        this.apiTestingLink = page.locator('a[href="/api_list"]');
        this.videoTutorialsLink = page.locator('a[href="https://www.youtube.com/c/AutomationExercise"]');
        this.contactUsLink = page.locator('a[href="/contact_us"]');
        this.logoutLink = page.locator('a[href="/logout"]');
        this.deleteAccountLink = page.locator('a[href="/delete_account"]');

    }

    async navigateToLoginPage(): Promise<LoginPage> {
        await this.clickElement(this.loginLink);
        return new LoginPage(this.page);
    }

    async navigateToProductsPage(): Promise<ProductsPage> {
        await this.clickElement(this.productsLink);
        return new ProductsPage(this.page);
    }

    async validateLoggedInUser(username: string): Promise<boolean> {
        const userLocator = this.page.getByText(`Logged in as ${username}`);
        return await userLocator.isVisible();
    }

    async logout(): Promise<LoginPage> {
        await this.clickElement(this.logoutLink);
        return new LoginPage(this.page);
    }
}