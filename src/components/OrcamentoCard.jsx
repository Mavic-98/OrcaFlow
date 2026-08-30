// ============================================================
//  src/components/OrcamentoCard.jsx
//  Card resumido de um orçamento, usado nas listagens
// ============================================================

import PropTypes from "prop-types";
import { colors, s, setorColors } from "../styles/theme";
import { getSetorById } from "../data/setores";
import { formatBRL, formatDate } from "../utils/formatters";

const STATUS_LABEL = {
  pendente: "Pendente",
  aprovado: "Aprovado",
  recusado: "Recusado",
};

const STATUS_COLOR = {
  pendente: colors.gold,
  aprovado: colors.green,
  recusado: colors.red,
};

export function OrcamentoCard({ orcamento, onClick }) {
  const setor = getSetorById(orcamento.setorId);
  const cor = setorColors[orcamento.setorId] || setorColors.default;
  const corStatus = STATUS_COLOR[orcamento.status] || colors.muted;

  return (
    <div style={{ ...s.cardFlat, cursor: "pointer" }} onClick={onClick}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={s.badge(cor)}>
          {setor?.icone} {setor?.nome || "Setor"}
        </span>
        <span style={s.badge(corStatus)}>{STATUS_LABEL[orcamento.status] || orcamento.status}</span>
      </div>
      <div style={{ fontWeight: 700, fontSize: 15 }}>{orcamento.clienteNome}</div>
      <div style={s.muted}>{orcamento.numero} · {formatDate(orcamento.criadoEm)}</div>
      <div style={{ fontWeight: 700, fontSize: 18, marginTop: 6 }}>
        {formatBRL(orcamento.valorTotal)}
      </div>
    </div>
  );
}

OrcamentoCard.propTypes = {
  orcamento: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};
