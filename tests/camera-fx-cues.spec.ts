import { expect, test, type BrowserContext, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFile } from 'node:fs/promises';

type QaState = {
  cameraCalls: number;
  recorderCalls: number;
  storageWrites: { key: string; value: string }[];
  track?: MediaStreamTrack;
};

async function instrumentMedia(page: Page) {
  await page.addInitScript(() => {
    const qa: QaState = { cameraCalls: 0, recorderCalls: 0, storageWrites: [] };
    Object.defineProperty(window, '__qa', { value: qa, configurable: true });
    const originalGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
    Object.defineProperty(navigator.mediaDevices, 'getUserMedia', {
      configurable: true,
      value: async (...args: Parameters<MediaDevices['getUserMedia']>) => {
        qa.cameraCalls++;
        const stream = await originalGetUserMedia(...args);
        qa.track = stream.getVideoTracks()[0];
        return stream;
      }
    });
    const OriginalMediaRecorder = window.MediaRecorder;
    Object.defineProperty(window, 'MediaRecorder', {
      configurable: true,
      value: class extends OriginalMediaRecorder {
        constructor(stream: MediaStream, options?: MediaRecorderOptions) {
          qa.recorderCalls++;
          super(stream, options);
        }
      }
    });
    const originalSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key: string, value: string) {
      qa.storageWrites.push({ key, value });
      return originalSetItem.call(this, key, value);
    };
  });
}

async function allowCamera(context: BrowserContext) {
  await context.grantPermissions(['camera'], { origin: 'http://127.0.0.1:4173' });
}

test('@claim:sample-cues sample mode renders all six effects', async ({ page }) => {
  await page.goto('/demo');
  await expect(page.getByText('DEMO — SAMPLE DATA, REAL PRESETS STAY SEPARATE')).toBeVisible();
  await page.getByRole('button', { name: /Laser/ }).click();
  await expect(page.locator('#stage')).toHaveClass(/is-laser/);
  await expect(page.locator('.laser-overlay')).toHaveCSS('opacity', '1');
  await page.waitForTimeout(550);
  await expect(page.locator('#cue-readout')).toHaveText('READY');
  await page.getByRole('button', { name: /Outline/ }).click();
  await expect(page.locator('#stage')).toHaveClass(/is-outline/);
  await expect.poll(() => page.locator('#camera-canvas').evaluate((canvas: HTMLCanvasElement) => {
    const pixels = canvas.getContext('2d')!.getImageData(0, 0, canvas.width, canvas.height).data;
    let transparent = 0;
    for (let index = 3; index < pixels.length; index += 4) if (pixels[index] === 0) transparent++;
    return transparent / (pixels.length / 4);
  })).toBeGreaterThan(0.6);
  await page.getByRole('button', { name: /Pixel burst/ }).click();
  await expect(page.locator('#stage')).toHaveClass(/is-pixel/);
  await expect.poll(() => page.locator('#camera-canvas').evaluate((canvas: HTMLCanvasElement) => {
    const pixels = canvas.getContext('2d')!.getImageData(0, 0, canvas.width, canvas.height).data;
    let amber = 0;
    for (let index = 0; index < pixels.length; index += 4) if (pixels[index] > 240 && pixels[index + 1] > 170 && pixels[index + 2] < 140) amber++;
    return amber;
  })).toBeGreaterThan(1000);
  await page.getByRole('button', { name: /Freeze/ }).click();
  const frozen = await page.locator('#camera-canvas').evaluate((canvas: HTMLCanvasElement) => canvas.toDataURL());
  await page.waitForTimeout(120);
  expect(await page.locator('#camera-canvas').evaluate((canvas: HTMLCanvasElement) => canvas.toDataURL())).toBe(frozen);
  await page.getByRole('button', { name: /Zoom/ }).click();
  await expect(page.locator('#stage')).toHaveCSS('animation-name', 'zoom');
  await page.waitForTimeout(470);
  await expect(page.locator('#cue-readout')).toHaveText('READY');
  await page.getByRole('button', { name: /Shake/ }).click();
  await expect(page.locator('#stage')).toHaveCSS('animation-name', 'shake');
  await page.waitForTimeout(530);
  await expect(page.locator('#cue-readout')).toHaveText('READY');
});

test('@claim:local-video camera stays local and its track stops on exit', async ({ context, page }) => {
  await allowCamera(context);
  await instrumentMedia(page);
  const remote: string[] = [];
  page.on('request', request => { if (new URL(request.url()).origin !== 'http://127.0.0.1:4173') remote.push(request.url()); });
  await page.goto('/');
  expect(await page.evaluate(() => (window as typeof window & { __qa: QaState }).__qa.cameraCalls)).toBe(0);
  await page.getByRole('button', { name: 'Use your camera' }).click();
  await expect(page.locator('#source-readout')).toHaveText('CAMERA LOCAL');
  expect(await page.locator('#camera-canvas').evaluate((canvas: HTMLCanvasElement) => canvas.getContext('2d')!.getImageData(0, 0, 24, 24).data.some(value => value > 0))).toBe(true);
  expect(remote).toEqual([]);
  expect(await page.evaluate(() => (window as typeof window & { __qa: QaState }).__qa.track?.readyState)).toBe('live');
  await page.getByRole('link', { name: 'Privacy' }).first().click();
  expect(await page.evaluate(() => (window as typeof window & { __qa: QaState }).__qa.track?.readyState)).toBe('ended');
});

test('@claim:preset-save demo presets use their namespace and survive reload', async ({ page }) => {
  await page.goto('/demo');
  await page.getByRole('button', { name: /Outline/ }).click();
  await page.getByLabel('Preset name').fill('Boss intro');
  await page.getByRole('button', { name: 'Save preset' }).click();
  await expect(page.getByText('Saved Boss intro on this device.')).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem('demo:camera-fx-cues:presets'))).toContain('Boss intro');
  await page.reload();
  await expect(page.getByRole('button', { name: 'Boss intro Outline' })).toBeVisible();
});

test('@claim:keyboard-cues number keys activate rendered cue states', async ({ page }) => {
  await page.goto('/demo');
  for (const [key, id] of [['1', 'laser'], ['2', 'outline'], ['3', 'pixel'], ['4', 'freeze'], ['5', 'zoom'], ['6', 'shake']]) {
    await page.keyboard.press(key);
    await expect(page.locator('#stage')).toHaveClass(new RegExp(`is-${id}`));
    await expect(page.locator(`[data-cue="${id}"]`)).toHaveAttribute('aria-pressed', 'true');
  }
});

test('@claim:no-account sample instrument starts without sign-in or payment', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Try it with sample data' }).click();
  await expect(page.locator('#source-readout')).toHaveText('SAMPLE SIGNAL');
  await page.getByRole('button', { name: /Outline/ }).click();
  await expect(page.locator('#stage')).toHaveClass(/is-outline/);
  await expect(page.locator('input[type="email"], input[type="password"], [href*="login"], [href*="checkout"]')).toHaveCount(0);
});

test('@claim:demo-isolation reset and real start remove only demo presets', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('camera-fx-cues:presets', '[{"name":"Real setup","cue":"laser"}]'));
  await page.goto('/demo');
  await expect(page.getByText('Real setup')).toHaveCount(0);
  const saveDemo = async (name: string) => {
    await page.getByLabel('Preset name').fill(name);
    await page.getByRole('button', { name: 'Save preset' }).click();
  };
  await saveDemo('Temporary one');
  await page.getByRole('button', { name: 'Reset demo' }).click();
  expect(await page.evaluate(() => localStorage.getItem('demo:camera-fx-cues:presets'))).toBeNull();
  expect(await page.evaluate(() => localStorage.getItem('camera-fx-cues:presets'))).toContain('Real setup');
  await saveDemo('Temporary two');
  await page.getByRole('button', { name: 'Start for real' }).click();
  expect(await page.evaluate(() => localStorage.getItem('demo:camera-fx-cues:presets'))).toBeNull();
  expect(await page.evaluate(() => localStorage.getItem('camera-fx-cues:presets'))).toContain('Real setup');
});

test('@claim:privacy-scope live flow records, stores, and sends no camera payload', async ({ context, page }) => {
  await allowCamera(context);
  await instrumentMedia(page);
  const remote: string[] = [];
  page.on('request', request => { if (new URL(request.url()).origin !== 'http://127.0.0.1:4173') remote.push(request.url()); });
  await page.goto('/camera');
  await expect(page.locator('#source-readout')).toHaveText('CAMERA LOCAL');
  for (const id of ['laser', 'outline', 'pixel', 'freeze', 'zoom', 'shake']) await page.locator(`[data-cue="${id}"]`).click();
  const qa = await page.evaluate(() => {
    const state = (window as typeof window & { __qa: QaState }).__qa;
    return { recorderCalls: state.recorderCalls, storageWrites: state.storageWrites };
  });
  expect(qa.recorderCalls).toBe(0);
  expect(qa.storageWrites.filter(write => /camera|video|blob|data:/i.test(write.value))).toEqual([]);
  expect(remote).toEqual([]);
  const thirdPartyScripts = await page.locator('script[src]').evaluateAll(nodes => nodes.map(node => new URL((node as HTMLScriptElement).src).origin).filter(origin => origin !== location.origin));
  expect(thirdPartyScripts).toEqual([]);
});

test('@claim:keyboard-operation Tab order, Enter, Escape, and route focus work', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).not.toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to controls' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Camera FX Cues home' })).toBeFocused();
  await page.getByRole('link', { name: 'Privacy' }).first().click();
  await expect(page.locator('h1')).toBeFocused();
  await page.goto('/demo');
  await page.locator('[data-cue="laser"]').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#stage')).toHaveClass(/is-laser/);
  await page.keyboard.press('Escape');
  await expect(page.locator('#cue-readout')).toHaveText('READY');
});

test('all visible controls meet 44 by 44 CSS pixel touch targets at 390px', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of ['/', '/demo']) {
    await page.goto(path);
    const small = await page.locator('a, button, input').evaluateAll(elements => elements.flatMap(element => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      if (style.display === 'none' || style.visibility === 'hidden' || rect.width === 0 || rect.height === 0) return [];
      return rect.width < 44 || rect.height < 44 ? [{ label: element.textContent?.trim() || element.getAttribute('aria-label'), width: rect.width, height: rect.height }] : [];
    }));
    expect(small).toEqual([]);
  }
});

test('@claim:reduced-motion warning is present and reduced motion removes movement', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Motion and light warning' })).toBeVisible();
  await page.getByRole('link', { name: 'Try it with sample data' }).click();
  await expect(page.getByRole('heading', { name: 'Motion and light warning' })).toBeVisible();
  await page.getByRole('button', { name: /Zoom/ }).click();
  await expect(page.locator('#stage')).toHaveCSS('animation-name', 'none');
});

test('bounded effects return to ready and clear pressed state', async ({ page }) => {
  await page.goto('/demo');
  for (const id of ['laser', 'pixel', 'zoom', 'shake']) {
    await page.locator(`[data-cue="${id}"]`).click();
    await expect(page.locator(`[data-cue="${id}"]`)).toHaveAttribute('aria-pressed', 'true');
    await page.waitForTimeout(550);
    await expect(page.locator('#cue-readout')).toHaveText('READY');
    await expect(page.locator(`[data-cue="${id}"]`)).toHaveAttribute('aria-pressed', 'false');
    await expect(page.locator('#stage')).not.toHaveClass(new RegExp(`is-${id}`));
  }
});

test('complete shell reloads offline after one visit', async ({ context, page }) => {
  await page.goto('/demo');
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
    if (!navigator.serviceWorker.controller) await new Promise<void>(resolve => navigator.serviceWorker.addEventListener('controllerchange', () => resolve(), { once: true }));
  });
  const cached = await page.evaluate(async () => (await caches.open((await caches.keys()).find(key => key.startsWith('camera-fx-cues-'))!)).keys().then(keys => keys.map(key => new URL(key.url).pathname)));
  expect(cached).toContain('/demo');
  const documentAssets = await page.locator('script[src], link[rel="stylesheet"]').evaluateAll(nodes => nodes.map(node => new URL(node.getAttribute('src') || node.getAttribute('href')!, location.href).pathname));
  expect(cached).toEqual(expect.arrayContaining(documentAssets));
  const failures: string[] = [];
  page.on('requestfailed', request => failures.push(`${new URL(request.url()).pathname}: ${request.failure()?.errorText}`));
  const session = await context.newCDPSession(page);
  await session.send('Network.clearBrowserCache');
  await context.setOffline(true);
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(250);
  expect(failures).toEqual([]);
  await expect(page.getByRole('heading', { name: 'Try all six camera cues' })).toBeVisible();
  await expect(page.getByText('DEMO — SAMPLE DATA, REAL PRESETS STAY SEPARATE')).toBeVisible();
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(8, 10, 24)');
  await context.setOffline(false);
});

test('SWA missing routes use a true 404 and the 404 page obeys CSP', async ({ page }) => {
  const config = JSON.parse(await readFile('public/staticwebapp.config.json', 'utf8'));
  expect(config.navigationFallback).toBeUndefined();
  expect(config.responseOverrides['404']).toEqual({ rewrite: '/404.html', statusCode: 404 });
  expect(config.routes.every((route: { rewrite?: string; statusCode?: number }) => !(route.rewrite && route.statusCode))).toBe(true);
  await page.goto('/404.html');
  await expect(page).toHaveTitle('Signal lost — Camera FX Cues');
  await expect(page.locator('style')).toHaveCount(0);
  await expect(page.locator('link[rel="stylesheet"]')).toHaveAttribute('href', '/404.css');
  await expect(page.locator('main')).toHaveCSS('background-color', 'rgb(20, 25, 54)');
});

test('principal routes have clean semantics, accessibility, and console', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('pageerror', error => errors.push(error.message));
  for (const path of ['/', '/demo', '/privacy', '/terms', '/404.html']) {
    await page.goto(path);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('main')).toHaveCount(1);
    await expect(page.locator('h1')).toHaveCount(1);
    const scan = await new AxeBuilder({ page }).analyze();
    expect(scan.violations.filter(item => ['serious', 'critical'].includes(item.impact || ''))).toEqual([]);
  }
  expect(errors).toEqual([]);
});
