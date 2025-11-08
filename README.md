# Projeto Site i9+ Baterias

![Status do Projeto](https://img.shields.io/badge/status-concluído-brightgreen)

Este repositório contém o código-fonte completo (Frontend e Backend) do site institucional desenvolvido para a empresa **i9+ Baterias**.

## 📖 Contexto do Projeto

Este projeto foi desenvolvido como parte da atividade de extensão "Tecnologia e Sociedade" da **Universidade Positivo**. O desafio proposto pela disciplina era identificar uma empresa ou organização real e apresentar uma proposta de solução tecnológica que gerasse valor e inovação.

A proposta desenvolvida por este grupo foi a criação de um site moderno e totalmente gerenciável para a i9+ Baterias, com foco em apresentar suas soluções de forma clara e permitir que a equipe da empresa tenha total autonomia para atualizar o conteúdo.

## ✨ Funcionalidades Principais

O projeto é dividido em duas partes principais: o site público (Frontend) e o painel de gerenciamento (Backend).

### 🚀 Site Público (Frontend)

* **Conteúdo 100% Dinâmico:** Todas as seções de conteúdo (Projetos, Soluções, Blog, Números de Impacto) são carregadas a partir da API.
* **Carrosséis Interativos:** Para Soluções, Projetos e Blog, com animações de carregamento (`loading spinner`).
* **Dashboard de Impacto:** Números (MWh, CO₂, etc.) que o admin pode atualizar dinamicamente.
* **Calculadoras Dinâmicas:** Duas calculadoras (Economia Simples e ROI) que buscam seus valores base (preços, pesos) do banco de dados.
* **Formulário de Contato:** Salva a mensagem no banco de dados e dispara um e-mail de notificação para o administrador (via Resend).
* **Créditos Ofuscados:** Um crédito de desenvolvedor fixo no canto da tela, com o link ofuscado (Base64) e renderizado via `useEffect` para dificultar a remoção.

### 🔒 Painel Administrativo (Backend)

* **Autenticação Segura:** Sistema de login com `express-session` e armazenamento de sessão no Supabase (PostgreSQL), corrigindo problemas de persistência em ambientes serverless.
* **Gerenciamento de Conteúdo (CRUD):** Páginas dedicadas para Criar, Ler, Atualizar e Deletar **Projetos**, **Artigos** e **Soluções**.
* **Editor de Texto Rico:** Uso do `SunEditor` para criar páginas de conteúdo com formatação, imagens e HTML.
* **Gerenciador de Mensagens:** Painel para visualizar e deletar as mensagens recebidas pelo formulário de contato.
* **Gerenciador de Usuários:** Permite criar novos administradores, listar os existentes e alterar a própria senha.
* **Configurações Gerais:** Uma página central para o admin:
    * Alterar o e-mail que recebe as notificações.
    * Enviar um e-mail de teste (Resend).
    * Atualizar os números do "Dashboard de Impacto".
    * Atualizar os valores base (preços, pesos, etc.) usados nas calculadoras.
* **Upload de Arquivos:** Integração direta com o **Supabase Storage** para upload de imagens de destaque.

## 🛠️ Tecnologias Utilizadas

* **Frontend:** React (Vite), React Router, `react-router-hash-link`, Swiper.js
* **Backend:** Node.js, Express.js
* **Banco de Dados:** PostgreSQL (via Supabase)
* **Armazenamento de Arquivos:** Supabase Storage
* **Envio de E-mail:** Resend (via SMTP e Nodemailer)
* **Autenticação:** `express-session` com `connect-pg-simple`
* **Hospedagem:** Vercel (Frontend e API Serverless)

## ⚙️ Como Rodar Localmente

Para rodar este projeto em sua máquina local, você precisará ter o Node.js e o Docker (para o banco de dados) instalados.

**1. Clone o Repositório**

git clone [https://github.com/teqqzz/i9mais.git](https://github.com/teqqzz/i9mais.git)
cd i9mais/i9maisbaterias

**2. Configure o Backend (API)**

* **Navegue até a pasta da API:** cd api

* **Instale as dependências:** npm install

* **Crie um arquivo .env dentro da pasta api (api/.env) e adicione suas chaves:**

# Conexão com o banco local (Docker ou Postgres local)
LOCAL_DATABASE_URL="postgresql://postgres:SUA_SENHA_DOCKER@localhost:5432/postgres"

# Chaves do Supabase (para upload de arquivos)
SUPABASE_URL="SUA_URL_SUPABASE"
SUPABASE_SERVICE_KEY="SUA_CHAVE_SERVICE_ROLE_SUPABASE"

# Chaves do Resend (para envio de e-mail)
EMAIL_HOST="smtp.resend.com"
EMAIL_PORT=465
EMAIL_USER="resend"
EMAIL_PASS="SUA_CHAVE_API_RESEND"

# Segurança
ADMIN_PASSWORD="sua_senha_admin_inicial"
SESSION_SECRET="seu_segredo_de_sessao_aleatorio"

**3. Configure o Frontend (React)**

* **Volte para a pasta raiz do projeto (cd ..).**

* **Instale as dependências:** npm install

* **Crie um arquivo .env na raiz (i9maisbaterias/.env) para o Vite:** *

VITE_API_URL=http://localhost:10000

**4. Execute a Aplicação (Dois Terminais)**

* **Terminal 1 (Backend):**

# A partir da raiz (i9maisbaterias), execute o servidor local da API

# Terminal 1 (Backend):
node api/index.js
(O servidor iniciará em http://localhost:10000)

# Terminal 2 (Frontend):

# A partir da raiz (i9maisbaterias), execute o Vite
npm run dev
(O site abrirá em http://localhost:5173)

**5. Crie o Administrador (Primeira Execução)**

Ao rodar o backend pela primeira vez, as tabelas serão criadas. Para criar o primeiro usuário admin, use o curl ou uma ferramenta de API 
* **para chamar a rota de setup (só funciona uma vez):**

curl -X POST http://localhost:10000/api/auth/setup-admin