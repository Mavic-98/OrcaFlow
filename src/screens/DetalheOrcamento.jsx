// ============================================================
//  src/screens/DetalheOrcamento.jsx
//  Exibe todos os dados de um orçamento e permite mudar status
// ============================================================

import PropTypes from "prop-types";
import { s, colors, setorColors } from "../styles/theme";
import { getSetorById } from "../data/setores";
import { formatBRL, formatDate } from "../utils/formatters";

export function DetalheOrcamento({ orcamento, onVoltar, onMudarStatus, onExcluir }) {
  const setor = getSetorById(orcamento.setorId);
  const cor = setorColors[orcamento.setorId] || setorColors.default;

  return (
    <div style={{ padding: "20px 16px 90px" }}>
      <button style={{ background: "none", border: "none", color: colors.muted, cursor: "pointer", marginBottom: 16 }} onClick={onVoltar}>
        ← Voltar
      </button>

      <div style={s.badge(cor)}>{setor?.icone} {setor?.nome}</div>

      <h2 style={{ margin: "12px 0 2px" }}>{orcamento.clienteNome}</h2>
      <p style={s.muted}>{orcamento.numero} · {formatDate(orcamento.criadoEm)}</p>

      <div style={{ ...s.card, marginTop: 16 }}>
        <div style={s.muted}>Valor total</div>
        <div style={{ fontSize: 26, fontWeight: 700, color: colors.gold }}>
          {formatBRL(orcamento.valorTotal)}
        </div>
      </div>

      <div style={s.card}>
        <div style={{ fontWeight: 700, marginBottom: 10 }}>Detalhes do serviço</div>
        {setor?.campos.map((campo) => (
          orcamento.dadosSetor?.[campo.id] ? (
            <div key={campo.id} style={{ marginBottom: 8 }}>
              <div style={s.muted}>{campo.label}</div>
              <div>{orcamento.dadosSetor[campo.id]}{campo.unidade ? ` ${campo.unidade}` : ""}</div>
            </div>
          ) : null
        ))}
      </div>

      <div style={{ marginTop: 16 }}>
        <label style={s.label}>Status</label>
        <select
          style={s.select}
          value={orcamento.status}
          onChange={(e) => onMudarStatus(orcamento.id, e.target.value)}
        >
          <option value="pendente">Pendente</option>
          <option value="aprovado">Aprovado</option>
          <option value="recusado">Recusado</option>
        </select>
      </div>

      <button style={{ ...s.btnDanger, marginTop: 20 }} onClick={() => onExcluir(orcamento.id)}>
        Excluir orçamento
      </button>
    </div>
  );
}

DetalheOrcamento.propTypes = {
  orcamento: PropTypes.object.isRequired,
  onVoltar: PropTypes.func.isRequired,
  onMudarStatus: PropTypes.func.isRequired,
  onExcluir: PropTypes.func.isRequired,
};
