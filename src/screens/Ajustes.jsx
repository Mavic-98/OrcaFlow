// ============================================================
//  src/screens/Ajustes.jsx
//  Perfil da empresa/usuário e opção de logout
// ============================================================

import PropTypes from "prop-types";
import { s, colors } from "../styles/theme";
import { Avatar } from "../components/Avatar";
import { logoutUsuario } from "../services/authService";

export function Ajustes({ perfil, onLogout }) {
  async function handleLogout() {
    await logoutUsuario();
    onLogout();
  }

  return (
    <div style={{ padding: "20px 16px 90px" }}>
      <h2 style={{ margin: "0 0 16px", fontSize: 18 }}>Ajustes</h2>

      <div style={{ ...s.card, display: "flex", alignItems: "center", gap: 14 }}>
        <Avatar nome={perfil?.empresa || perfil?.nome} size={56} />
        <div>
          <div style={{ fontWeight: 700, fontSize: 16 }}>{perfil?.empresa}</div>
          <div style={s.muted}>{perfil?.nome}</div>
        </div>
      </div>

      <div style={s.card}>
        <InfoLinha label="E-mail" valor={perfil?.email} />
        <InfoLinha label="Contato" valor={perfil?.contato} />
        <InfoLinha label="Local" valor={perfil?.local} />
      </div>

      <button style={{ ...s.btnDanger, marginTop: 20 }} onClick={handleLogout}>
        Sair da conta
      </button>
    </div>
  );
}

function InfoLinha({ label, valor }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={s.muted}>{label}</div>
      <div>{valor || "—"}</div>
    </div>
  );
}

Ajustes.propTypes = {
  perfil: PropTypes.object,
  onLogout: PropTypes.func.isRequired,
};
