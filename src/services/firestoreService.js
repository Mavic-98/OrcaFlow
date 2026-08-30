// ============================================================
//  src/services/firestoreService.js
//  CRUD de clientes e orçamentos no Firestore, sempre filtrado
//  pelo uid do usuário/empresa logada.
// ============================================================

import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/config";

// ── Clientes ─────────────────────────────────────────────────

export function escutarClientes(uid, callback) {
  const q = query(
    collection(db, "clientes"),
    where("uid", "==", uid),
    orderBy("criadoEm", "desc")
  );
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}

export async function criarCliente(uid, { nome, contato, local }) {
  return addDoc(collection(db, "clientes"), {
    uid,
    nome,
    contato,
    local: local || "",
    criadoEm: new Date().toISOString(),
  });
}

export async function excluirCliente(id) {
  return deleteDoc(doc(db, "clientes", id));
}

// ── Orçamentos ───────────────────────────────────────────────

export function escutarOrcamentos(uid, callback) {
  const q = query(
    collection(db, "orcamentos"),
    where("uid", "==", uid),
    orderBy("criadoEm", "desc")
  );
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}

/**
 * @param {string} uid
 * @param {{ numero, setorId, clienteId, clienteNome, valorTotal, status, dadosSetor }} orcamento
 */
export async function criarOrcamento(uid, orcamento) {
  return addDoc(collection(db, "orcamentos"), {
    uid,
    ...orcamento,
    status: orcamento.status || "pendente",
    criadoEm: new Date().toISOString(),
  });
}

export async function atualizarStatusOrcamento(id, status) {
  return updateDoc(doc(db, "orcamentos", id), { status });
}

export async function excluirOrcamento(id) {
  return deleteDoc(doc(db, "orcamentos", id));
}
