import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { VALID_LOGIN_USER } from '../../src/automation-exe/testData/loginProfiles.data';
import { HomePage } from '../../src/automation-exe/pages/homePage';
import { CartPage } from '../../src/automation-exe/pages/cartPage';
import { ProductsPage } from '../../src/automation-exe/pages/productsPage';
import { CheckoutPage } from '../../src/automation-exe/pages/checkoutPage';
import { LoginPage } from '../../src/automation-exe/pages/loginPage';
import { PaymentPage } from '../../src/automation-exe/pages/paymentPage';
import { OrderPlacedPage } from '../../src/automation-exe/pages/orderPlacedPage';

test.beforeEach(async ({ page }) => {
    await page.goto('https://automationexercise.com/');
});

test('Checkout flow - single product purchase', async ({ page }, testInfo) => {
    let homePage: HomePage;
    let productsPage: ProductsPage;
    let cartPage: CartPage;
    let loginPage: LoginPage;
    let checkoutPage: CheckoutPage;
    let paymentPage: PaymentPage;
    let orderPlacedPage: OrderPlacedPage;

    await test.step('Login with valid user', async () => {

        homePage = new HomePage(page);
        loginPage = await homePage.navigateToLoginPage();
        await loginPage.login('rav121212i@test.com', 'rav121212i@test.com');
        expect(await homePage.validateLoggedInUser('ravi')).toBeTruthy();
    });

    await test.step('Navigate to cart page and clear cart if not empty', async () => {
        cartPage = await homePage.navigateToCartPage();
        await cartPage.clearCartIfNotEmpty();
    });

    await test.step('Add first product from H&M brand', async () => {
        productsPage = await cartPage.clickProductPageLink();
        productsPage = await productsPage.clickBrand("H&M");
        expect(await productsPage.getPageTitle()).toBe('Brand - H&M Products');
        await productsPage.addProductToCart(0);

    });

    await test.step('Navigate to cart page', async () => {
        cartPage = await productsPage.clickViewCartFromModal();
    });

    await test.step('Verify product count is 1', async () => {
        expect(await cartPage.getProductCount()).toBe(1);

    });

    await test.step('Verify address & price Then checkout product', async () => {
        checkoutPage = await cartPage.clickProceedToCheckout();
        expect(await checkoutPage.getDeliveryAddressText()).toBeDefined();
        expect(await checkoutPage.getBillingAddressText()).toBeDefined();
        expect(await checkoutPage.isOrderTableVisible()).toBe(true);
        expect(await checkoutPage.getProductQuantity()).toBe('1');
        expect(await checkoutPage.getTotalAmount()).toBe('Rs. 400');
        await checkoutPage.enterComment('Please deliver between 9 AM to 5 PM.');
        await checkoutPage.clickPlaceOrder();
    });

    await test.step('Do payment with valid card details', async () => {
        paymentPage = new PaymentPage(page);
        await paymentPage.fillPaymentForm(
            'John Doe',
            '4242424242424242',
            '123',
            '12',
            '25'
        );
        orderPlacedPage = await paymentPage.clickPayButton();
    });

    await test.step('Verify order placed successfully', async () => {
        expect(await orderPlacedPage.validateOrderPlacedPage()).toBe(true);
    });

    await test.step('Verify invoice download', async () => {
        const downloadsDir = path.resolve(__dirname, '../../downloads');
        if (!fs.existsSync(downloadsDir)) {
            fs.mkdirSync(downloadsDir, { recursive: true });
        }

        const [download] = await Promise.all([
            page.waitForEvent('download'),
            orderPlacedPage.clickDownloadInvoice(),
        ]);

        const filePath = path.join(downloadsDir, download.suggestedFilename());
        await download.saveAs(filePath);
        const downloadPath = await download.path();
        expect(downloadPath).toBeDefined();
        expect(download.suggestedFilename()).toBe('invoice.txt');

        const content = await fs.promises.readFile(filePath, 'utf-8');

        expect(content).toContain('Hi asasa asasa, Your total purchase amount is 400. Thank you');

        // attaching file in html report
        await testInfo.attach('Downloaded Invoice', {
            path: downloadPath,
            contentType: 'text/plain',
        });
        fs.unlinkSync(downloadPath)

    });

});
