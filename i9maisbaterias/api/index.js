import express from 'express';
import session from 'express-session';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

import { initializeDatabase } from './db/db.js'; 

// Importa as rotas
import artigosRoutes from './routes/artigos.routes.js';
import authRoutes from './routes/auth.routes.js';
import projetosRoutes from './routes/projetos.routes.js';
import solucoesRoutes from './routes/solucoes.routes.js';
import contactRoutes from './routes/contact.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// A inicialização do DB ainda é necessária.
// Na Vercel, isso rodará na "inicialização a frio" (cold start) da função,
// garantindo que seu DB no Supabase seja semeado (seed) na primeira vez.
// Como seu script usa "CREATE IF NOT EXISTS" e "ON CONFLICT DO NOTHING", ele é seguro para rodar múltiplas vezes.
await initializeDatabase();
console.log('Banco de dados inicializado e sincronizado.');


const whitelist = [
    'http://localhost:5173',
    'https://i9mais.vercel.app' 
];

const corsOptions = {
    origin: function (origin, callback) {
        // Permite requisições sem 'origin' (como apps mobile ou Postman) ou da whitelist
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

// Esta rota estática não funciona mais na Vercel, pois a pasta 'public' não existe no ambiente serverless.
// app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
// (Removemos ela pois as imagens agora virão do Supabase)

app.use(session({
    secret: process.env.SESSION_SECRET || 'admin',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 // 24 horas
    }
}));

// Rotas da API
app.use('/api/artigos', artigosRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/projetos', projetosRoutes);
app.use('/api/solucoes', solucoesRoutes);
app.use('/api/contact', contactRoutes);


export default app;