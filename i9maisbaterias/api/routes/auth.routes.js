import express from 'express';
import { validatePassword, updatePassword, findByUsername, create, findById } from '../models/user.js';
import requireAuth from '../middleware/auth.js';
import db from '../db/db.js';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin';
const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await findByUsername(username);
        if (!user) return res.status(401).json({ error: 'Usuário ou senha incorreto(s)' });

        const valid = await validatePassword(user, password);
        if (!valid) return res.status(401).json({ error: 'Usuário ou senha incorreto(s)' });

        req.session.user = {
            id: user.id,
            username: user.username
        };
        
        req.session.userId = user.id;
        
        res.json({ success: true, user: req.session.user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/me', async (req, res) => {
    if (req.session && req.session.user) {
        const freshUser = await findById(req.session.user.id);
        if (freshUser) {
            return res.json({ isAuthenticated: true, user: freshUser });
        }
    }
    return res.json({ isAuthenticated: false, user: null });
});

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Falha ao fazer logout' });
        }
        res.clearCookie('connect.sid');
        res.json({ success: true });
    });
});


router.post('/alterar-senha', requireAuth, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: 'Tanto a senha atual quanto a nova são obrigatórias' });
        }
        const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [req.session.userId]);
        const user = rows[0];
        if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
        const valid = await validatePassword(user, currentPassword);
        if (!valid) {
            return res.status(401).json({ error: 'Senha atual incorreta' });
        }
        await updatePassword(user.id, newPassword);
        res.json({ success: true, message: 'Senha alterada com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/setup-admin', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT COUNT(*) as count FROM users');
        const userCount = parseInt(rows[0].count, 10);
        if (userCount > 0) {
            return res.status(403).json({ error: 'Conta admin já existe' });
        }
        const userId = await create({ username: 'admin', password: ADMIN_PASSWORD });
        res.json({ success: true, userId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;