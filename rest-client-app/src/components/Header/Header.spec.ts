import { test, expect } from '@playwright/test';

test.describe('Header component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/en', { waitUntil: 'load' });
  });

  test('should contain text', async ({ page }) => {
    await expect(page.locator('header')).toContainText('EN');
  });
});
