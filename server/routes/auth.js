const express = require('express');
const User = require('../models/User');
const { generateToken, authenticateToken } = require('../config/auth');

const router = express.Router();

// Rota de registro
router.post('/register', async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // Validação
        if (!username || !password) {
            return res.status(400).json({ message: 'Nome de usuário e senha são obrigatórios' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'A senha deve ter pelo menos 6 caracteres' });
        }

        // Registrar usuário
        const newUser = await User.register(username, password, email);

        // Gerar token
        const token = generateToken(newUser.id);

        res.status(201).json({
            message: 'Usuário registrado com sucesso',
            token,
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Rota de login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validação
        if (!username || !password) {
            return res.status(400).json({ message: 'Nome de usuário e senha são obrigatórios' });
        }

        // Encontrar usuário
        const user = await User.findByUsername(username);

        if (!user) {
            return res.status(400).json({ message: 'Credenciais inválidas' });
        }

        // Verificar senha
        const isMatch = await User.verifyPassword(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciais inválidas' });
        }

        // Gerar token
        const token = generateToken(user.id);

        res.json({
            message: 'Login bem-sucedido',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Rota para obter usuário atual
router.get('/me', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 