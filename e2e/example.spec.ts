import { expect, test } from '@playwright/test';

test('has correct title', async ({ page }) => {
	await page.goto('/'); // ← Now uses baseURL, so just '/'
	await expect(page).toHaveTitle('react-template');
});

test('renders hello world', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByText('Hello world')).toBeVisible();
});
