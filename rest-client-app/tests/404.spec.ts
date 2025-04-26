import { test, expect } from '@playwright/test';

test.describe('404 page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/en/42');
  });

  test('has title', async ({ page }) => {
    await expect(
      page.getByText('Oops! This page doesn’t exist.')
    ).toBeVisible();
  });
});
