// ============================================================
//  src/firebase/config.js
//  Configuração do Firebase — SUBSTITUA pelos dados do SEU
//  projeto (Console Firebase → Configurações do projeto → Seus apps)
// ============================================================

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 👉 Substitua os valores abaixo pelos do seu projeto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAymFnWCbefGJh33_RnnUBgbXYxdzS4fOI",
  authDomain: "orcaflow-3cf27.firebaseapp.com",
  projectId: "orcaflow-3cf27",
  storageBucket: "orcaflow-3cf27.firebasestorage.app",
  messagingSenderId: "160807735604",
  appId: "1:160807735604:web:3e521f1d109fa10ac5d561",
  measurementId: "G-F1CBM58KHG"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
