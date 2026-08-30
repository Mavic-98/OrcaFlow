// ============================================================
//  src/services/authService.js
//  Funções de autenticação (login, cadastro, logout) usando
//  Firebase Authentication + perfil do usuário no Firestore
// ============================================================

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";

/**
 * Cria uma conta nova (Auth) + salva o perfil da empresa no Firestore.
 * @param {{ nome, empresa, local, contato, email, senha }} dados
 */
export async function cadastrarUsuario({ nome, empresa, local, contato, email, senha }) {
  const cred = await createUserWithEmailAndPassword(auth, email, senha);
  const uid = cred.user.uid;

  await setDoc(doc(db, "usuarios", uid), {
    nome,
    empresa,
    local,
    contato,
    email,
    criadoEm: new Date().toISOString(),
  });

  return uid;
}

export async function loginUsuario(email, senha) {
  const cred = await signInWithEmailAndPassword(auth, email, senha);
  return cred.user;
}

export async function logoutUsuario() {
  await signOut(auth);
}

export async function buscarPerfilUsuario(uid) {
  const snap = await getDoc(doc(db, "usuarios", uid));
  return snap.exists() ? snap.data() : null;
}
