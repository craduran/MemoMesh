import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { resolve } from 'path';

export function initFirebase() {
  if (getApps().length > 0) return;

  if (process.env.NODE_ENV !== 'production') {
    initializeApp({
      credential: cert(resolve(__dirname, '../../serviceAccountKey.json')),
    });
  } else {
    // Cloud Functions environment — ADC handles credentials automatically
    initializeApp();
  }
}
