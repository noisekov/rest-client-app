import { test, expect } from '@playwright/test';

test.describe('Footer component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/en', { waitUntil: 'load' });
  });

  test('should contain copyright', async ({ page }) => {
    await expect(page.locator('footer')).toContainText(
      'REST Client App © 2025'
    );
  });
});
