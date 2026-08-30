# 📐 OrçaFlow — Orçamentos por Setor

Aplicativo web (responsivo, funciona bem também no celular) para criar e
gerenciar orçamentos de diferentes setores (Elétrico, Design, Hidráulico,
Pintura, Marcenaria, Reforma...), com login, cadastro de empresa e
gerenciamento de clientes.

Reaproveita a estrutura de pastas e a identidade visual (tema escuro +
dourado) do projeto `banco-app`, adaptando tudo para o contexto de
orçamentos.

---

## 📁 Estrutura de pastas

```
orcamento-app/
├── index.html
├── vite.config.js
├── package.json
├── capacitor.config.json          ← Configuração do app nativo (Android)
├── dist/                          ← Build de produção (gerado por `npm run build`)
├── android/                       ← Projeto Android nativo (gerado pelo Capacitor)
│
└── src/
    ├── main.jsx                    ← Inicializa o React na página
    ├── App.jsx                     ← Componente raiz: auth + roteamento
    │
    ├── firebase/
    │   └── config.js               ← ⚠️ Configure suas chaves do Firebase aqui
    │
    ├── context/
    │   └── AuthContext.jsx         ← Contexto global de autenticação
    │
    ├── services/
    │   ├── authService.js          ← Login, cadastro, logout (Firebase Auth)
    │   └── firestoreService.js     ← CRUD de clientes e orçamentos (Firestore)
    │
    ├── data/
    │   └── setores.js              ← Define os setores e seus campos dinâmicos
    │
    ├── utils/
    │   └── formatters.js           ← Formatação de moeda, datas, validações
    │
    ├── styles/
    │   └── theme.js                ← Tokens de design (cores, botões, inputs)
    │
    ├── hooks/
    │   └── useToast.js             ← Hook de notificações temporárias
    │
    ├── components/                 ← Blocos de UI reutilizáveis
    │   ├── Avatar.jsx
    │   ├── Toast.jsx
    │   ├── Navbar.jsx
    │   ├── SetorForm.jsx           ← Formulário dinâmico por setor
    │   └── OrcamentoCard.jsx
    │
    └── screens/                    ← Telas completas da aplicação
        ├── Login.jsx
        ├── Cadastro.jsx
        ├── Inicio.jsx              ← Dashboard
        ├── Orcamentos.jsx          ← Lista + filtro por setor
        ├── NovoOrcamento.jsx       ← Fluxo: setor → cliente → campos → valor
        ├── DetalheOrcamento.jsx
        ├── Clientes.jsx
        └── Ajustes.jsx
```

---

## 🔥 Configurando o Firebase (obrigatório antes de rodar)

1. Acesse [console.firebase.google.com](https://console.firebase.google.com) e crie um projeto novo (gratuito).
2. No menu lateral, vá em **Build → Authentication** → aba "Sign-in method" → ative **E-mail/senha**.
3. Vá em **Build → Firestore Database** → clique em "Criar banco de dados" → inicie em **modo de teste** (para desenvolvimento).
4. Vá em **Configurações do projeto** (ícone de engrenagem) → role até "Seus apps" → clique no ícone `</>` para criar um app Web.
5. Copie os valores gerados (`apiKey`, `authDomain`, `projectId`, etc.) e cole em `src/firebase/config.js`, substituindo os placeholders.

### Regras do Firestore (recomendado antes de ir para produção)

No Firestore, vá em "Regras" e use algo como:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /usuarios/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
    match /clientes/{id} {
      allow read, write: if request.auth != null && resource.data.uid == request.auth.uid;
      allow create: if request.auth != null && request.resource.data.uid == request.auth.uid;
    }
    match /orcamentos/{id} {
      allow read, write: if request.auth != null && resource.data.uid == request.auth.uid;
      allow create: if request.auth != null && request.resource.data.uid == request.auth.uid;
    }
  }
}
```

Isso garante que cada empresa só vê os próprios clientes e orçamentos.

---

## 🚀 Como executar

**Pré-requisito:** [Node.js 18+](https://nodejs.org)

```bash
# 1. Instalar as dependências
npm install

# 2. Iniciar em modo desenvolvimento
npm run dev

# 3. Abrir no navegador
# http://localhost:5173
```

O layout já é responsivo (largura máxima de 480px, centralizado), então
funciona bem tanto no navegador do computador quanto no celular.

---

## 📱 Rodando como app Android (Capacitor)

O projeto já vem com o [Capacitor](https://capacitorjs.com) configurado, o
que empacota o app web como um aplicativo Android nativo de verdade (não é
PWA — instala como `.apk`/`.aab` e tem ícone próprio, sem barra do navegador).

**Pré-requisitos:** [Android Studio](https://developer.android.com/studio) instalado (inclui o Android SDK).

```bash
# 1. Instalar as dependências (se ainda não tiver feito)
npm install

# 2. Gerar o build web mais recente
npm run build

# 3. Copiar o build para dentro do projeto Android
npx cap sync android

# 4. Abrir o projeto no Android Studio
npx cap open android
```

No Android Studio, espere o Gradle sincronizar e clique em **Run ▶️** com o
celular conectado (depuração USB ativada) ou um emulador aberto.

> ⚠️ **Sempre que alterar código em `src/`**, repita os passos 2 e 3
> (`npm run build` + `npx cap sync android`) antes de rodar de novo — o
> Android Studio usa o conteúdo de `dist/`, não o código-fonte diretamente.

O `appId` do app é `com.orcaflow.app` (definido em `capacitor.config.json`).
Pode ser alterado antes de publicar na Play Store, mas depois de gerado é
melhor não mudar (é o identificador único do app).

---

## ➕ Como adicionar um novo setor de orçamento

Não é preciso mexer em nenhuma tela. Basta abrir `src/data/setores.js` e
adicionar um novo objeto ao array `setores`, por exemplo:

```js
{
  id: "jardinagem",
  nome: "Jardinagem",
  icone: "🌿",
  campos: [
    { id: "tipoServico", label: "Tipo de serviço", tipo: "select", opcoes: ["Manutenção", "Paisagismo", "Poda"] },
    { id: "areaM2", label: "Área do jardim", tipo: "number", unidade: "m²" },
    { id: "observacoes", label: "Observações", tipo: "textarea" },
  ],
},
```

Tipos de campo suportados: `text`, `number`, `select` (precisa de `opcoes`), `textarea`.

---

## 📦 Dependências

| Pacote | Finalidade |
|---|---|
| `react` / `react-dom` | Biblioteca de interface |
| `firebase` | Autenticação e banco de dados (Firestore) |
| `prop-types` | Validação de props em desenvolvimento |
| `vite` *(dev)* | Servidor de desenvolvimento e build |
| `@capacitor/core`, `@capacitor/android`, `@capacitor/cli` *(dev)* | Empacotamento do app como Android nativo |
| `@capacitor/app`, `@capacitor/haptics`, `@capacitor/keyboard`, `@capacitor/status-bar` | Integrações nativas (botão voltar, vibração, teclado, barra de status) |

---

*Próximos passos sugeridos: gerar PDF do orçamento para enviar ao cliente, adicionar campo de assinatura/aprovação pelo próprio cliente via link, gerar ícone e splash screen personalizados para o app Android (`npx @capacitor/assets generate`).*# OrcaFlow
