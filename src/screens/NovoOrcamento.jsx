// ============================================================
//  src/screens/NovoOrcamento.jsx
//  Fluxo de criação de orçamento: setor → cliente → campos
//  específicos → valor total
// ============================================================

import { useState } from "react";
import PropTypes from "prop-types";
import { s, colors, setorColors } from "../styles/theme";
import { setores, getSetorById } from "../data/setores";
import { SetorForm } from "../components/SetorForm";
import { gerarNumeroOrcamento } from "../utils/formatters";

export function NovoOrcamento({ clientes, onSalvar, onCancelar }) {
  const [etapa, setEtapa] = useState(1); // 1: setor, 2: cliente + campos, 3: valor
  const [setorId, setSetorId] = useState(null);
  const [clienteId, setClienteId] = useState("");
  const [dadosSetor, setDadosSetor] = useState({});
  const [valorTotal, setValorTotal] = useState("");
  const [erro, setErro] = useState("");

  const setor = getSetorById(setorId);
  const cliente = clientes.find((c) => c.id === clienteId);

  function handleSelecionarSetor(id) {
    setSetorId(id);
    setDadosSetor({});
    setEtapa(2);
  }

  function handleAvancar() {
    if (!clienteId) {
      setErro("Selecione um cliente.");
      return;
    }
    setErro("");
    setEtapa(3);
  }

  function handleSalvar() {
    if (!valorTotal || Number(valorTotal) <= 0) {
      setErro("Informe um valor total válido.");
      return;
    }
    onSalvar({
      numero: gerarNumeroOrcamento(),
      setorId,
      clienteId,
      clienteNome: cliente?.nome || "",
      dadosSetor,
      valorTotal: Number(valorTotal),
    });
  }

  return (
    <div style={{ padding: "20px 16px 90px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ margin: 0, fontSize: 18 }}>Novo orçamento</h2>
        <button style={{ background: "none", border: "none", color: colors.muted, cursor: "pointer" }} onClick={onCancelar}>
          Cancelar
        </button>
      </div>

      {etapa === 1 && (
        <div>
          <p style={s.muted}>Escolha o setor do orçamento</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }}>
            {setores.map((s2) => (
              <button
                key={s2.id}
                onClick={() => handleSelecionarSetor(s2.id)}
                style={{
                  ...s.cardFlat,
                  cursor: "pointer",
                  textAlign: "center",
                  border: `1px solid ${setorColors[s2.id]}55`,
                }}
              >
                <div style={{ fontSize: 26 }}>{s2.icone}</div>
                <div style={{ marginTop: 6, fontWeight: 600 }}>{s2.nome}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {etapa === 2 && setor && (
        <div>
          <div style={s.badge(setorColors[setor.id])}>{setor.icone} {setor.nome}</div>

          <div style={{ marginTop: 16, marginBottom: 14 }}>
            <label style={s.label}>Cliente</label>
            <select style={s.select} value={clienteId} onChange={(e) => setClienteId(e.target.value)}>
              <option value="">Selecione um cliente...</option>
              {clientes.map((c) => (
                <option key={c.id} value={c.id}>{c.nome}</option>
              ))}
            </select>
            {clientes.length === 0 && (
              <p style={{ ...s.muted, marginTop: 6 }}>
                Nenhum cliente cadastrado ainda. Cadastre um cliente na aba "Clientes" antes de continuar.
              </p>
            )}
          </div>

          <SetorForm setor={setor} valores={dadosSetor} onChange={setDadosSetor} />

          {erro && <p style={{ color: colors.red, fontSize: 13, marginBottom: 12 }}>{erro}</p>}

          <div style={{ display: "flex", gap: 10 }}>
            <button style={s.btnGhost} onClick={() => setEtapa(1)}>Voltar</button>
            <button style={s.btnPrimary} onClick={handleAvancar}>Continuar</button>
          </div>
        </div>
      )}

      {etapa === 3 && (
        <div>
          <p style={s.muted}>Defina o valor total do orçamento para {cliente?.nome}</p>

          <div style={{ marginTop: 12, marginBottom: 20 }}>
            <label style={s.label}>Valor total (R$)</label>
            <input
              type="number"
              style={s.input}
              value={valorTotal}
              onChange={(e) => setValorTotal(e.target.value)}
              placeholder="0,00"
            />
          </div>

          {erro && <p style={{ color: colors.red, fontSize: 13, marginBottom: 12 }}>{erro}</p>}

          <div style={{ display: "flex", gap: 10 }}>
            <button style={s.btnGhost} onClick={() => setEtapa(2)}>Voltar</button>
            <button style={s.btnPrimary} onClick={handleSalvar}>Salvar orçamento</button>
          </div>
        </div>
      )}
    </div>
  );
}

NovoOrcamento.propTypes = {
  clientes: PropTypes.array.isRequired,
  onSalvar: PropTypes.func.isRequired,
  onCancelar: PropTypes.func.isRequired,
};
