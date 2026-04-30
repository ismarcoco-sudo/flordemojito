import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
    // Configuración pendiente de variables de entorno, con fallbacks para compilación SSR
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDummyKeyForBuildsNotReal1234",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "dummy-project.firebaseapp.com",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "dummy-project",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "dummy-project.appspot.com",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:1234567890:web:1234567890",
};

// Evitar inicializaciones múltiples en desarrollo con Next.js
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

let auth: Auth | null = null;
let db: Firestore | null = null;

try {
    auth = getAuth(app);
    db = getFirestore(app);
} catch (error) {
    console.warn("Firebase warning: no se pudo inicializar Auth o Firestore correctamente", error);
}

// Exportamos de forma que la app pueda continuar incluso si auth/db es null temporalmente en SSR
export { app, auth, db };
