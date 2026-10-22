// Simple Service Worker for PWA Compliance
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Pass-through for now, can be extended for offline caching
  event.respondWith(fetch(event.request));
});