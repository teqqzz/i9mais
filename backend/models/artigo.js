import db from '../db/db.js';

// Funções CRUD para a entidade "Artigo"
export const create = async ({ title, slug, summary, image_url, content, image_style }) => {
  const [result] = await db.execute(
    'INSERT INTO artigos (title, slug, summary, image_url, content, image_style) VALUES (?, ?, ?, ?, ?, ?)',
    [title, slug, summary, image_url, content, image_style || 'cover'] // Garante 'cover' como padrão
  );
  return result.insertId;
}
// Paginação: page (número da página), limit (itens por página)
export const getAll = async (page, limit) => {
    const offset = (page - 1) * limit;
    const [rows] = await db.execute(
        'SELECT * FROM artigos ORDER BY created_at DESC LIMIT ? OFFSET ?', // ou 'projetos' ou 'solucoes'
        [limit, offset]
    );
  const [[{ count }]] = await db.execute('SELECT COUNT(*) as count FROM artigos');
  return { posts: rows, total: count };
};

// Get artigo by slug (para exibição pública)
export const getBySlug = async (slug) => {
  const [rows] = await db.execute('SELECT * FROM artigos WHERE slug = ?', [slug]);
  return rows[0];
}

// Get artigo by ID (para edição/admin)
export const getById = async (id) => {
    const [rows] = await db.execute(
      'SELECT * FROM artigos WHERE id = ?',
      [id]
    );
    return rows[0];
}

// Atualiza um artigo existente
export const update = async (id, { title, slug, summary, image_url, content, image_style }) => {
  await db.execute(
    'UPDATE artigos SET title = ?, slug = ?, summary = ?, image_url = ?, content = ?, image_style = ? WHERE id = ?',
    [title, slug, summary, image_url, content, image_style || 'cover', id]
  );
}

// Deleta um artigo pelo ID
export const deleteById = async (id) => {
  await db.execute('DELETE FROM artigos WHERE id = ?', [id]);
}