import db from '../db/db.js';

// Funções CRUD para a entidade "Projeto"
export const create = async ({ title, slug, summary, image_url, content }) => {
  const [result] = await db.execute(
    'INSERT INTO projetos (title, slug, summary, image_url, content) VALUES (?, ?, ?, ?, ?)',
    [title, slug, summary, image_url, content]
  );
  return result.insertId;
}

// Paginação: page (número da página), limit (itens por página)
export const getAll = async (page, limit) => {
    const offset = (page - 1) * limit;
    const [rows] = await db.execute(
        'SELECT * FROM projetos ORDER BY created_at DESC LIMIT ? OFFSET ?', // ou 'projetos' ou 'solucoes'
        [limit, offset]
    );
  const [[{ count }]] = await db.execute('SELECT COUNT(*) as count FROM projetos');
  return { posts: rows, total: count };
};

// Get projeto by ID (para edição/admin)
export const getById = async (id) => {
    const [rows] = await db.execute(
      'SELECT * FROM projetos WHERE id = ?',
      [id]
    );
    return rows[0];
}

// Get projeto by slug (para exibição pública)
export const getBySlug = async (slug) => {
  const [rows] = await db.execute('SELECT * FROM projetos WHERE slug = ?', [slug]);
  return rows[0];
}

// Atualiza um projeto existente
export const update = async (id, { title, slug, summary, image_url, content }) => {
  await db.execute(
    'UPDATE projetos SET title = ?, slug = ?, summary = ?, image_url = ?, content = ? WHERE id = ?',
    [title, slug, summary, image_url, content, id]
  );
}

// Deleta um projeto pelo ID
export const deleteById = async (id) => {
  await db.execute('DELETE FROM projetos WHERE id = ?', [id]);
}