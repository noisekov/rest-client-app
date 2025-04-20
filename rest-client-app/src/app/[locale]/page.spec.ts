import { test, expect } from '@playwright/test';

test.describe('main page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/en');
  });

  test('has title', async ({ page }) => {
    await expect(
      page.getByText('E-certificate after completion.')
    ).toBeVisible();
  });
});
