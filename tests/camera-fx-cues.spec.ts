import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

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

test('@claim:keyboard-cues each number key runs its named cue', async ({ page }) => {
  await page.goto('/demo');
  for (const [key, cue] of [['1', 'LASER'], ['2', 'OUTLINE'], ['3', 'PIXEL BURST'], ['4', 'FREEZE'], ['5', 'ZOOM'], ['6', 'SHAKE']]) {
    await page.keyboard.press(key);
    await expect(page.locator('#cue-readout')).toHaveText(cue);
  }
});

test('@claim:no-account landing starts without an account form', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('form')).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Try it with sample data' })).toBeVisible();
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

test('landing and demo have no serious or critical accessibility violations', async ({ page }) => {
  for (const path of ['/', '/demo']) {
    await page.goto(path);
    const scan = await new AxeBuilder({ page }).analyze();
    expect(scan.violations.filter(item => ['serious', 'critical'].includes(item.impact || ''))).toEqual([]);
  }
});
