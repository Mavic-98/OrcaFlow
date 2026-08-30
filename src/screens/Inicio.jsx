// ============================================================
//  src/screens/Inicio.jsx
//  Dashboard: resumo de orçamentos, atalhos rápidos
// ============================================================

import PropTypes from "prop-types";
import { s, colors } from "../styles/theme";
import { Avatar } from "../components/Avatar";
import { OrcamentoCard } from "../components/OrcamentoCard";
import { formatBRL } from "../utils/formatters";

export function Inicio({ perfil, orcamentos, onNovoOrcamento, onAbrirOrcamento, onIrParaTab }) {
  const pendentes = orcamentos.filter((o) => o.status === "pendente");
  const aprovados = orcamentos.filter((o) => o.status === "aprovado");
  const totalAprovado = aprovados.reduce((acc, o) => acc + (Number(o.valorTotal) || 0), 0);
  const recentes = orcamentos.slice(0, 4);

  return (
    <div style={{ padding: "20px 16px 90px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <Avatar nome={perfil?.empresa || perfil?.nome} />
        <div>
          <div style={{ fontWeight: 700 }}>{perfil?.empresa || "Sua empresa"}</div>
          <div style={s.muted}>Olá, {perfil?.nome?.split(" ")[0] || "usuário"} 👋</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <div style={{ ...s.card, flex: 1, textAlign: "center" }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: colors.gold }}>{pendentes.length}</div>
          <div style={s.muted}>Pendentes</div>
        </div>
        <div style={{ ...s.card, flex: 1, textAlign: "center" }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: colors.green }}>{formatBRL(totalAprovado)}</div>
          <div style={s.muted}>Aprovado</div>
        </div>
      </div>

      <button style={{ ...s.btnPrimary, marginBottom: 24 }} onClick={onNovoOrcamento}>
        + Novo orçamento
      </button>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <h3 style={{ margin: 0, fontSize: 15 }}>Orçamentos recentes</h3>
        <button
          style={{ background: "none", border: "none", color: colors.goldDark, cursor: "pointer", fontSize: 13 }}
          onClick={() => onIrParaTab("orcamentos")}
        >
          Ver todos
        </button>
      </div>

      {recentes.length === 0 && (
        <p style={s.muted}>Nenhum orçamento ainda. Crie o primeiro clicando acima.</p>
      )}

      {recentes.map((o) => (
        <OrcamentoCard key={o.id} orcamento={o} onClick={() => onAbrirOrcamento(o)} />
      ))}
    </div>
  );
}

Inicio.propTypes = {
  perfil: PropTypes.object,
  orcamentos: PropTypes.array.isRequired,
  onNovoOrcamento: PropTypes.func.isRequired,
  onAbrirOrcamento: PropTypes.func.isRequired,
  onIrParaTab: PropTypes.func.isRequired,
};
