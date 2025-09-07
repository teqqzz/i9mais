import db from '../db/db.js'
import argon2 from 'argon2'

// Funções CRUD para a entidade "User" (convertidas para PostgreSQL)

export const create = async ({ username, password }) => {
    const hash = await argon2.hash(password);
    const { rows } = await db.query(
        'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id',
        [username, hash]
    );
    return rows[0].id;
};

export const findByUsername = async (username) => {
    const { rows } = await db.query(
        'SELECT * FROM users WHERE username = $1',
        [username]
    );
    return rows[0];
};

// Nenhuma alteração necessária aqui, pois não interage com o banco
export const validatePassword = async (user, password) => {
    return argon2.verify(user.password_hash, password);
};

export async function updatePassword(userId, newPassword) {
    const hash = await argon2.hash(newPassword, {
        type: argon2.argon2id,
    });
    await db.query(
        'UPDATE users SET password_hash = $1 WHERE id = $2',
        [hash, userId]
    );
}
