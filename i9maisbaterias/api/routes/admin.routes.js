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

// --- Rotas de Páginas Estáticas ---
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

// --- Rotas do Page Builder da Home ---
router.get('/home-layout', async (req, res) => {
    try {
        const { rows } = await db.query("SELECT * FROM home_page_sections ORDER BY position ASC");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: "Falha ao buscar layout." });
    }
});

router.put('/home-layout/order', async (req, res) => {
    const { order } = req.body;
    try {
        await db.query('BEGIN');
        for (let i = 0; i < order.length; i++) {
            const sectionId = order[i];
            const newPosition = i;
            await db.query("UPDATE home_page_sections SET position = $1 WHERE id = $2", [newPosition, sectionId]);
        }
        await db.query('COMMIT');
        res.json({ success: true });
    } catch (err) {
        await db.query('ROLLBACK');
        res.status(500).json({ error: 'Falha ao salvar a nova ordem.' });
    }
});

router.put('/home-layout/toggle/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await db.query(
            "UPDATE home_page_sections SET is_visible = NOT is_visible WHERE id = $1 AND is_deletable = true RETURNING is_visible", 
            [id]
        );
        res.json({ success: true, is_visible: rows[0]?.is_visible });
    } catch (err) {
        res.status(500).json({ error: 'Falha ao alterar visibilidade.' });
    }
});

router.get('/home-section/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await db.query("SELECT * FROM home_page_sections WHERE id = $1", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: "Seção não encontrada." });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Falha ao carregar dados da seção.' });
    }
});

router.put('/home-section/:id', upload.single('heroImage'), async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await db.query("SELECT content_data FROM home_page_sections WHERE id = $1", [id]);
        let contentData = rows[0].content_data || {};

        for (const key in req.body) {
            if (key === 'blocks') {
                contentData[key] = JSON.parse(req.body[key]);
            } else {
                contentData[key] = req.body[key];
            }
        }
        
        if (req.file) {
            const newImageUrl = await handleUpload(req.file);
            contentData.heroImageUrl = newImageUrl;
        }

        const contentJson = JSON.stringify(contentData);
        
        await db.query("UPDATE home_page_sections SET content_data = $1 WHERE id = $2", [contentJson, id]);
        res.json({ success: true });
    } catch (err) {
        console.error("Erro ao salvar seção:", err);
        res.status(500).json({ error: 'Falha ao salvar a seção.' });
    }
});

router.post('/home-sections', async (req, res) => {
    const { title, content } = req.body;
    try {
        const { rows: posRows } = await db.query("SELECT MAX(position) as max_pos FROM home_page_sections");
        const newPosition = (posRows[0].max_pos || 0) + 1;
        
        const newSectionData = { title: title, content: content };

        const { rows } = await db.query(
            "INSERT INTO home_page_sections (component_key, title, position, is_visible, is_deletable, edit_path, content_data) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            ['custom_text', title, newPosition, true, true, null, JSON.stringify(newSectionData)]
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Falha ao criar nova seção.' });
    }
});

router.delete('/home-sections/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query("DELETE FROM home_page_sections WHERE id = $1 AND is_deletable = true", [id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: "Falha ao deletar seção." });
    }
});

// --- ROTA DOS BLOCOS DE ABORDAGEM (QUE ESTAVA FALTANDO) ---
router.get('/approach-blocks', async (req, res) => {
    try {
        const { rows } = await db.query("SELECT * FROM home_approach_blocks ORDER BY position ASC");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: "Falha ao buscar blocos." });
    }
});

router.post('/approach-blocks', async (req, res) => {
    const { icon, title, text } = req.body;
    try {
        const { rows: posRows } = await db.query("SELECT MAX(position) as max_pos FROM home_approach_blocks");
        const newPosition = (posRows[0].max_pos || 0) + 1;
        
        const { rows } = await db.query(
            "INSERT INTO home_approach_blocks (icon, title, text, position) VALUES ($1, $2, $3, $4) RETURNING *",
            [icon, title, text, newPosition]
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: "Falha ao criar bloco." });
    }
});

router.put('/approach-blocks/:id', async (req, res) => {
    const { id } = req.params;
    const { icon, title, text } = req.body;
    try {
        const { rows } = await db.query(
            "UPDATE home_approach_blocks SET icon = $1, title = $2, text = $3 WHERE id = $4 RETURNING *",
            [icon, title, text, id]
        );
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: "Falha ao atualizar bloco." });
    }
});

router.delete('/approach-blocks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query("DELETE FROM home_approach_blocks WHERE id = $1", [id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: "Falha ao deletar bloco." });
    }
});

export default router;