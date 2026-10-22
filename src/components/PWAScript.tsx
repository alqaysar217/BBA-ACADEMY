'use client';

import { useEffect } from 'react';

/**
 * PWAScript Component
 * Registers the Service Worker to enable PWA installability.
 */
export function PWAScript() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      const registerSW = async () => {
        try {
          // Register sw.js from the public folder
          const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/',
          });
          console.log('SW registered successfully with scope:', registration.scope);
        } catch (error) {
          console.warn('Service Worker registration failed:', error);
        }
      };

      registerSW();
    }
  }, []);

  return null;
}