const CACHE_NAME = 'travelbook-fiemme-v1.1-pwa';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './assets/hotel_erica_reale.png',
  './assets/montagna_animata_reale.png',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/maskable-icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(key => key !== CACHE_NAME ? caches.delete(key) : null))).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  // Meteo: network first, fallback to cached response when offline.
  if (url.hostname.includes('open-meteo.com')) {
    event.respondWith(
      fetch(request).then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        return response;
      }).catch(() => caches.match(request))
    );
    return;
  }

  // App files: cache first, then network.
  if (request.method === 'GET') {
    event.respondWith(
      caches.match(request).then(cached => cached || fetch(request).then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        return response;
      }).catch(() => caches.match('./index.html')))
    );
  }
});
