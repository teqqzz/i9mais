import db from '../db/db.js';

// Funções CRUD para a entidade "Solução"
export const create = async ({ title, slug, summary, image_url, content, image_style }) => {
    const [result] = await db.execute(
        'INSERT INTO solucoes (title, slug, summary, image_url, content, image_style) VALUES (?, ?, ?, ?, ?, ?)',
        [title, slug, summary, image_url, content, image_style || 'cover']
    );
    return result.insertId;
};

// Paginação: page (número da página), limit (itens por página)
export const getAll = async (page, limit) => {
    const offset = (page - 1) * limit;
    const [rows] = await db.execute(
        'SELECT * FROM solucoes ORDER BY created_at DESC LIMIT ? OFFSET ?', 
        [limit, offset]
    );
    const [[{ count }]] = await db.execute('SELECT COUNT(*) as count FROM solucoes');
    return { posts: rows, total: count };
};

// Get solução by slug (para exibição pública)
export const getBySlug = async (slug) => {
    const [rows] = await db.execute('SELECT * FROM solucoes WHERE slug = ?', [slug]);
    return rows[0];
};

// Get solução by ID (para edição/admin)
export const getById = async (id) => {
    const [rows] = await db.execute(
      'SELECT * FROM solucoes WHERE id = ?',
      [id]
    );
    return rows[0];
};

// Atualiza uma solução existente
export const update = async (id, { title, slug, summary, image_url, content, image_style }) => {
    await db.execute(
        'UPDATE solucoes SET title = ?, slug = ?, summary = ?, image_url = ?, content = ?, image_style = ? WHERE id = ?',
        [title, slug, summary, image_url, content, image_style || 'cover', id]
    );
};

// Deleta uma solução pelo ID
export const deleteById = async (id) => {
    await db.execute('DELETE FROM solucoes WHERE id = ?', [id]);
};