import express from 'express';
import session from 'express-session';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import pg from 'pg';
import connectPgSimple from 'connect-pg-simple';

dotenv.config();

import { initializeDatabase, pool } from './db/db.js';

import artigosRoutes from './routes/artigos.routes.js';
import authRoutes from './routes/auth.routes.js';
import projetosRoutes from './routes/projetos.routes.js';
import solucoesRoutes from './routes/solucoes.routes.js';
import contactRoutes from './routes/contact.routes.js';
import adminRoutes from './routes/admin.routes.js';
import publicRoutes from './routes/public.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// A inicialização do DB é segura para rodar sempre
await initializeDatabase();
console.log('Banco de dados inicializado e sincronizado.');

// --- CORREÇÃO 1: Whitelist do CORS ---
// Removida a barra '/' no final do domínio personalizado
const whitelist = [
    'http://localhost:5173',
    'https://i9mais-five.vercel.app',
    'https://inovemais.ind.br' // SEM a barra no final
];
const corsOptions = {
    origin: function (origin, callback) {
        // Permite requisições sem 'origin' (ex: Postman) ou da whitelist, ou em ambiente não-produção
        if (!origin || whitelist.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
            callback(null, true);
        } else {
            console.error(`CORS Bloqueado para Origin: ${origin}`); // Adiciona log para debug
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Essencial para cookies/sessões
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servidor estático apenas para dev local
if (process.env.NODE_ENV !== 'production') {
    app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));
    console.log('Servindo arquivos estáticos de /public/uploads para desenvolvimento local.');
}

// Confiar no proxy da Vercel
app.set('trust proxy', 1);

// Configuração do armazenamento de sessão no Postgres
const PgSession = connectPgSimple(session);

app.use(session({
    store: new PgSession({
        pool: pool,
        tableName: 'user_sessions',
        createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET || 'seu-segredo-super-secreto',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // true em produção (HTTPS)
        httpOnly: true, // O cookie não pode ser acessado via JS no browser
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias
        // --- CORREÇÃO 2: sameSite ---
        // 'none' é necessário para cookies seguros em produção cross-site/proxy
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    }
}));

// Registro das rotas da API
app.use('/api', publicRoutes); // Rotas como /api/impact-data
app.use('/api/artigos', artigosRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/projetos', projetosRoutes);
app.use('/api/solucoes', solucoesRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes); // Rotas como /api/admin/messages

// Exporta o app para a Vercel
export default app;

// Listener apenas para desenvolvimento local
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 10000;
  app.listen(PORT, () => {
    console.log(`\n[SERVIDOR LOCAL API] Rodando em http://localhost:${PORT}`);
  });
}