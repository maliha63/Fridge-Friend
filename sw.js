const CACHE_NAME = 'fridge-friend-v3';
const ASSETS = [
  './',
  './index.html',
  './favicon.svg',
  'https://cdn.tailwindcss.com',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  // For navigation requests (loading the page), try the network, then fall back to cache, then fall back to index.html
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match(event.request)
            .then((response) => {
                // If exact match found in cache, return it
                if (response) return response;
                // Otherwise return the cached index.html (SPA fallback)
                return caches.match('./index.html');
            });
        })
    );
    return;
  }

  // For other resources (images, css, js), try cache first, then network
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});
