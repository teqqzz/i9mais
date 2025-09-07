import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import { initializeDatabase } from './db/db.js';

// Importa as rotas
import artigosRoutes from './routes/artigos.routes.js';
import authRoutes from './routes/auth.routes.js';
import projetosRoutes from './routes/projetos.routes.js';
import solucoesRoutes from './routes/solucoes.routes.js';
import contactRoutes from './routes/contact.routes.js';

// Configuração para usar __dirname com ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 10000;

// --- CONFIGURAÇÃO DE CORS ESPECÍFICA E FINAL ---
const whitelist = [
    'http://localhost:5173',      // Para seu desenvolvimento local
    'https://i9mais.vercel.app'  // A URL do seu projeto no Vercel
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};

app.use(cors(corsOptions));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- CORREÇÃO: Servir arquivos estáticos (uploads) de forma segura ---
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Rotas da API
app.use('/api/artigos', artigosRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/projetos', projetosRoutes);
app.use('/api/solucoes', solucoesRoutes);
app.use('/api/contact', contactRoutes);

// Inicialização do Servidor
(async () => {
    try {
        await initializeDatabase();
        console.log('Banco de dados inicializado e sincronizado.');
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta: ${PORT}`);
        });
    } catch (error) {
        console.error("Falha ao iniciar o servidor:", error);
        process.exit(1);
    }
})();

