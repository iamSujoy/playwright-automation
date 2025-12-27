import { test, expect } from "@playwright/test";
import { HomePage } from "../../src/automation-exe/pages/homePage";
import { generateRegistrationProfile } from "../../src/automation-exe/testData/registrationProfiles.data";
import { VALID_LOGIN_USER, INVALID_EMAIL_LOGIN, INVALID_PASSWORD_LOGIN } from "../../src/automation-exe/testData/loginProfiles.data";

test.beforeEach(async ({ page }) => {
    await page.goto('https://automationexercise.com/');
});


test.skip('valid user registration', async ({ page }) => {
    const { accountInfo, addressInfo } = generateRegistrationProfile();
    let homePage = new HomePage(page);
    let loginPage = await homePage.navigateToLoginPage();

    await loginPage.enterSignupName(accountInfo.username);
    await loginPage.enterSignupEmail(accountInfo.username + '@example.com');
    let registrationPage = await loginPage.clickSignupButton();
    // if user male then select Mr else Mrs
    await registrationPage.selectTitleMr();
    await registrationPage.fillAccountInformation(
        accountInfo.username,
        accountInfo.password,
        accountInfo.day,
        accountInfo.month,
        accountInfo.year
    );
    await registrationPage.checkNewsletterSignup();
    await registrationPage.checkSpecialOffers();
    await registrationPage.fillAddressInformation(
        addressInfo.firstName,
        addressInfo.lastName,
        addressInfo.company,
        addressInfo.address,
        addressInfo.address2 ?? '',
        addressInfo.country,
        addressInfo.state,
        addressInfo.city,
        addressInfo.zipcode,
        addressInfo.mobileNumber
    );
    // check if email are prefilled correctly
    const emailValue = await registrationPage.getEmailValue();
    if (emailValue !== accountInfo.username + '@example.com') {
        throw new Error('Email is not prefilled correctly');
    }
    await registrationPage.clickCreateAccount();
    expect(await registrationPage.validateAccountCreation()).toBeTruthy();
    homePage = await registrationPage.clickContinue();
    // validate user is logged in and redirected to homepage
    expect(await homePage.validateLoggedInUser(accountInfo.username)).toBeTruthy();
});


test('valid user login with valid credentials and logout', async ({ page }) => {
    let homePage = new HomePage(page);
    let loginPage = await homePage.navigateToLoginPage();
    await loginPage.enterLoginEmail(VALID_LOGIN_USER.email);
    await loginPage.enterLoginPassword(VALID_LOGIN_USER.password);
    await loginPage.clickLoginButton();
    expect(await homePage.validateLoggedInUser(VALID_LOGIN_USER.username)).toBeTruthy();
    loginPage = await homePage.logout();
    expect(await loginPage.getTitle()).toBe('Automation Exercise - Signup / Login');
});


test('invalid user login with wrong email', async ({ page }) => {
    let homePage = new HomePage(page);
    let loginPage = await homePage.navigateToLoginPage();
    await loginPage.login(INVALID_EMAIL_LOGIN.email, INVALID_EMAIL_LOGIN.password);
    expect(await loginPage.validateInvalidLogin()).toBeTruthy();
});


test('invalid user login with wrong password', async ({ page }) => {
    let homePage = new HomePage(page);
    let loginPage = await homePage.navigateToLoginPage();
    await loginPage.login(INVALID_PASSWORD_LOGIN.email, INVALID_PASSWORD_LOGIN.password);
    expect(await loginPage.validateInvalidLogin()).toBeTruthy();
});
