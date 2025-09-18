import express from 'express';
import db from '../db/db.js';
import requireAuth from '../middleware/auth.js';
import { sendContactNotification } from '../utils/emailService.js';

const router = express.Router();

// Aplica o middleware de autenticação a todas as rotas deste arquivo
router.use(requireAuth);

// --- Rotas de Mensagens ---

// Obter todas as mensagens
router.get('/messages', async (req, res) => {
    const { rows } = await db.query('SELECT * FROM messages ORDER BY created_at DESC');
    res.json(rows);
});

// Deletar uma mensagem
router.delete('/messages/:id', async (req, res) => {
    await db.query('DELETE FROM messages WHERE id = $1', [req.params.id]);
    res.json({ success: true });
});

// --- Rotas de Configurações ---

// Obter o e-mail de contato atual
router.get('/settings/contact-email', async (req, res) => {
    const { rows } = await db.query("SELECT value FROM settings WHERE key = 'contact_email'");
    res.json({ email: rows[0]?.value || '' });
});

// Atualizar o e-mail de contato
router.put('/settings/contact-email', async (req, res) => {
    const { email } = req.body;
    await db.query(
        "INSERT INTO settings (key, value) VALUES ('contact_email', $1) ON CONFLICT (key) DO UPDATE SET value = $1",
        [email]
    );
    res.json({ success: true });
});

// Enviar um e-mail de teste
router.post('/settings/test-email', async (req, res) => {
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
});


router.put('/impact-data', async (req, res) => {
    const { mwh, co2, minerals, cost } = req.body;
    
    try {
        // Usa transação para garantir que todos os updates funcionem ou nenhum
        await db.query('BEGIN');
        await db.query("UPDATE settings SET value = $1 WHERE key = 'impact_mwh'", [mwh]);
        await db.query("UPDATE settings SET value = $1 WHERE key = 'impact_co2'", [co2]);
        await db.query("UPDATE settings SET value = $1 WHERE key = 'impact_minerals'", [minerals]);
        await db.query("UPDATE settings SET value = $1 WHERE key = 'impact_cost'", [cost]);
        await db.query('COMMIT');

        res.json({ success: true });
    } catch (err) {
        await db.query('ROLLBACK');
        console.error("Erro ao atualizar dados de impacto:", err);
        res.status(500).json({ error: 'Falha ao salvar os dados.' });
    }
});


export default router;