/**
 * Minimal Service Worker for PWA Support
 * Handles basic installation and activation to meet PWA criteria.
 */

self.addEventListener('install', (event) => {
  console.log('SW installed');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('SW activated');
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Required for PWA installability in Chrome
});
