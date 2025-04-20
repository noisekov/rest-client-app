import { test, expect } from '@playwright/test';

test.describe('Variables page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/en/variables');
    console.log(page.url());
  });

  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle(/REST Client App/);
  });
});
