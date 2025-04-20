import { test, expect } from '@playwright/test';

test.describe('History page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/en/history');
  });

  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle(/REST Client App/);
  });
});
