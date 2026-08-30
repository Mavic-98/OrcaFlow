// ============================================================
//  src/context/AuthContext.jsx
//  Contexto global de autenticação — expõe o usuário logado e
//  o perfil (empresa) para toda a aplicação
// ============================================================

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { buscarPerfilUsuario } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [perfil, setPerfil] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const dadosPerfil = await buscarPerfilUsuario(firebaseUser.uid);
        setPerfil(dadosPerfil);
      } else {
        setPerfil(null);
      }
      setCarregando(false);
    });
    return unsub;
  }, []);

  return (
    <AuthContext.Provider value={{ user, perfil, setPerfil, carregando }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
