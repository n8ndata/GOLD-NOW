importScripts('https://cdn.jsdelivr.net/npm/pwa-assets@1.0.0/service-worker-register.js');

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('go-now-cache-v1').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        '/icon-192.png',
        '/icon-512.png',
        '/fonts/OptimisticAI_VF_Optimized.woff2',
        '/fonts/OptimisticMono_W_TextRegular.woff2',
        '/js/tailwind.config.js',
        '/js/main.js'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});