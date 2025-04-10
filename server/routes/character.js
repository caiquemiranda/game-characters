const express = require('express');
const Character = require('../models/Character');
const { authenticateToken } = require('../config/auth');

const router = express.Router();

// Middleware de autenticação para todas as rotas
router.use(authenticateToken);

// Obter todos os personagens do usuário
router.get('/', async (req, res) => {
    try {
        const characters = await Character.findByUserId(req.user.id);
        res.json({ characters });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obter um personagem específico
router.get('/:id', async (req, res) => {
    try {
        const character = await Character.findById(req.params.id);

        if (!character) {
            return res.status(404).json({ message: 'Personagem não encontrado' });
        }

        // Verificar se o personagem pertence ao usuário
        if (character.user_id !== req.user.id) {
            return res.status(403).json({ message: 'Acesso negado' });
        }

        res.json({ character });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Criar um novo personagem
router.post('/', async (req, res) => {
    try {
        const { name, strength, intelligence, skin_color, hair_color, hair_style } = req.body;

        // Validação básica
        if (!name) {
            return res.status(400).json({ message: 'Nome do personagem é obrigatório' });
        }

        // Criar objeto de dados do personagem
        const characterData = {
            name,
            strength: strength || 5,
            intelligence: intelligence || 5,
            skin_color: skin_color || 'natural',
            hair_color: hair_color || 'black',
            hair_style: hair_style || 'normal'
        };

        // Criar personagem
        const newCharacter = await Character.create(req.user.id, characterData);

        res.status(201).json({
            message: 'Personagem criado com sucesso',
            character: newCharacter
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Atualizar um personagem
router.put('/:id', async (req, res) => {
    try {
        const { name, strength, intelligence, skin_color, hair_color, hair_style } = req.body;

        // Verificar se o personagem existe
        const character = await Character.findById(req.params.id);

        if (!character) {
            return res.status(404).json({ message: 'Personagem não encontrado' });
        }

        // Verificar se o personagem pertence ao usuário
        if (character.user_id !== req.user.id) {
            return res.status(403).json({ message: 'Acesso negado' });
        }

        // Validação básica
        if (!name) {
            return res.status(400).json({ message: 'Nome do personagem é obrigatório' });
        }

        // Criar objeto de dados do personagem
        const characterData = {
            name,
            strength: strength || character.strength,
            intelligence: intelligence || character.intelligence,
            skin_color: skin_color || character.skin_color,
            hair_color: hair_color || character.hair_color,
            hair_style: hair_style || character.hair_style
        };

        // Atualizar personagem
        const updatedCharacter = await Character.update(
            req.params.id,
            req.user.id,
            characterData
        );

        res.json({
            message: 'Personagem atualizado com sucesso',
            character: updatedCharacter
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Excluir um personagem
router.delete('/:id', async (req, res) => {
    try {
        // Verificar se o personagem existe
        const character = await Character.findById(req.params.id);

        if (!character) {
            return res.status(404).json({ message: 'Personagem não encontrado' });
        }

        // Verificar se o personagem pertence ao usuário
        if (character.user_id !== req.user.id) {
            return res.status(403).json({ message: 'Acesso negado' });
        }

        // Excluir personagem
        await Character.delete(req.params.id, req.user.id);

        res.json({ message: 'Personagem excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 