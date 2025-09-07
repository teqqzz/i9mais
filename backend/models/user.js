    import db from '../db/db.js'
    import argon2 from 'argon2'

    // Funções CRUD para a entidade "User"
    export const create = async ({ username, password }) => {
        const hash = await argon2.hash(password);
        const [result] = await db.execute(
            'INSERT INTO users (username, password_hash) VALUES (?, ?)',
            [username, hash]
        );
        return result.insertId;
    }

    // Encontra um usuário pelo nome de usuário
    export const findByUsername = async (username) => {
        const [rows] = await db.execute(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );
        return rows[0];
    }

    // Valida a senha do usuário
    export const validatePassword = async (user, password) => {
        return argon2.verify(user.password_hash, password);
    }

    // Atualiza a senha do usuário
    export async function updatePassword(userId, newPassword) {
        const hash = await argon2.hash(newPassword, {
            type: argon2.argon2id,
        })
        await db.execute(
            'UPDATE users SET password_hash = ? WHERE id = ?',
            [hash, userId]
        )
    }