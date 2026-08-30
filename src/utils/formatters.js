// ============================================================
//  src/utils/formatters.js
//  Funções puras: formatação de moeda, datas e validações
// ============================================================

/** Formata um número como moeda brasileira (R$ 1.234,56) */
export function formatBRL(value) {
  const n = Number(value) || 0;
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

/** Retorna a data de hoje formatada como dd/mm/aaaa */
export function todayFormatted() {
  return new Date().toLocaleDateString("pt-BR");
}

/** Formata uma data ISO para dd/mm/aaaa */
export function formatDate(isoString) {
  if (!isoString) return "";
  return new Date(isoString).toLocaleDateString("pt-BR");
}

/** Validação simples de e-mail */
export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Validação de campos obrigatórios de cadastro de usuário */
export function validateCadastro({ nome, empresa, email, senha }) {
  if (!nome || nome.trim().length < 2) return "Informe seu nome completo.";
  if (!empresa || empresa.trim().length < 2) return "Informe o nome da empresa.";
  if (!validateEmail(email)) return "Informe um e-mail válido.";
  if (!senha || senha.length < 6) return "A senha deve ter pelo menos 6 caracteres.";
  return null;
}

/** Validação de cadastro de cliente */
export function validateCliente({ nome, contato }) {
  if (!nome || nome.trim().length < 2) return "Informe o nome do cliente.";
  if (!contato || contato.trim().length < 8) return "Informe um contato válido.";
  return null;
}

/** Gera um número de protocolo/orçamento simples baseado em timestamp */
export function gerarNumeroOrcamento() {
  const ts = Date.now().toString().slice(-6);
  return `ORC-${ts}`;
}
