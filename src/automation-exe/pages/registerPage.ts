import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../base/basePage';
import { HomePage } from './homePage';

export class RegistrationPage extends BasePage {
    
    // Radio buttons
    private titleMrRadio: Locator;
    private titleMrsRadio: Locator;
    
    // Input fields
    private nameField: Locator;
    private emailField: Locator;
    private passwordField: Locator;
    private firstNameField: Locator;
    private lastNameField: Locator;
    private companyField: Locator;
    private addressField: Locator;
    private address2Field: Locator;
    private stateField: Locator;
    private cityField: Locator;
    private zipcodeField: Locator;
    private mobileNumberField: Locator;
    
    // Dropdowns
    private dayDropdown: Locator;
    private monthDropdown: Locator;
    private yearDropdown: Locator;
    private countryDropdown: Locator;
    
    // Checkboxes
    private newsletterCheckbox: Locator;
    private optinCheckbox: Locator;
    
    // Button
    private createAccountBtn: Locator;
    private continueBtn: Locator;

    private accountCreatedMessage: Locator = this.page.getByText('Congratulations! Your new account has been successfully created!');
    
    constructor(page: Page) {
        super(page)
        
        // Radio buttons
        this.titleMrRadio = page.locator('#id_gender1');
        this.titleMrsRadio = page.locator('#id_gender2');
        
        // Input fields
        this.nameField = page.locator('#name');
        this.emailField = page.locator('#email');
        this.passwordField = page.locator('#password');
        this.firstNameField = page.locator('#first_name');
        this.lastNameField = page.locator('#last_name');
        this.companyField = page.locator('#company');
        this.addressField = page.locator('#address1');
        this.address2Field = page.locator('#address2');
        this.stateField = page.locator('#state');
        this.cityField = page.locator('#city');
        this.zipcodeField = page.locator('#zipcode');
        this.mobileNumberField = page.locator('#mobile_number');
        
        // Dropdowns
        this.dayDropdown = page.locator('#days');
        this.monthDropdown = page.locator('#months');
        this.yearDropdown = page.locator('#years');
        this.countryDropdown = page.locator('#country');
        
        // Checkboxes
        this.newsletterCheckbox = page.locator('#newsletter');
        this.optinCheckbox = page.locator('#optin');
        
        // Button
        this.createAccountBtn = page.locator('[data-qa="create-account"]');
        this.continueBtn = page.locator('[data-qa="continue-button"]');

    }
    
    async selectTitleMr(): Promise<void> {
        await this.checkRadioButton(this.titleMrRadio);
    }
    
    async selectTitleMrs(): Promise<void> {
        await this.checkRadioButton(this.titleMrsRadio);
    }
    
    async enterName(name: string): Promise<void> {
        await this.fillInput(this.nameField, name);
    }
    
    async enterPassword(password: string): Promise<void> {
        await this.fillInput(this.passwordField, password);
    }
    
    async enterFirstName(firstName: string): Promise<void> {
        await this.fillInput(this.firstNameField, firstName);
    }
    
    async enterLastName(lastName: string): Promise<void> {
        await this.fillInput(this.lastNameField, lastName);
    }
    
    async enterCompany(company: string): Promise<void> {
        await this.fillInput(this.companyField, company);
    }
    
    async enterAddress(address: string): Promise<void> {
        await this.fillInput(this.addressField, address);
    }
    
    async enterAddress2(address2: string): Promise<void> {
        await this.fillInput(this.address2Field, address2);
    }
    
    async enterState(state: string): Promise<void> {
        await this.fillInput(this.stateField, state);
    }
    
    async enterCity(city: string): Promise<void> {
        await this.fillInput(this.cityField, city);
    }
    
    async enterZipcode(zipcode: string): Promise<void> {
        await this.fillInput(this.zipcodeField, zipcode);
    }
    
    async enterMobileNumber(mobileNumber: string): Promise<void> {
        await this.fillInput(this.mobileNumberField, mobileNumber);
    }
    
    async selectDay(day: string): Promise<void> {
        await this.selectDropdownByLabel(this.dayDropdown, day);
    }
    
    async selectMonth(month: string): Promise<void> {
        await this.selectDropdownByLabel(this.monthDropdown, month);
    }
    
    async selectYear(year: string): Promise<void> {
        await this.selectDropdownByLabel(this.yearDropdown, year);
    }
    
    async selectCountry(country: string): Promise<void> {
        await this.selectDropdownByLabel(this.countryDropdown, country);
    }
    
    async checkNewsletterSignup(): Promise<void> {
        await this.checkCheckbox(this.newsletterCheckbox);
    }
    
    async checkSpecialOffers(): Promise<void> {
        await this.checkCheckbox(this.optinCheckbox);
    }
    
    async clickCreateAccount(): Promise<void> {
        await this.clickElement(this.createAccountBtn);
    }
    
    async getEmailValue(): Promise<string> {
        return await this.getInputValue(this.emailField);
    }
    
    async getNameValue(): Promise<string> {
        return await this.getInputValue(this.nameField);
    }
    
    async isNewsletterChecked(): Promise<boolean> {
        return await this.isElementChecked(this.newsletterCheckbox);
    }
    
    async isOptinChecked(): Promise<boolean> {
        return await this.isElementChecked(this.optinCheckbox);
    }
    
    async isTitleMrSelected(): Promise<boolean> {
        return await this.isElementChecked(this.titleMrRadio);
    }
    
    async isTitleMrsSelected(): Promise<boolean> {
        return await this.isElementChecked(this.titleMrsRadio);
    }
    
    async fillAccountInformation(name: string, password: string, day: string, month: string, year: string): Promise<void> {
        await this.enterName(name);
        await this.enterPassword(password);
        await this.selectDay(day);
        await this.selectMonth(month);
        await this.selectYear(year);
    }
    
    async fillAddressInformation(firstName: string, lastName: string, company: string, address: string, address2: string, country: string, state: string, city: string, zipcode: string, mobileNumber: string): Promise<void> {
        await this.enterFirstName(firstName);
        await this.enterLastName(lastName);
        await this.enterCompany(company);
        await this.enterAddress(address);
        await this.enterAddress2(address2);
        await this.selectCountry(country);
        await this.enterState(state);
        await this.enterCity(city);
        await this.enterZipcode(zipcode);
        await this.enterMobileNumber(mobileNumber);
    }

    async validateAccountCreation(): Promise<boolean> {
        return await this.accountCreatedMessage.isVisible();
    }

    async clickContinue(): Promise<HomePage> {
        await this.clickElement(this.continueBtn);
        return new HomePage(this.page);
    }
}