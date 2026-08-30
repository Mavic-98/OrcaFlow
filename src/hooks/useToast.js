// ============================================================
//  src/hooks/useToast.js
//  Hook personalizado de notificações temporárias (toast)
// ============================================================

import { useState, useCallback, useRef, useEffect } from "react";

export function useToast() {
  const [toast, setToast] = useState(null);
  const timerRef = useRef(null);

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type, id: Date.now() });
  }, []);

  useEffect(() => {
    if (!toast) return;
    timerRef.current = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timerRef.current);
  }, [toast]);

  return { toast, showToast };
}
