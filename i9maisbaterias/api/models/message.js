import db from '../db/db.js';

// Função para criar uma nova entrada de mensagem (convertida para PostgreSQL)
export const create = async ({ name, email, phone, message }) => {
    const { rows } = await db.query(
        'INSERT INTO messages (name, email, phone, message) VALUES ($1, $2, $3, $4) RETURNING id',
        [name, email, phone, message]
    );
    return rows[0].id;
};

// Adicional: Funções para listar e marcar como lida (exemplo)
export const getAll = async () => {
    const { rows } = await db.query('SELECT * FROM messages ORDER BY created_at DESC');
    return rows;
};

export const markAsRead = async (id) => {
    await db.query('UPDATE messages SET is_read = true WHERE id = $1', [id]);
};
