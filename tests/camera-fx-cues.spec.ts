import { expect, test } from '@playwright/test';

test('@claim:sample-cues sample mode runs all six cues', async ({ page }) => {
  await page.goto('/demo');
  await expect(page.getByText('DEMO — SAMPLE DATA, NOTHING IS SAVED')).toBeVisible();
  for (const cue of ['Laser', 'Outline', 'Pixel burst', 'Freeze', 'Zoom', 'Shake']) {
    await page.getByRole('button', { name: new RegExp(cue) }).click();
    await expect(page.locator('#cue-readout')).toContainText(cue.toUpperCase());
  }
  await page.keyboard.press('1');
  await expect(page.locator('#cue-readout')).toHaveText('LASER');
});

test('@claim:local-video demo mode makes no cross-origin requests', async ({ page }) => {
  const remote: string[] = [];
  page.on('request', request => { if (new URL(request.url()).origin !== 'http://127.0.0.1:4173') remote.push(request.url()); });
  await page.goto('/demo');
  await page.getByRole('button', { name: /Pixel burst/ }).click();
  await expect(page.locator('#cue-readout')).toHaveText('PIXEL BURST');
  expect(remote).toEqual([]);
});

test('@claim:preset-save demo presets persist separately after reload', async ({ page }) => {
  await page.goto('/demo');
  await page.getByRole('button', { name: /Outline/ }).click();
  await page.getByLabel('Preset name').fill('Boss intro');
  await page.getByRole('button', { name: 'Save preset' }).click();
  await expect(page.getByText('Saved Boss intro on this device.')).toBeVisible();
  await page.reload();
  await expect(page.getByRole('button', { name: 'Boss intro Outline' })).toBeVisible();
  await expect(page.getByText('Outline', { exact: true }).last()).toBeVisible();
});

test('landing, legal routes and mobile layout have core landmarks', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page).toHaveTitle(/Trigger camera effects/);
  await expect(page.locator('main')).toBeVisible();
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.getByRole('link', { name: 'Try it with sample data' })).toBeVisible();
  await page.goto('/privacy');
  await expect(page).toHaveTitle('Privacy — Camera FX Cues');
  await expect(page.getByRole('heading', { name: 'Your camera stays on your device' })).toBeVisible();
});
