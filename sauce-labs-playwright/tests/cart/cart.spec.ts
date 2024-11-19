import { test, expect } from '@playwright/test';

test.describe('Login Suite', () => {
    test('should add items to the cart successfully', async ({ page }) => {
        // Login with valid credentials
        await page.goto('https://www.saucedemo.com');
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');
      
        // Wait for inventory page
        await page.waitForSelector('.inventory_item');
      
        // Add two items to the cart
        await page.click('button[name="add-to-cart-sauce-labs-backpack"]');
        await page.click('button[name="add-to-cart-sauce-labs-bike-light"]');
      
        // Assert cart badge shows 2 items
        const cartBadge = await page.locator('.shopping_cart_badge').textContent();
        expect(cartBadge).toBe('2');
      });
      test('should remove an item from the cart', async ({ page }) => {
        // Login with valid credentials
        await page.goto('https://www.saucedemo.com');
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');
      
        // Add two items to the cart
        await page.click('button[name="add-to-cart-sauce-labs-backpack"]');
        await page.click('button[name="add-to-cart-sauce-labs-bike-light"]');
      
        // Go to the cart
        await page.click('.shopping_cart_link');
        await page.waitForSelector('.cart_item');
      
        // Remove one item
        await page.click('button[name="remove-sauce-labs-backpack"]');
      
        // Assert cart badge shows 1 item
        const cartBadge = await page.locator('.shopping_cart_badge').textContent();
        expect(cartBadge).toBe('1');
      });        
});