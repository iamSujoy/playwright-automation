import { test, expect } from "@playwright/test";
import { HomePage } from "../../src/automation-exe/pages/homePage";
import { VALID_LOGIN_USER } from "../../src/automation-exe/testData/loginProfiles.data";

test.beforeEach(async ({ page }) => {
    await page.goto('https://automationexercise.com/');
    let homePage = new HomePage(page);
    let loginPage = await homePage.navigateToLoginPage();
    await loginPage.login(VALID_LOGIN_USER.email, VALID_LOGIN_USER.password);
    expect(await homePage.validateLoggedInUser(VALID_LOGIN_USER.username)).toBeTruthy();
});


test('Search for a single specific product', async ({ page }) => {
    const productName = 'Premium Polo T-Shirts';

    let homePage = new HomePage(page);
    const productsPage = await homePage.navigateToProductsPage();
    expect(await productsPage.getPageTitle()).toBe('All Products');
    await productsPage.searchProduct(productName);
    expect(await productsPage.getPageTitle()).toBe('Searched Products');
    const results = await productsPage.getSearchResults();
    expect(results.length).toBe(1);
    expect(results[0]).toContain(productName);
});

test('Search for a product with generic term where multiple results are returned', async ({ page }) => {
    const searchTerm = 'shirt';
    const expectedMinResults = 10;
    let homePage = new HomePage(page);
    const productsPage = await homePage.navigateToProductsPage();
    expect(await productsPage.getPageTitle()).toBe('All Products');
    await productsPage.searchProduct(searchTerm);
    expect(await productsPage.getPageTitle()).toBe('Searched Products');
    const results = await productsPage.getSearchResults();
    expect(results.length).toBeGreaterThan(expectedMinResults);
    // results.forEach(result => {
    //     expect(result.toLowerCase()).toContain(searchTerm);
    // });
});

test('Search for a product with no results', async ({ page }) => {
    const searchTerm = 'nonexistentproduct';
    let homePage = new HomePage(page);
    const productsPage = await homePage.navigateToProductsPage();
    expect(await productsPage.getPageTitle()).toBe('All Products');
    await productsPage.searchProduct(searchTerm);
    expect(await productsPage.getPageTitle()).toBe('Searched Products');
    const results = await productsPage.getSearchResults();
    expect(results.length).toBe(0);
});