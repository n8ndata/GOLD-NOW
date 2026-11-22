// Service Worker สำหรับ PWA (ใช้เฉพาะเมื่อโฮสต์บน HTTPS หรือ localhost)
// ใช้ network-first strategy เพื่อให้ทำงานได้แม้ในสภาพเครือข่ายไม่ดี
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
        '/js/main.js'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // ถ้าไม่พบใน cache ให้โหลดจากแหล่งกำเนิดโดยตรง
      return response || fetch(event.request);
    })
  );
});