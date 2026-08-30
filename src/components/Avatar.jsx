// ============================================================
//  src/components/Avatar.jsx
//  Ícone circular com iniciais do usuário/empresa
// ============================================================

import PropTypes from "prop-types";
import { colors } from "../styles/theme";

export function Avatar({ nome, size = 44 }) {
  const iniciais = (nome || "?")
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `linear-gradient(135deg, ${colors.goldDark}, ${colors.gold})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#1A1F2E",
        fontWeight: 700,
        fontSize: size * 0.4,
        flexShrink: 0,
      }}
    >
      {iniciais}
    </div>
  );
}

Avatar.propTypes = {
  nome: PropTypes.string,
  size: PropTypes.number,
};
