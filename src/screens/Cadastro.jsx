// ============================================================
//  src/screens/Cadastro.jsx
//  Cadastro de novo usuário/empresa: nome, empresa, local,
//  contato, e-mail e senha
// ============================================================

import { useState } from "react";
import PropTypes from "prop-types";
import { s, colors } from "../styles/theme";
import { cadastrarUsuario } from "../services/authService";
import { validateCadastro } from "../utils/formatters";

export function Cadastro({ onSuccess, onVoltarLogin }) {
  const [form, setForm] = useState({
    nome: "", empresa: "", local: "", contato: "", email: "", senha: "",
  });
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  function handleChange(campo, valor) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const msgErro = validateCadastro(form);
    if (msgErro) {
      setErro(msgErro);
      return;
    }

    setErro("");
    setCarregando(true);
    try {
      await cadastrarUsuario(form);
      onSuccess();
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setErro("Este e-mail já está cadastrado.");
      } else {
        setErro("Não foi possível criar a conta. Tente novamente.");
      }
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div style={{ ...s.app, padding: "40px 24px" }}>
      <h1 style={{ color: colors.gold, fontSize: 22, marginBottom: 4 }}>Criar conta</h1>
      <p style={{ ...s.muted, marginBottom: 24 }}>Cadastre sua empresa para começar a criar orçamentos</p>

      <form onSubmit={handleSubmit}>
        <Campo label="Nome completo" value={form.nome} onChange={(v) => handleChange("nome", v)} />
        <Campo label="Empresa" value={form.empresa} onChange={(v) => handleChange("empresa", v)} />
        <Campo label="Local / Cidade" value={form.local} onChange={(v) => handleChange("local", v)} />
        <Campo label="Contato (telefone/WhatsApp)" value={form.contato} onChange={(v) => handleChange("contato", v)} />
        <Campo label="E-mail" type="email" value={form.email} onChange={(v) => handleChange("email", v)} />
        <Campo label="Senha" type="password" value={form.senha} onChange={(v) => handleChange("senha", v)} />

        {erro && <p style={{ color: colors.red, fontSize: 13, marginBottom: 12 }}>{erro}</p>}

        <button type="submit" style={s.btnPrimary} disabled={carregando}>
          {carregando ? "Criando conta..." : "Criar conta"}
        </button>
      </form>

      <button style={{ ...s.btnGhost, marginTop: 12 }} onClick={onVoltarLogin}>
        Já tenho conta
      </button>
    </div>
  );
}

function Campo({ label, value, onChange, type = "text" }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={s.label}>{label}</label>
      <input type={type} style={s.input} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

Cadastro.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onVoltarLogin: PropTypes.func.isRequired,
};
