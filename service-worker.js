const CACHE_NAME = 'rose-california-lottery-pro-v1.0';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil((async () => {
  const keys = await caches.keys();
  await Promise.all(keys.filter(k => k.startsWith('rose-california-lottery-pro-') && k !== CACHE_NAME).map(k => caches.delete(k)));
  await self.clients.claim();
})()));
