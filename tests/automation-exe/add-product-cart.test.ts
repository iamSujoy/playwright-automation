import { test, expect } from "@playwright/test";
import { VALID_LOGIN_USER } from "../../src/automation-exe/testData/loginProfiles.data";
import { HomePage } from "../../src/automation-exe/pages/homePage";
import { ProductsPage } from "../../src/automation-exe/pages/productsPage";
import { CartPage } from "../../src/automation-exe/pages/cartPage";

test.beforeEach(async ({ page }) => {
    await page.goto('https://automationexercise.com/');
    let homePage = new HomePage(page);
    let loginPage = await homePage.navigateToLoginPage();
    await loginPage.login(VALID_LOGIN_USER.email, VALID_LOGIN_USER.password);
    expect(await homePage.validateLoggedInUser(VALID_LOGIN_USER.username)).toBeTruthy();
});

test("Add and Remove Product to Cart from Products Page", async ({ page }) => {
    let productsPage: ProductsPage;
    let cartPage: CartPage;

    await test.step('Navigate to Products Page', async () => {
        let homePage = new HomePage(page);
        productsPage = await homePage.navigateToProductsPage();
        expect(await productsPage.getPageTitle()).toBe('All Products');
    });

    await test.step('Add `Regular Fit Straight Jeans` product from H&M brand to cart', async () => {
        productsPage = await productsPage.clickBrand("H&M");
        expect(await productsPage.getPageTitle()).toBe('Brand - H&M Products');
        // await productsPage.addProductToCartByName("Regular Fit Straight Jeans");
        await productsPage.addProductToCart(8);
        await productsPage.clickContinueShopping();
    });

    await test.step('Add `Half Sleeves Top Schiffli Detailing - Pink` product from BABYHUG brand to cart', async () => {
        productsPage = await productsPage.clickBrand("Babyhug");
        expect(await productsPage.getPageTitle()).toBe('Brand - Babyhug Products');
        // await productsPage.addProductToCartByName("Half Sleeves Top Schiffli Detailing - Pink");
        await productsPage.addProductToCart(2);
        cartPage = await productsPage.clickViewCartFromModal();
    });

    await test.step('Remove `Regular Fit Straight Jeans` product from cart', async () => {
        expect(await cartPage.getProductCount()).toBe(2);
        await cartPage.deleteProduct("Regular Fit Straight Jeans");
        expect(await cartPage.getProductCount()).toBe(1);
    });

});