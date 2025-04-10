const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
    // Registrar um novo usuário
    static async register(username, password, email) {
        try {
            // Verificar se o usuário já existe
            const [existingUsers] = await db.query(
                'SELECT * FROM users WHERE username = ?',
                [username]
            );

            if (existingUsers.length > 0) {
                throw new Error('Nome de usuário já está em uso');
            }

            // Hash da senha
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Inserir usuário no banco de dados
            const [result] = await db.query(
                'INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
                [username, hashedPassword, email]
            );

            return { id: result.insertId, username, email };
        } catch (error) {
            throw error;
        }
    }

    // Encontrar usuário pelo nome de usuário
    static async findByUsername(username) {
        try {
            const [users] = await db.query(
                'SELECT * FROM users WHERE username = ?',
                [username]
            );

            return users[0];
        } catch (error) {
            throw error;
        }
    }

    // Encontrar usuário pelo ID
    static async findById(id) {
        try {
            const [users] = await db.query(
                'SELECT id, username, email, created_at FROM users WHERE id = ?',
                [id]
            );

            return users[0];
        } catch (error) {
            throw error;
        }
    }

    // Verificar senha
    static async verifyPassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
}

module.exports = User; 