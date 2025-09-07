import express from 'express';
import { create, getAll, getBySlug, update, deleteById, getById } from '../models/projeto.js'
import upload from '../middleware/uploads.js';
import requireAuth from '../middleware/auth.js';
import { slugify } from '../utils/slugify.js';

const router = express.Router();

// Criar Projeto
router.post('/', requireAuth, upload.single('image'), async (req, res) => {
  try {
    const { title, content, summary } = req.body; // Pegar summary
    const slug = slugify(title);
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;
    const postId = await create({ title, slug, summary, image_url, content }); // Passar summary
    res.json({ success: true, postId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Atualizar Projeto
router.put('/:id', requireAuth, upload.single('image'), async (req, res) => {
  try {
    const { title, content, summary } = req.body; // Pegar summary
    const slug = slugify(title);
    const image_url = req.file ? `/uploads/${req.file.filename}` : req.body.image_url;
    await update(req.params.id, { title, slug, summary, image_url, content }); // Passar summary
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Deletar Projeto
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await deleteById(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET (Admin) - Buscar UM projeto pelo ID para o formulário de edição
router.get('/admin/:id', requireAuth, async (req, res) => {
    try {
        const post = await getById(req.params.id);
        if (!post) return res.status(404).json({ error: 'Projeto não encontrado' });
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


//  --- ROTAS PÚBLICAS ---

// GET (Público) - Listar todos os projetos (paginado)
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const { posts, total } = await getAll(page, limit);
  res.json({ posts, total });
});

// GET (Público) - Buscar UM projeto pelo slug para exibição pública
router.get('/:slug', async (req, res) => {
  const post = await getBySlug(req.params.slug);
  if (!post) return res.status(404).json({ error: 'Projeto não encontrado' });
  res.json(post);
});

export default router;