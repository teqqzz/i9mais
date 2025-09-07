import db from '../db/db.js'; 

// Função para criar uma nova entrada de mensagem no banco
export const create = async ({ name, email, phone, message }) => {
    const [result] = await db.execute(
        'INSERT INTO messages (name, email, phone, message) VALUES (?, ?, ?, ?)',
        [name, email, phone, message]
    );
    return result.insertId;
};