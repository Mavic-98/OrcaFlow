// ============================================================
//  src/screens/Login.jsx
//  Autenticação com Firebase (e-mail e senha)
// ============================================================

import { useState } from "react";
import PropTypes from "prop-types";
import { s, colors } from "../styles/theme";
import { loginUsuario } from "../services/authService";

export function Login({ onSuccess, onIrParaCadastro }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");

    if (!email || !senha) {
      setErro("Preencha e-mail e senha.");
      return;
    }

    setCarregando(true);
    try {
      await loginUsuario(email, senha);
      onSuccess();
    } catch (err) {
      setErro("E-mail ou senha inválidos.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div style={{ ...s.app, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 24px", minHeight: "100vh" }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>📐</div>
        <h1 style={{ color: colors.gold, fontSize: 26, margin: 0 }}>OrçaFlow</h1>
        <p style={s.muted}>Orçamentos por setor, sem complicação</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 14 }}>
          <label style={s.label}>E-mail</label>
          <input
            type="email"
            style={s.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seuemail@empresa.com"
          />
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={s.label}>Senha</label>
          <input
            type="password"
            style={s.input}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        {erro && <p style={{ color: colors.red, fontSize: 13, marginBottom: 12 }}>{erro}</p>}

        <button type="submit" style={s.btnPrimary} disabled={carregando}>
          {carregando ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <button style={{ ...s.btnGhost, marginTop: 12 }} onClick={onIrParaCadastro}>
        Criar conta
      </button>
    </div>
  );
}

Login.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onIrParaCadastro: PropTypes.func.isRequired,
};
