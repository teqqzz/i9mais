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

await initializeDatabase();
console.log('Banco de dados inicializado e sincronizado.');

const whitelist = [ 'http://localhost:5173', 'https://i9mais-five.vercel.app', 'https://inovemais.ind.br' ];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') {
    app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));
    console.log('Servindo arquivos estáticos de /public/uploads para desenvolvimento local.');
}

app.set('trust proxy', 1);

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
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    }
}));

// --- [CORREÇÃO] ORDEM DAS ROTAS ---
// Rotas mais específicas (com 3 partes, como /api/admin/...) devem vir primeiro.
app.use('/api/admin', adminRoutes);

// Rotas com 2 partes (como /api/artigos) vêm em seguida.
app.use('/api/artigos', artigosRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/projetos', projetosRoutes);
app.use('/api/solucoes', solucoesRoutes);
app.use('/api/contact', contactRoutes);

// A rota mais genérica ('/api') deve ser a ÚLTIMA.
app.use('/api', publicRoutes); 
// --- FIM DA CORREÇÃO ---

export default app;

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 10000;
  app.listen(PORT, () => {
    console.log(`\n[SERVIDOR LOCAL API] Rodando em http://localhost:${PORT}`);
  });
}