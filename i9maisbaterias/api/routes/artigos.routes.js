import express from 'express';
import { create, getAll, getBySlug, update, deleteById, getById } from '../models/artigo.js';
import upload from '../middleware/uploads.js';
import requireAuth from '../middleware/auth.js';
import { slugify } from '../utils/slugify.js';
import { supabaseAdmin } from '../db/supabaseClient.js';
import path from 'path';

const router = express.Router();
const SUPABASE_BUCKET = 'uploads';

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

router.post('/', requireAuth, upload.single('image'), async (req, res) => {
    try {
        const { title, content, summary, image_style, meta_title, meta_description } = req.body;
        const slug = slugify(title);
        const image_url = await handleUpload(req.file);
        const postId = await create({ title, slug, summary, image_url, content, image_style, meta_title, meta_description });
        res.json({ success: true, postId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', requireAuth, upload.single('image'), async (req, res) => {
    try {
        const { title, content, summary, image_style, publish_date, meta_title, meta_description } = req.body;
        const slug = slugify(title);
        let image_url = req.body.image_url;
        if (req.file) {
            image_url = await handleUpload(req.file);
        }
        await update(req.params.id, { title, slug, summary, image_url, content, image_style, publish_date, meta_title, meta_description  });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// --- Rotas GET e DELETE permanecem iguais ---

// Deletar Artigo
router.delete('/:id', requireAuth, async (req, res) => {
    // (Opcional: você deve pegar o post, extrair o nome do arquivo da URL do Supabase e deletá-lo do Storage antes de deletar do DB)
    try {
        await deleteById(req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET (Admin) - Buscar UM artigo pelo ID
router.get('/admin/:id', requireAuth, async (req, res) => {
    try {
        const post = await getById(req.params.id);
        if (!post) return res.status(404).json({ error: 'Artigo não encontrado' });
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET (Público) - Listar todos
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const { posts, total } = await getAll(page, limit);
        res.json({ posts, total });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET (Público) - Buscar UM artigo pelo SLUG
router.get('/:slug', async (req, res) => {
    try {
        const post = await getBySlug(req.params.slug);
        if (!post) return res.status(404).json({ error: 'Artigo não encontrado' });
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;