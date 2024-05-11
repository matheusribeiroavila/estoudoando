import { env } from './env';

const firebaseConfig = {
  apiKey: env.FIREBASE_API_KEY,
  appId: env.FIREBASE_APP_ID,
  projectId: env.FIREBASE_PROJECT_ID,
  authDomain: `${env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
  storageBucket: `${env.FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: env.FIREBASE_SENDER_ID,
};

export { firebaseConfig };
