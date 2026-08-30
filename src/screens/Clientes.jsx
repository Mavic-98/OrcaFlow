// ============================================================
//  src/screens/Clientes.jsx
//  Cadastro e listagem de clientes: nome, contato, local
// ============================================================

import { useState } from "react";
import PropTypes from "prop-types";
import { s, colors } from "../styles/theme";
import { Avatar } from "../components/Avatar";
import { validateCliente } from "../utils/formatters";

export function Clientes({ clientes, onCriar, onExcluir }) {
  const [mostrarForm, setMostrarForm] = useState(false);
  const [form, setForm] = useState({ nome: "", contato: "", local: "" });
  const [erro, setErro] = useState("");

  function handleChange(campo, valor) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  }

  function handleSalvar() {
    const msgErro = validateCliente(form);
    if (msgErro) {
      setErro(msgErro);
      return;
    }
    onCriar(form);
    setForm({ nome: "", contato: "", local: "" });
    setErro("");
    setMostrarForm(false);
  }

  return (
    <div style={{ padding: "20px 16px 90px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ margin: 0, fontSize: 18 }}>Clientes</h2>
        <button style={{ ...s.btnGhost, width: "auto", padding: "8px 14px" }} onClick={() => setMostrarForm((v) => !v)}>
          {mostrarForm ? "Fechar" : "+ Novo"}
        </button>
      </div>

      {mostrarForm && (
        <div style={s.card}>
          <div style={{ marginBottom: 12 }}>
            <label style={s.label}>Nome do cliente</label>
            <input style={s.input} value={form.nome} onChange={(e) => handleChange("nome", e.target.value)} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={s.label}>Contato (telefone/WhatsApp)</label>
            <input style={s.input} value={form.contato} onChange={(e) => handleChange("contato", e.target.value)} />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={s.label}>Local / Endereço</label>
            <input style={s.input} value={form.local} onChange={(e) => handleChange("local", e.target.value)} />
          </div>
          {erro && <p style={{ color: colors.red, fontSize: 13, marginBottom: 12 }}>{erro}</p>}
          <button style={s.btnPrimary} onClick={handleSalvar}>Salvar cliente</button>
        </div>
      )}

      {clientes.length === 0 && !mostrarForm && (
        <p style={s.muted}>Nenhum cliente cadastrado ainda.</p>
      )}

      {clientes.map((c) => (
        <div key={c.id} style={{ ...s.cardFlat, display: "flex", alignItems: "center", gap: 12 }}>
          <Avatar nome={c.nome} size={38} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600 }}>{c.nome}</div>
            <div style={s.muted}>{c.contato}{c.local ? ` · ${c.local}` : ""}</div>
          </div>
          <button
            style={{ background: "none", border: "none", color: colors.red, cursor: "pointer", fontSize: 13 }}
            onClick={() => onExcluir(c.id)}
          >
            Excluir
          </button>
        </div>
      ))}
    </div>
  );
}

Clientes.propTypes = {
  clientes: PropTypes.array.isRequired,
  onCriar: PropTypes.func.isRequired,
  onExcluir: PropTypes.func.isRequired,
};
