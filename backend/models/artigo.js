// Importa o pool de conexões do nosso novo arquivo db.js
import db from '../db/db.js';

// Funções CRUD para a entidade "Artigo" (convertidas para PostgreSQL)

export const create = async ({ title, slug, summary, image_url, content, image_style, publish_date }) => {
    const { rows } = await db.query(
        'INSERT INTO artigos (title, slug, summary, image_url, content, image_style, publish_date) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
        [title, slug, summary, image_url, content, image_style || 'cover', publish_date]
    );
    return rows[0].id;
};

export const getAll = async (page, limit) => {
    const offset = (page - 1) * limit;
    
    const { rows } = await db.query(
        'SELECT * FROM artigos ORDER BY publish_date DESC, created_at DESC LIMIT $1 OFFSET $2',
        [limit, offset]
    );
    

    const { rows: countRows } = await db.query('SELECT COUNT(*) as count FROM artigos');
    const count = parseInt(countRows[0].count, 10);
    
    return { posts: rows, total: count };
};

export const getBySlug = async (slug) => {
    const { rows } = await db.query('SELECT * FROM artigos WHERE slug = $1', [slug]);
    return rows[0];
};

export const getById = async (id) => {
    const { rows } = await db.query('SELECT * FROM artigos WHERE id = $1', [id]);
    return rows[0];
};

export const update = async (id, { title, slug, summary, image_url, content, image_style, publish_date }) => {
    await db.query(
        'UPDATE artigos SET title = $1, slug = $2, summary = $3, image_url = $4, content = $5, image_style = $6, publish_date = $7 WHERE id = $8',
        [title, slug, summary, image_url, content, image_style || 'cover', publish_date, id]
    );
};

export const deleteById = async (id) => {
    await db.query('DELETE FROM artigos WHERE id = $1', [id]);
};
