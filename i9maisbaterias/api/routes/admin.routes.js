import express from 'express';
import db from '../db/db.js';
import requireAuth from '../middleware/auth.js';
import { sendContactNotification } from '../utils/emailService.js';
import * as userModel from '../models/user.js';

const router = express.Router();
router.use(requireAuth);

// --- Rotas de Mensagens ---
router.get('/messages', async (req, res) => {
    const { rows } = await db.query('SELECT * FROM messages ORDER BY created_at DESC');
    res.json(rows);
});

router.delete('/messages/:id', async (req, res) => {
    await db.query('DELETE FROM messages WHERE id = $1', [req.params.id]);
    res.json({ success: true });
});

// --- Rotas de Configurações ---
router.get('/settings/contact-email', async (req, res) => {
    const { rows } = await db.query("SELECT value FROM settings WHERE key = 'contact_email'");
    res.json({ email: rows[0]?.value || '' });
});

router.put('/settings/contact-email', async (req, res) => {
    const { email } = req.body;
    await db.query(
        "INSERT INTO settings (key, value) VALUES ('contact_email', $1) ON CONFLICT (key) DO UPDATE SET value = $1",
        [email]
    );
    res.json({ success: true });
});

router.post('/settings/test-email', async (req, res) => {
    try {
        const { rows } = await db.query("SELECT value FROM settings WHERE key = 'contact_email'");
        const targetEmail = rows[0]?.value;

        if (!targetEmail) {
            return res.status(400).json({ error: 'Nenhum e-mail de destino configurado.' });
        }
        
        const testData = {
            name: 'Usuário Admin',
            email: 'admin@test.com',
            phone: 'N/A',
            message: 'Este é um e-mail de teste enviado a partir do Painel Admin.'
        };

        const sent = await sendContactNotification(targetEmail, testData);
        if (sent) {
            res.json({ success: true, message: `E-mail de teste enviado para ${targetEmail}` });
        } else {
            res.status(500).json({ error: 'Falha ao enviar e-mail de teste. Verifique as configurações de SMTP.' });
        }
    } catch (err) {
        console.error('Erro na rota de teste de email:', err);
        res.status(500).json({ error: 'Erro interno no servidor.' });
    }
});

// --- Rotas de Dados Dinâmicos ---
router.put('/impact-data', async (req, res) => {
    const { mwh, co2, minerals, cost } = req.body;
    try {
        await db.query('BEGIN');
        await db.query("UPDATE settings SET value = $1 WHERE key = 'impact_mwh'", [mwh]);
        await db.query("UPDATE settings SET value = $1 WHERE key = 'impact_co2'", [co2]);
        await db.query("UPDATE settings SET value = $1 WHERE key = 'impact_minerals'", [minerals]);
        await db.query("UPDATE settings SET value = $1 WHERE key = 'impact_cost'", [cost]);
        await db.query('COMMIT');
        res.json({ success: true });
    } catch (err) {
        await db.query('ROLLBACK');
        res.status(500).json({ error: 'Falha ao salvar os dados.' });
    }
});

router.put('/calculator-prices', async (req, res) => {
    const { nova, i9plus, peso_kg, vida_util_padrao, kg_co2_por_bateria } = req.body;
    try {
        await db.query('BEGIN');
        await db.query("UPDATE settings SET value = $1 WHERE key = 'calc_nova'", [nova]);
        await db.query("UPDATE settings SET value = $1 WHERE key = 'calc_i9plus'", [i9plus]);
        await db.query("UPDATE settings SET value = $1 WHERE key = 'calc_peso_kg'", [peso_kg]);
        await db.query("UPDATE settings SET value = $1 WHERE key = 'calc_vida_util_padrao'", [vida_util_padrao]);
        await db.query("UPDATE settings SET value = $1 WHERE key = 'calc_kg_co2_por_bateria'", [kg_co2_por_bateria]);
        await db.query('COMMIT');
        res.json({ success: true });
    } catch (err) {
        await db.query('ROLLBACK');
        res.status(500).json({ error: 'Falha ao salvar os dados.' });
    }
});

// --- Rotas de Gerenciamento de Usuários ---
router.get('/users', async (req, res) => {
    try {
        const users = await userModel.getAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

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

router.put('/users/change-password', async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.session.user.id;
    if (!currentPassword || !newPassword) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }
    try {
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