# PoupAí - Plataforma de Análise Financeira

O **PoupAí** é uma plataforma web moderna e intuitiva para gestão financeira pessoal. A aplicação oferece uma experiência completa para controle de despesas, análise de gastos por categoria, geração de relatórios e acompanhamento de indicadores financeiros em tempo real.

### 📸 Screenshots

![Dashboard Principal](https://i.imgur.com/cezLAfw.png)
_Dashboard principal com visão geral das finanças_

![Gestão de Despesas](https://i.imgur.com/yr0C1m5.png)
_Interface para adicionar e gerenciar despesas_

![Relatórios](https://i.imgur.com/upgRQMP.png)
_Geração de relatórios mensais e anuais_

![Categorias](https://i.imgur.com/6BnmM0x.png)
_Gestão de categorias personalizadas_

## ✨ Funcionalidades

### 💰 Gestão Financeira

- **Controle de Despesas e Receitas**: Adicione, edite e exclua transações
- **Categorização Inteligente**: Organize gastos por categorias personalizáveis

### 📊 Análise e Visualização

- **Dashboard Interativo**: Visão geral dos gastos com gráficos dinâmicos
- **Gráficos de Pizza**: Distribuição de gastos por categoria
- **Gráficos de Linha**: Evolução temporal das finanças
- **Estatísticas em Tempo Real**: Acompanhe saldo, receitas e despesas

### 📈 Relatórios

- **Relatórios Mensais**: Análise detalhada por mês
- **Relatórios Anuais**: Visão anual com comparativos mensais
- **Exportação CSV**: Baixe dados para análise externa
- **Exportação PDF**: Relatórios profissionais em PDF

### 🌐 Dados Externos

- **Cotações de Moedas**: USD, EUR, GBP, JPY em tempo real
- **Criptomoedas**: Bitcoin, Ethereum, Litecoin

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- API PoupAí rodando (backend)

## 🚀 Instalação

1. **Clone o repositório**

   ```bash
   git clone https://github.com/GabrielFeijo/poupai-frontend.git
   cd poupai-frontend
   ```

2. **Instale as dependências**

   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure as variáveis de ambiente**
   Crie um arquivo `.env` na raiz do projeto:

   ```env
   VITE_API_URL=http://localhost:3333
   ```

4. **Execute o projeto**

   ```bash
   npm run dev
   # ou
   yarn dev
   ```

5. **Acesse a aplicação**
   Abra seu navegador e acesse: `http://localhost:5173`

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes React reutilizáveis
│   ├── auth/           # Componentes de autenticação
│   ├── categories/     # Gestão de categorias
│   ├── dashboard/      # Dashboard e gráficos
│   ├── expenses/       # Gestão de despesas
│   ├── external/       # Dados externos (moedas, crypto)
│   ├── layout/         # Layout da aplicação
│   └── reports/        # Relatórios e exportação
├── hooks/              # Custom hooks
│   ├── auth/          # Hooks de autenticação
│   ├── categories/    # Hooks de categorias
│   ├── expenses/      # Hooks de despesas
│   ├── external/      # Hooks de dados externos
│   └── reports/       # Hooks de relatórios
├── lib/               # Utilitários e configurações
├── pages/             # Páginas da aplicação
├── services/          # Serviços de API
├── store/             # Estados globais (Zustand)
└── types/             # Definições de tipos TypeScript
```

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build
npm run build        # Gera build de produção
npm run preview      # Visualiza build de produção

# Qualidade de Código
npm run lint         # Executa ESLint
```

## 🛠️ Feito com

<div align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" width="40" height="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" width="40" height="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" width="40" height="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" width="40" height="40"/>
</div>
