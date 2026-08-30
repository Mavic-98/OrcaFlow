// ============================================================
//  src/components/Navbar.jsx
//  Barra de navegação inferior (bottom navigation)
// ============================================================

import PropTypes from "prop-types";
import { colors, s } from "../styles/theme";

const TABS = [
  { id: "inicio", label: "Início", icon: "🏠" },
  { id: "orcamentos", label: "Orçamentos", icon: "📋" },
  { id: "clientes", label: "Clientes", icon: "👥" },
  { id: "ajustes", label: "Ajustes", icon: "⚙️" },
];

export function Navbar({ activeTab, onTabChange }) {
  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: 480,
        display: "flex",
        background: colors.surface,
        borderTop: `1px solid ${colors.border}`,
        zIndex: 10,
      }}
    >
      {TABS.map((tab) => (
        <button
          key={tab.id}
          style={s.navItem(activeTab === tab.id)}
          onClick={() => onTabChange(tab.id)}
        >
          <span style={{ fontSize: 18 }}>{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </nav>
  );
}

Navbar.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
};
