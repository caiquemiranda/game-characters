const db = require('../config/db');

class Character {
    // Criar um novo personagem
    static async create(userId, characterData) {
        try {
            const { name, strength, intelligence, skin_color, hair_color, hair_style } = characterData;

            const [result] = await db.query(
                `INSERT INTO characters (user_id, name, strength, intelligence, skin_color, hair_color, hair_style) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [userId, name, strength, intelligence, skin_color, hair_color, hair_style]
            );

            return {
                id: result.insertId,
                user_id: userId,
                ...characterData
            };
        } catch (error) {
            throw error;
        }
    }

    // Encontrar personagens de um usuário
    static async findByUserId(userId) {
        try {
            const [characters] = await db.query(
                'SELECT * FROM characters WHERE user_id = ?',
                [userId]
            );

            return characters;
        } catch (error) {
            throw error;
        }
    }

    // Encontrar um personagem pelo ID
    static async findById(id) {
        try {
            const [characters] = await db.query(
                'SELECT * FROM characters WHERE id = ?',
                [id]
            );

            return characters[0];
        } catch (error) {
            throw error;
        }
    }

    // Atualizar um personagem
    static async update(id, userId, characterData) {
        try {
            const { name, strength, intelligence, skin_color, hair_color, hair_style } = characterData;

            const [result] = await db.query(
                `UPDATE characters 
         SET name = ?, strength = ?, intelligence = ?, 
             skin_color = ?, hair_color = ?, hair_style = ? 
         WHERE id = ? AND user_id = ?`,
                [name, strength, intelligence, skin_color, hair_color, hair_style, id, userId]
            );

            if (result.affectedRows === 0) {
                throw new Error('Personagem não encontrado ou não pertence ao usuário');
            }

            return {
                id,
                user_id: userId,
                ...characterData
            };
        } catch (error) {
            throw error;
        }
    }

    // Excluir um personagem
    static async delete(id, userId) {
        try {
            const [result] = await db.query(
                'DELETE FROM characters WHERE id = ? AND user_id = ?',
                [id, userId]
            );

            if (result.affectedRows === 0) {
                throw new Error('Personagem não encontrado ou não pertence ao usuário');
            }

            return true;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Character; 