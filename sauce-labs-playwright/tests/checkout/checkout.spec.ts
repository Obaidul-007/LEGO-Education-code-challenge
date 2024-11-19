import { test, expect } from '@playwright/test';

test.describe('Login Suite', () => {
    test('should checkout successfully', async ({ page }) => {
        // Login with valid credentials
        await page.goto('https://www.saucedemo.com');
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');
      
        // Add an item to the cart
        await page.click('button[name="add-to-cart-sauce-labs-backpack"]');
      
        // Go to the cart
        await page.click('.shopping_cart_link');
        await page.waitForSelector('.cart_item');
      
        // Proceed to checkout
        await page.click('button[name="checkout"]');
        await page.fill('#first-name', 'John');
        await page.fill('#last-name', 'Doe');
        await page.fill('#postal-code', '12345');
        await page.click('input[name="continue"]');
      
        // Finish checkout
        await page.click('button[name="finish"]');
      
        // Assert checkout success message
        const successMessage = await page.locator('.complete-header').textContent();
        expect(successMessage?.trim().toLowerCase()).toBe('thank you for your order!');     
      });
      
});