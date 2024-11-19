import { test, expect } from '@playwright/test';

test.describe('Login Suite', () => {
  test('should login successfully with valid credentials', async ({ page }) => {
    // Navigate to the website
    await page.goto('https://www.saucedemo.com');

    // Wait for username field to appear
    await page.waitForSelector('#user-name', { state: 'visible' });

    // Fill in the login form
    await page.fill('#user-name', 'standard_user'); // Use ID for the username field
    await page.fill('#password', 'secret_sauce');   // Use ID for the password field

    // Click the login button
    await page.click('#login-button'); // Use ID for the login button

    // Assert successful navigation to the inventory page
    await expect(page).toHaveURL(/.*inventory/);
  });
  test('should not login with invalid credentials', async ({ page }) => {
    // Navigate to the website
    await page.goto('https://www.saucedemo.com');
  
    // Wait for username field to appear
    await page.waitForSelector('#user-name', { state: 'visible' });
  
    // Enter invalid credentials
    await page.fill('#user-name', 'invalid_user');
    await page.fill('#password', 'wrong_password');
  
    // Click the login button
    await page.click('#login-button');
  
    // Assert error message is displayed
    const errorMessage = await page.locator('.error-message-container').textContent();
    expect(errorMessage).toContain('Username and password do not match any user in this service');
  }); 
});
