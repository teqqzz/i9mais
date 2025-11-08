import express from 'express';
import db from '../db/db.js';
import requireAuth from '../middleware/auth.js';
import { sendContactNotification } from '../utils/emailService.js';
import * as userModel from '../models/user.js';
import path from 'path';
import { slugify } from '../utils/slugify.js';
import upload from '../middleware/uploads.js';
import { supabaseAdmin } from '../db/supabaseClient.js';

const router = express.Router();
const SUPABASE_BUCKET = 'uploads';
router.use(requireAuth);

async function handleUpload(file) {
    if (!file) return null;
    const fileName = `${Date.now()}-${slugify(path.parse(file.originalname).name)}${path.extname(file.originalname)}`;
    const { data, error } = await supabaseAdmin.storage
        .from(SUPABASE_BUCKET)
        .upload(fileName, file.buffer, { contentType: file.mimetype, cacheControl: '3600' });
    if (error) throw new Error(`Falha no upload para o Supabase: ${error.message}`);
    const { data: urlData } = supabaseAdmin.storage.from(SUPABASE_BUCKET).getPublicUrl(fileName);
    return urlData.publicUrl;
}

// --- Rotas de Mensagens, Configurações, Usuários, etc. (EXISTENTES) ---
router.get('/messages', async (req, res) => {
    const { rows } = await db.query('SELECT * FROM messages ORDER BY created_at DESC');
    res.json(rows);
});
router.delete('/messages/:id', async (req, res) => {
    await db.query('DELETE FROM messages WHERE id = $1', [req.params.id]);
    res.json({ success: true });
});
router.get('/settings/contact-email', async (req, res) => {
    const { rows } = await db.query("SELECT value FROM settings WHERE key = 'contact_email'");
    res.json({ email: rows[0]?.value || '' });
});
router.put('/settings/contact-email', async (req, res) => {
    const { email } = req.body;
    await db.query("INSERT INTO settings (key, value) VALUES ('contact_email', $1) ON CONFLICT (key) DO UPDATE SET value = $1", [email]);
    res.json({ success: true });
});
router.post('/settings/test-email', async (req, res) => {
    try {
        const { rows } = await db.query("SELECT value FROM settings WHERE key = 'contact_email'");
        const targetEmail = rows[0]?.value;
        if (!targetEmail) { return res.status(400).json({ error: 'Nenhum e-mail de destino configurado.' }); }
        const testData = { name: 'Sistema i9+ Baterias', email: 'nao-responda@i9mais.com', phone: 'N/A', message: 'Este é um e-mail de verificação para confirmar que as notificações de contato estão funcionando corretamente.' };
        const sent = await sendContactNotification(targetEmail, testData);
        if (sent) {
            res.json({ success: true, message: `E-mail de teste enviado para ${targetEmail}` });
        } else {
            res.status(500).json({ error: 'Falha ao enviar e-mail de teste. Verifique as configurações de SMTP.' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Erro interno no servidor.' });
    }
});
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
    if (!username || !password) { return res.status(400).json({ error: 'Nome de usuário e senha são obrigatórios.' }); }
    try {
        const existingUser = await userModel.findByUsername(username);
        if (existingUser) { return res.status(409).json({ error: 'Este nome de usuário já existe.' }); }
        const newUserId = await userModel.create({ username, password });
        res.status(201).json({ success: true, userId: newUserId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.delete('/users/:id', async (req, res) => {
    const userIdToDelete = parseInt(req.params.id, 10);
    const currentUserId = req.session.user.id;
    if (userIdToDelete === currentUserId) { return res.status(403).json({ error: 'Você não pode deletar a si mesmo.' }); }
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
    if (!currentPassword || !newPassword) { return res.status(400).json({ error: 'Todos os campos são obrigatórios.' }); }
    try {
        const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
        const user = rows[0];
        const valid = await userModel.validatePassword(user, currentPassword);
        if (!valid) { return res.status(401).json({ error: 'Senha atual incorreta.' }); }
        await userModel.updatePassword(userId, newPassword);
        res.json({ success: true, message: 'Senha alterada com sucesso!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.get('/page/about-us', async (req, res) => {
    const { rows } = await db.query("SELECT value FROM settings WHERE key = 'page_about_us'");
    res.json({ content: rows[0]?.value || '' });
});
router.put('/page/about-us', async (req, res) => {
    const { content } = req.body;
    try {
        await db.query("UPDATE settings SET value = $1 WHERE key = 'page_about_us'", [content]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Falha ao salvar a página.' });
    }
});
router.get('/page/home', async (req, res) => {
    try {
        const { rows } = await db.query("SELECT value FROM settings WHERE key = 'page_home_content'");
        const contentObject = JSON.parse(rows[0].value);
        res.json(contentObject);
    } catch (err) {
        res.status(500).json({ error: 'Falha ao carregar dados da página inicial.' });
    }
});
router.put('/page/home', upload.single('heroImage'), async (req, res) => {
    try {
        let heroImageUrl = req.body.heroImageUrl;
        if (req.file) {
            heroImageUrl = await handleUpload(req.file);
        }
        const content = {
            heroTitle: req.body.heroTitle, heroSubtitle: req.body.heroSubtitle,
            approach1Title: req.body.approach1Title, approach1Text: req.body.approach1Text,
            approach2Title: req.body.approach2Title, approach2Text: req.body.approach2Text,
            approach3Title: req.body.approach3Title, approach3Text: req.body.approach3Text,
            footerAbout: req.body.footerAbout, footerContactEmail: req.body.footerContactEmail,
            footerContactAddress: req.body.footerContactAddress, heroImageUrl: heroImageUrl
        };
        const contentJson = JSON.stringify(content);
        await db.query("UPDATE settings SET value = $1 WHERE key = 'page_home_content'", [contentJson]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Falha ao salvar a página inicial.' });
    }
});

// --- [AJUSTADO] ROTAS DE GERENCIAMENTO DO LAYOUT DA HOME ---

// Lista TODAS as seções para o painel de admin, incluindo o edit_path
router.get('/home-layout', async (req, res) => {
    try {
        const { rows } = await db.query("SELECT * FROM home_sections ORDER BY position ASC");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: "Falha ao buscar layout." });
    }
});

// Recebe uma nova ordem de seções e salva no banco
router.put('/home-layout/order', async (req, res) => {
    const { order } = req.body;
    try {
        await db.query('BEGIN');
        for (let i = 0; i < order.length; i++) {
            const componentKey = order[i];
            const newPosition = i;
            await db.query("UPDATE home_sections SET position = $1 WHERE component_key = $2", [newPosition, componentKey]);
        }
        await db.query('COMMIT');
        res.json({ success: true });
    } catch (err) {
        await db.query('ROLLBACK');
        res.status(500).json({ error: 'Falha ao salvar a nova ordem.' });
    }
});

// Alterna a visibilidade (mostrar/ocultar) de uma seção
router.put('/home-layout/:key/toggle', async (req, res) => {
    const { key } = req.params;
    try {
        const { rows } = await db.query(
            "UPDATE home_sections SET is_visible = NOT is_visible WHERE component_key = $1 AND is_fixed = false RETURNING is_visible", 
            [key]
        );
        res.json({ success: true, is_visible: rows[0]?.is_visible });
    } catch (err) {
        res.status(500).json({ error: 'Falha ao alterar visibilidade.' });
    }
});

export default router;