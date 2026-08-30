// ============================================================
//  src/components/SetorForm.jsx
//  Renderiza os campos específicos de um setor dinamicamente,
//  a partir da definição em data/setores.js
// ============================================================

import PropTypes from "prop-types";
import { s } from "../styles/theme";

export function SetorForm({ setor, valores, onChange }) {
  if (!setor) return null;

  function handleField(campoId, valor) {
    onChange({ ...valores, [campoId]: valor });
  }

  return (
    <div>
      {setor.campos.map((campo) => (
        <div key={campo.id} style={{ marginBottom: 14 }}>
          <label style={s.label}>
            {campo.label}
            {campo.unidade ? ` (${campo.unidade})` : ""}
          </label>

          {campo.tipo === "select" && (
            <select
              style={s.select}
              value={valores[campo.id] || ""}
              onChange={(e) => handleField(campo.id, e.target.value)}
            >
              <option value="">Selecione...</option>
              {campo.opcoes.map((op) => (
                <option key={op} value={op}>
                  {op}
                </option>
              ))}
            </select>
          )}

          {campo.tipo === "number" && (
            <input
              type="number"
              style={s.input}
              value={valores[campo.id] || ""}
              onChange={(e) => handleField(campo.id, e.target.value)}
              placeholder="0"
            />
          )}

          {campo.tipo === "text" && (
            <input
              type="text"
              style={s.input}
              value={valores[campo.id] || ""}
              onChange={(e) => handleField(campo.id, e.target.value)}
            />
          )}

          {campo.tipo === "textarea" && (
            <textarea
              style={{ ...s.input, minHeight: 80, resize: "vertical" }}
              value={valores[campo.id] || ""}
              onChange={(e) => handleField(campo.id, e.target.value)}
            />
          )}
        </div>
      ))}
    </div>
  );
}

SetorForm.propTypes = {
  setor: PropTypes.object,
  valores: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
