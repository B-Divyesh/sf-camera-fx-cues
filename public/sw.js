const CACHE = 'camera-fx-cues-__BUILD_ID__';
const routes = ['/', '/demo', '/camera', '/privacy', '/terms'];
const publicAssets = ['/assets/demoscene-hero.webp', '/favicon.svg'];
const buildAssets = ['__VITE_BUILD_ASSETS__'];
const embeddedAssets = '__VITE_EMBEDDED_ASSETS__';

async function installShell() {
  const response = await fetch('/', { cache: 'reload' });
  if (!response.ok) throw new Error('The app shell could not be downloaded.');
  const cache = await caches.open(CACHE);
  await cache.put('/', response);
  await cache.addAll([...routes.slice(1), ...publicAssets, ...buildAssets]);
}

self.addEventListener('install', event => event.waitUntil(installShell().then(() => self.skipWaiting())));
self.addEventListener('activate', event => event.waitUntil(
  caches.keys()
    .then(keys => Promise.all(keys.filter(key => key.startsWith('camera-fx-cues-') && key !== CACHE).map(key => caches.delete(key))))
    .then(() => self.clients.claim())
));
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).then(response => {
      if (response.ok) caches.open(CACHE).then(cache => cache.put(event.request, response.clone()));
      return response;
    }).catch(async () => (await caches.match(event.request)) || caches.match('/')));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached => {
    if (cached) return cached;
    const embedded = embeddedAssets[new URL(event.request.url).pathname];
    if (embedded) return new Response(embedded.body, { headers: { 'Content-Type': embedded.type, 'Cache-Control': 'public, max-age=31536000, immutable' } });
    return fetch(event.request).then(response => {
      if (response.ok) caches.open(CACHE).then(cache => cache.put(event.request, response.clone()));
      return response;
    });
  }));
});
