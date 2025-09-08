import express from 'express';
// Importa TODAS as funções necessárias, incluindo getById
import { create, getAll, getBySlug, update, deleteById, getById } from '../models/solucao.js';
import upload from '../middleware/supuploads.js'; // Agora usa memoryStorage
import requireAuth from '../middleware/auth.js';
import { slugify } from '../utils/slugify.js';
import { supabaseAdmin } from '../db/supabaseClient.js'; // Importamos o cliente Supabase
import path from 'path';

const router = express.Router();
const SUPABASE_BUCKET = 'uploads'; // O nome do bucket público que criamos

// Função helper para fazer upload no Supabase
async function handleUpload(file) {
    if (!file) return null;

    // Gera um nome de arquivo único
    const fileName = `${Date.now()}-${slugify(path.parse(file.originalname).name)}${path.extname(file.originalname)}`;
    
    // Faz o upload do buffer (req.file.buffer) para o bucket 'uploads'
    const { data, error } = await supabaseAdmin.storage
        .from(SUPABASE_BUCKET)
        .upload(fileName, file.buffer, {
            contentType: file.mimetype,
            cacheControl: '3600', // 1 hora
        });

    if (error) {
        throw new Error(`Falha no upload para o Supabase: ${error.message}`);
    }

    // Pega a URL pública do arquivo que acabamos de enviar
    const { data: urlData } = supabaseAdmin.storage
        .from(SUPABASE_BUCKET)
        .getPublicUrl(fileName);

    return urlData.publicUrl;
}


// Criar Artigo (AJUSTADO)
router.post('/', requireAuth, upload.single('image'), async (req, res) => {
    try {
        const { title, content, summary, image_style } = req.body;
        const slug = slugify(title);
        
        // 1. Faz o upload para o Supabase ANTES de salvar no DB
        const image_url = await handleUpload(req.file);

        // 2. Salva a URL PÚBLICA do Supabase no banco de dados
        const postId = await create({ title, slug, summary, image_url, content, image_style });
        
        res.json({ success: true, postId });
    } catch (err) {
        console.error("Erro ao criar artigo:", err);
        res.status(500).json({ error: err.message });
    }
});

// Atualizar Artigo (AJUSTADO)
router.put('/:id', requireAuth, upload.single('image'), async (req, res) => {
    try {
        const { title, content, summary, image_style, publish_date } = req.body;
        const slug = slugify(title);
        let image_url;

        if (req.file) {
            // Se um NOVO arquivo foi enviado, faz o upload dele
            image_url = await handleUpload(req.file);
            // (Opcional: você pode adicionar lógica aqui para deletar a imagem antiga do storage)
        } else {
            // Se nenhum arquivo novo foi enviado, mantém a URL antiga que veio do form
            image_url = req.body.image_url;
        }

        await update(req.params.id, { title, slug, summary, image_url, content, image_style, publish_date  });
        res.json({ success: true });
    } catch (err) {
        console.error("Erro ao atualizar artigo:", err);
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