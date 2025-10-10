import express from 'express';
import db from '../db/db.js';
import requireAuth from '../middleware/auth.js';
import { sendContactNotification } from '../utils/emailService.js';
import * as userModel from '../models/user.js';

const router = express.Router();
router.use(requireAuth);

// --- Rotas de Mensagens, Configurações, etc. (EXISTENTES) ---
// ... (seu código para /messages, /settings/*, /impact-data, /calculator-prices) ...

// --- [NOVO] ROTAS DE GERENCIAMENTO DE USUÁRIOS ---

// Listar todos os usuários
router.get('/users', async (req, res) => {
    try {
        const users = await userModel.getAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Criar um novo usuário
router.post('/users', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Nome de usuário e senha são obrigatórios.' });
    }
    try {
        const existingUser = await userModel.findByUsername(username);
        if (existingUser) {
            return res.status(409).json({ error: 'Este nome de usuário já existe.' });
        }
        const newUserId = await userModel.create({ username, password });
        res.status(201).json({ success: true, userId: newUserId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Deletar um usuário
router.delete('/users/:id', async (req, res) => {
    const userIdToDelete = parseInt(req.params.id, 10);
    const currentUserId = req.session.user.id;

    if (userIdToDelete === currentUserId) {
        return res.status(403).json({ error: 'Você não pode deletar a si mesmo.' });
    }
    try {
        await userModel.deleteById(userIdToDelete);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Alterar a própria senha (do usuário logado)
router.put('/users/change-password', async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.session.user.id;

    if (!currentPassword || !newPassword) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }
    try {
        // Busca o usuário completo (com hash da senha) para validação
        const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
        const user = rows[0];

        const valid = await userModel.validatePassword(user, currentPassword);
        if (!valid) {
            return res.status(401).json({ error: 'Senha atual incorreta.' });
        }
        await userModel.updatePassword(userId, newPassword);
        res.json({ success: true, message: 'Senha alterada com sucesso!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


export default router;