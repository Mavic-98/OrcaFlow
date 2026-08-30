// ============================================================
//  src/screens/Orcamentos.jsx
//  Lista completa de orçamentos, com filtro por setor e status
// ============================================================

import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { s, colors } from "../styles/theme";
import { setores } from "../data/setores";
import { OrcamentoCard } from "../components/OrcamentoCard";

export function Orcamentos({ orcamentos, onNovoOrcamento, onAbrirOrcamento }) {
  const [filtroSetor, setFiltroSetor] = useState("todos");
  const scrollRef = useRef(null);
  const arrastando = useRef(false);
  const inicioX = useRef(0);
  const scrollInicio = useRef(0);
  const moveu = useRef(false);

  const filtrados =
    filtroSetor === "todos"
      ? orcamentos
      : orcamentos.filter((o) => o.setorId === filtroSetor);

  function onMouseDown(e) {
    arrastando.current = true;
    inicioX.current = e.clientX;
    scrollInicio.current = scrollRef.current.scrollLeft;
    moveu.current = false;
  }

  function onMouseMove(e) {
    if (!arrastando.current) return;
    e.preventDefault();
    const delta = e.clientX - inicioX.current;
    if (Math.abs(delta) > 3) moveu.current = true;
    scrollRef.current.scrollLeft = scrollInicio.current - delta;
  }

  function paraArrastar(e) {
    arrastando.current = false;
  }

  // Evita que o clique do chip dispare logo depois do arraste
  function onClickCapture(e) {
    if (moveu.current) {
      e.stopPropagation();
      e.preventDefault();
    }
  }

  return (
    <div style={{ padding: "20px 16px 90px" }}>
      <style>{`.filtro-scroll::-webkit-scrollbar { display: none; }, .filtro-scroll { scrollbar-width: none; -ms-overflow-style: none; }`}</style>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ margin: 0, fontSize: 18 }}>Orçamentos</h2>
        <button style={{ ...s.btnGhost, width: "auto", padding: "8px 14px" }} onClick={onNovoOrcamento}>
          + Novo
        </button>
      </div>

      <div ref={scrollRef} className="filtro-scroll" onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={paraArrastar} onMouseLeave={paraArrastar} onClickCapture={onClickCapture} style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 16, paddingBottom: 4 }}>
        <FiltroChip label="Todos" ativo={filtroSetor === "todos"} onClick={() => setFiltroSetor("todos")} />
        {setores.map((setor) => (
          <FiltroChip
            key={setor.id}
            label={`${setor.icone} ${setor.nome}`}
            ativo={filtroSetor === setor.id}
            onClick={() => setFiltroSetor(setor.id)}
          />
        ))}
      </div>

      {filtrados.length === 0 && <p style={s.muted}>Nenhum orçamento encontrado.</p>}

      {filtrados.map((o) => (
        <OrcamentoCard key={o.id} orcamento={o} onClick={() => onAbrirOrcamento(o)} />
      ))}
    </div>
  );
}

function FiltroChip({ label, ativo, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        whiteSpace: "nowrap",
        border: `1px solid ${ativo ? colors.gold : colors.border}`,
        background: ativo ? `${colors.gold}22` : "transparent",
        color: ativo ? colors.gold : colors.muted,
        borderRadius: 999,
        padding: "8px 14px",
        fontSize: 13,
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}

Orcamentos.propTypes = {
  orcamentos: PropTypes.array.isRequired,
  onNovoOrcamento: PropTypes.func.isRequired,
  onAbrirOrcamento: PropTypes.func.isRequired,
};
