import {test, expect} from "@playwright/test";
import { HomePage } from "../../src/automation-exe/pages/homePage";

test.beforeEach(async ({page}) => {
    await page.goto('https://automationexercise.com/');
});


test.skip('valid user registration', async ({ page }) => {
    let homePage = new HomePage(page);
    let loginPage = await homePage.navigateToLoginPage();

    await loginPage.enterSignupName('TestUser');
    await loginPage.enterSignupEmail('testuser1239871@example.com');
    let registrationPage = await loginPage.clickSignupButton();
    // if user male then select Mr else Mrs
    await registrationPage.selectTitleMr();
    await registrationPage.fillAccountInformation(
        'TestUser',
        'Password123',
        '10',
        'May',
        '1990'
    );
    await registrationPage.checkNewsletterSignup();
    await registrationPage.checkSpecialOffers();
    await registrationPage.fillAddressInformation(
        'TestUser',
        'Doe',
        "Acme Corporation",
        "123 Main Street",
        "Suite 456",
        "United States",
        "California",
        "Los Angeles",
        "90001",
        "4155551234"
    );
    // check if email are prefilled correctly
    const emailValue = await registrationPage.getEmailValue();
    if (emailValue !== 'testuser1239871@example.com') {
        throw new Error('Email is not prefilled correctly');
    }
    await registrationPage.clickCreateAccount();
    expect(await registrationPage.validateAccountCreation()).toBeTruthy();
    homePage = await registrationPage.clickContinue();
    // validate user is logged in and redirected to homepage
    expect(await homePage.validateLoggedInUser('TestUser')).toBeTruthy();
});


test('valid user login with valid credentials and logout', async ({ page }) => {
    let homePage = new HomePage(page);
    let loginPage = await homePage.navigateToLoginPage();
    await loginPage.enterLoginEmail('testuser123987@example.com');
    await loginPage.enterLoginPassword('Password123');
    await loginPage.clickLoginButton();
    expect(await homePage.validateLoggedInUser('TestUser')).toBeTruthy();
    loginPage = await homePage.logout();
    expect(await loginPage.getTitle()).toBe('Automation Exercise - Signup / Login');
});


test('invalid user login with wrong email', async ({ page }) => {
    let homePage = new HomePage(page);
    let loginPage = await homePage.navigateToLoginPage();
    await loginPage.login('non_existance98766123987@example.com', 'Password123');
    expect(await loginPage.validateInvalidLogin()).toBeTruthy();
});


test('invalid user login with wrong password', async ({ page }) => {
    let homePage = new HomePage(page);
    let loginPage = await homePage.navigateToLoginPage();
    await loginPage.login('testuser123987@example.com', 'Password124');
    expect(await loginPage.validateInvalidLogin()).toBeTruthy();
});
