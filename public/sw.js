/**
 * Basic Service Worker for PWA requirements.
 * This is a minimal implementation to satisfy the "installable" criteria.
 */
const CACHE_NAME = 'bba-cache-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Respond with network-first or similar strategy if needed
  // For now, we just pass through to allow normal app behavior
  event.respondWith(fetch(event.request).catch(() => {
    return caches.match(event.request);
  }));
});
