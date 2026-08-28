import { defineConfig } from 'vite';
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';

const serviceWorkerManifest = {
  name: 'service-worker-manifest',
  closeBundle() {
    const index = readFileSync('dist/index.html', 'utf8');
    const assets = [...index.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)].map(match => match[1]);
    const buildId = createHash('sha256').update(index).digest('hex').slice(0, 12);
    const embeddedAssets = Object.fromEntries(assets.map(asset => [asset, {
      body: readFileSync(`dist${asset}`, 'utf8'),
      type: asset.endsWith('.css') ? 'text/css; charset=utf-8' : 'text/javascript; charset=utf-8'
    }]));
    const workerPath = 'dist/sw.js';
    const worker = readFileSync(workerPath, 'utf8')
      .replace('__BUILD_ID__', buildId)
      .replace("'__VITE_BUILD_ASSETS__'", assets.map(asset => JSON.stringify(asset)).join(', '))
      .replace("'__VITE_EMBEDDED_ASSETS__'", JSON.stringify(embeddedAssets));
    writeFileSync(workerPath, worker);
  }
};

export default defineConfig({
  build: { target: 'es2022', sourcemap: false },
  server: { host: '0.0.0.0' },
  plugins: [serviceWorkerManifest]
});
