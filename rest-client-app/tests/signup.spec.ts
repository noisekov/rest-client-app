import { test, expect } from '@playwright/test';

test.describe('SignUp page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/en/signup');
  });

  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle(/REST Client App/);
  });

  test('renders the sign up form correctly', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Sign Up', level: 2 })
    ).toBeVisible();
    await expect(page.getByLabel('Username')).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Log in' })).toBeVisible();
  });

  test('shows validation errors when fields are empty', async ({ page }) => {
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(
      page.getByText('Username must be at least 2 characters')
    ).toBeVisible();

    await expect(
      page.getByText(
        'Please enter a valid email address with at least 5 characters'
      )
    ).toBeVisible();

    await expect(
      page.getByText(
        'Must be at least 8 characters long, and include: one letter one number one special character'
      )
    ).toBeVisible();
  });

  test('shows error on invalid email and weak password', async ({ page }) => {
    await page.getByLabel('Username').fill('u');
    await page.getByLabel('Email').fill('invalid-email');
    await page.getByLabel('Password').fill('123');
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(
      page.getByText('This is your public display name')
    ).toBeVisible();

    await expect(
      page.getByText(
        'Please enter a valid email address with at least 5 characters'
      )
    ).toBeVisible();

    await expect(
      page.getByText(
        'Must be at least 8 characters long, and include: one letter one number one special character'
      )
    ).toBeVisible();
  });
});
