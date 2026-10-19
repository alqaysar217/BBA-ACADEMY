'use client';

import React, { ReactNode, useMemo } from 'react';
import { FirebaseProvider } from './provider';
import { initializeFirebase } from './index';

/**
 * FirebaseClientProvider
 * 
 * Provides the Firebase context to the client application.
 * It handles the idempotent initialization of Firebase services
 * on the client side to avoid server-side initialization errors.
 */
export function FirebaseClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  // Initialize Firebase once on the client
  const { firebaseApp, firestore, auth } = useMemo(() => initializeFirebase(), []);

  return (
    <FirebaseProvider
      firebaseApp={firebaseApp}
      firestore={firestore}
      auth={auth}
    >
      {children}
    </FirebaseProvider>
  );
}
