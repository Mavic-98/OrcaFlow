// ============================================================
//  src/App.jsx
//  Componente raiz — autenticação, estado global e roteamento
// ============================================================

import { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Toast } from "./components/Toast";
import { Navbar } from "./components/Navbar";
import { Login } from "./screens/Login";
import { Cadastro } from "./screens/Cadastro";
import { Inicio } from "./screens/Inicio";
import { Orcamentos } from "./screens/Orcamentos";
import { NovoOrcamento } from "./screens/NovoOrcamento";
import { DetalheOrcamento } from "./screens/DetalheOrcamento";
import { Clientes } from "./screens/Clientes";
import { Ajustes } from "./screens/Ajustes";
import { useToast } from "./hooks/useToast";
import {
  escutarClientes,
  escutarOrcamentos,
  criarCliente,
  excluirCliente,
  criarOrcamento,
  atualizarStatusOrcamento,
  excluirOrcamento,
} from "./services/firestoreService";
import { s } from "./styles/theme";

function AppInterno() {
  const { user, perfil, carregando } = useAuth();
  const { toast, showToast } = useToast();

  // ── Navegação ──────────────────────────────────────────────
  const [telaAuth, setTelaAuth] = useState("login"); // "login" | "cadastro"
  const [activeTab, setActiveTab] = useState("inicio");
  const [orcamentoSelecionado, setOrcamentoSelecionado] = useState(null);
  const [criandoOrcamento, setCriandoOrcamento] = useState(false);

  // ── Dados ──────────────────────────────────────────────────
  const [clientes, setClientes] = useState([]);
  const [orcamentos, setOrcamentos] = useState([]);

  useEffect(() => {
    if (!user) return;
    const unsubClientes = escutarClientes(user.uid, setClientes);
    const unsubOrcamentos = escutarOrcamentos(user.uid, setOrcamentos);
    return () => {
      unsubClientes();
      unsubOrcamentos();
    };
  }, [user]);

  if (carregando) {
    return <div style={s.app}>Carregando...</div>;
  }

  // ── Não autenticado ──────────────────────────────────────
  if (!user) {
    if (telaAuth === "cadastro") {
      return (
        <Cadastro
          onSuccess={() => showToast("Conta criada com sucesso!")}
          onVoltarLogin={() => setTelaAuth("login")}
        />
      );
    }
    return (
      <Login
        onSuccess={() => {}}
        onIrParaCadastro={() => setTelaAuth("cadastro")}
      />
    );
  }

  // ── Handlers ───────────────────────────────────────────────
  async function handleCriarCliente(dados) {
    try {
      await criarCliente(user.uid, dados);
      showToast("Cliente cadastrado!");
    } catch (err) {
      showToast("Erro ao cadastrar cliente.", "error");
    }
  }

  async function handleExcluirCliente(id) {
    try {
      await excluirCliente(id);
      showToast("Cliente removido.");
    } catch (err) {
      showToast("Erro ao remover cliente.", "error");
    }
  }

  async function handleSalvarOrcamento(dados) {
    try {
      await criarOrcamento(user.uid, dados);
      showToast("Orçamento criado!");
      setCriandoOrcamento(false);
      setActiveTab("orcamentos");
    } catch (err) {
      showToast("Erro ao criar orçamento.", "error");
    }
  }

  async function handleMudarStatus(id, status) {
    try {
      await atualizarStatusOrcamento(id, status);
      setOrcamentoSelecionado((prev) => (prev ? { ...prev, status } : prev));
      showToast("Status atualizado!");
    } catch (err) {
      showToast("Erro ao atualizar status.", "error");
    }
  }

  async function handleExcluirOrcamento(id) {
    try {
      await excluirOrcamento(id);
      setOrcamentoSelecionado(null);
      showToast("Orçamento excluído.");
    } catch (err) {
      showToast("Erro ao excluir orçamento.", "error");
    }
  }

  // ── Aplicativo autenticado ──────────────────────────────────
  return (
    <div style={s.app}>
      <Toast toast={toast} />

      {criandoOrcamento && (
        <NovoOrcamento
          clientes={clientes}
          onSalvar={handleSalvarOrcamento}
          onCancelar={() => setCriandoOrcamento(false)}
        />
      )}

      {!criandoOrcamento && orcamentoSelecionado && (
        <DetalheOrcamento
          orcamento={orcamentoSelecionado}
          onVoltar={() => setOrcamentoSelecionado(null)}
          onMudarStatus={handleMudarStatus}
          onExcluir={handleExcluirOrcamento}
        />
      )}

      {!criandoOrcamento && !orcamentoSelecionado && (
        <>
          {activeTab === "inicio" && (
            <Inicio
              perfil={perfil}
              orcamentos={orcamentos}
              onNovoOrcamento={() => setCriandoOrcamento(true)}
              onAbrirOrcamento={setOrcamentoSelecionado}
              onIrParaTab={setActiveTab}
            />
          )}

          {activeTab === "orcamentos" && (
            <Orcamentos
              orcamentos={orcamentos}
              onNovoOrcamento={() => setCriandoOrcamento(true)}
              onAbrirOrcamento={setOrcamentoSelecionado}
            />
          )}

          {activeTab === "clientes" && (
            <Clientes
              clientes={clientes}
              onCriar={handleCriarCliente}
              onExcluir={handleExcluirCliente}
            />
          )}

          {activeTab === "ajustes" && (
            <Ajustes perfil={perfil} onLogout={() => setActiveTab("inicio")} />
          )}
        </>
      )}

      {!criandoOrcamento && !orcamentoSelecionado && (
        <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppInterno />
    </AuthProvider>
  );
}
