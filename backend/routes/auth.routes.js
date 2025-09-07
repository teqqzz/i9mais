import express from 'express'
import { validatePassword, updatePassword, findByUsername, create } from '../models/user.js'
import requireAuth from '../middleware/auth.js'
import db from '../db/db.js'

//senha do usuário admin
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin'
const router = express.Router();

// Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await findByUsername(username);
        if (!user) return res.status(401).json({ error: 'Usuário ou senha incorreto(s)' });

        const valid = await validatePassword(user, password);
        if (!valid) return res.status(401).json({ error: 'Usuário ou senha incorreto(s)' });

        req.session.userId = user.id;
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Checar Se Está Logado
router.get('/check-auth', (req, res) => {
    if (req.session.userId) {
        res.json({ isAuthenticated: true });
    } else {
        res.json({ isAuthenticated: false });
    }
});
// Logout
router.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.json({ success: true });
    });
});

// Alterar Senha
router.post('/alterar-senha', requireAuth, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: 'Tanto a senha atual quanto a nova são obrigatórias' })
        }

        // get logged-in user
        const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [req.session.userId])
        const user = rows[0]
        if (!user) return res.status(404).json({ error: 'Usuário não encontrado' })

        // verify current password
        const valid = await validatePassword(user, currentPassword)
        if (!valid) {
            return res.status(401).json({ error: 'Senha atual incorreta' })
        }

        // update to new password
        await updatePassword(user.id, newPassword)

        res.json({ success: true, message: 'Senha alterada com sucesso' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// Rota para criar o usuário admin na primeira vez
router.post('/setup-admin', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT COUNT(*) as count FROM users')
        if (rows[0].count > 0) {
            return res.status(403).json({ error: 'Conta admin já existe' })
        }

        const userId = await create({ username: 'admin', password: ADMIN_PASSWORD })

        res.json({ success: true, userId })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

export default router;
