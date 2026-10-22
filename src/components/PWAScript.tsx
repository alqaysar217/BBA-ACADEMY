'use client';

import { useEffect } from 'react';

/**
 * PWAScript Component
 * Safely registers the Service Worker with error handling to prevent
 * "SecurityError: The operation is insecure" in non-secure or restricted environments.
 */
export function PWAScript() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      const registerSW = async () => {
        try {
          // Register the service worker from the public folder
          await navigator.serviceWorker.register('/sw.js');
        } catch (error) {
          // Silently fail in development if the origin is not secure
          // This prevents the "SecurityError" from crashing the app
          console.warn('Service Worker registration skipped or failed:', error);
        }
      };

      registerSW();
    }
  }, []);

  return null;
}
