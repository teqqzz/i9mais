import express from 'express';
import session from 'express-session';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import { initializeDatabase } from './db/db.js';

// Importa os módulos de rotas (controllers de endpoints específicos)
import blogPostRoutes from './routes/artigos.routes.js';
import authRoutes from './routes/auth.routes.js';
import projetoRoutes from './routes/projetos.routes.js';
import solucaoRoutes from './routes/solucoes.routes.js';
import contactRoutes from './routes/contact.routes.js';

// Configuração para usar __dirname com ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 10000;

const whitelist = [
    'http://localhost:5173', 
    'https://i9mais.vercel.app' 
];

const corsOptions = {
    origin: function (origin, callback) {
        // Permite requisições sem 'origin' (como Postman ou apps mobile) E requisições da whitelist
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

// Middleware nativo do Express para parsear request bodies em formato JSON
app.use(express.json());

// Middleware para servir arquivos estáticos (ex: imagens) da pasta 'public'
app.use(express.static('public'));

// Configuração do middleware de sessão (express-session)
app.use(session({
    secret: 'your_secret_key', 
    resave: false, 
    saveUninitialized: true, 
    cookie: { 
        secure: false 
    } 
}));

// === Registro das Rotas da API ===
// Todas as rotas de artigos serão prefixadas com /api/artigos
app.use('/api/artigos', blogPostRoutes);
// Rotas de autenticação (login, logout, status)
app.use('/api/auth', authRoutes);
// Rotas de projetos
app.use('/api/projetos', projetoRoutes);
// Rotas de soluções
app.use('/api/solucoes', solucaoRoutes);
// Rota de contato (formulário)
app.use('/api/contact', contactRoutes);

// === Função de Inicialização do Servidor ===
async function startServer() {
    try {
        await initializeDatabase();
        console.log('Banco de dados inicializado e sincronizado.');
        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("Falha ao iniciar o servidor (erro de conexão com DB?):", error);
        process.exit(1); 
    }
}

// Executa a função de inicialização
startServer();