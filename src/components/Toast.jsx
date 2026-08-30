// ============================================================
//  src/components/Toast.jsx
//  Notificação flutuante de feedback
// ============================================================

import PropTypes from "prop-types";
import { colors } from "../styles/theme";

export function Toast({ toast }) {
  if (!toast) return null;

  const bg = toast.type === "error" ? colors.red : colors.green;

  return (
    <div
      style={{
        position: "fixed",
        top: 16,
        left: "50%",
        transform: "translateX(-50%)",
        background: colors.surface2,
        border: `1px solid ${bg}`,
        color: colors.text,
        borderRadius: 12,
        padding: "12px 20px",
        fontSize: 14,
        fontWeight: 600,
        zIndex: 999,
        boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
        maxWidth: "90%",
      }}
    >
      {toast.message}
    </div>
  );
}

Toast.propTypes = {
  toast: PropTypes.shape({
    message: PropTypes.string,
    type: PropTypes.string,
  }),
};
