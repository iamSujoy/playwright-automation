import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../base/basePage';
import { RegistrationPage } from './registerPage';

export class LoginPage extends BasePage {
    
    // Login form elements
    private loginEmail: Locator;
    private loginPassword: Locator;
    private loginButton: Locator;
    
    // Signup form elements
    private signupName: Locator;
    private signupEmail: Locator;
    private signupButton: Locator;

    private invalidLoginMessage: Locator = this.page.getByText('Your email or password is incorrect!');
    
    

    constructor(page: Page) {
        super(page);
        
        // Login form locators
        this.loginEmail = page.locator('[data-qa="login-email"]');
        this.loginPassword = page.locator('[data-qa="login-password"]');
        this.loginButton = page.locator('[data-qa="login-button"]');
        
        // Signup form locators
        this.signupName = page.locator('[data-qa="signup-name"]');
        this.signupEmail = page.locator('[data-qa="signup-email"]');
        this.signupButton = page.locator('[data-qa="signup-button"]');
        
    }

    // Login actions
    async enterLoginEmail(email: string): Promise<void> {
        await this.fillInput(this.loginEmail, email);
    }

    async enterLoginPassword(password: string): Promise<void> {
        await this.fillInput(this.loginPassword, password);
    }

    async clickLoginButton(): Promise<void> {
        await this.clickElement(this.loginButton);
    }

    async login(email: string, password: string): Promise<void> {
        await this.enterLoginEmail(email);
        await this.enterLoginPassword(password);
        await this.clickLoginButton();
    }

    // Signup actions
    async enterSignupName(name: string): Promise<void> {
        await this.fillInput(this.signupName, name);
    }

    async enterSignupEmail(email: string): Promise<void> {
        await this.fillInput(this.signupEmail, email);
    }

    async clickSignupButton(): Promise<RegistrationPage> {
        await this.clickElement(this.signupButton);
        return new RegistrationPage(this.page);
    }

    async signup(name: string, email: string): Promise<void> {
        await this.enterSignupName(name);
        await this.enterSignupEmail(email);
        await this.clickSignupButton();
    }

    async validateInvalidLogin(): Promise<boolean> {
        return await this.invalidLoginMessage.isVisible();
    }

}