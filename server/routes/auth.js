const express = require('express');
const User = require('../models/User');
const { generateToken, authenticateToken } = require('../config/auth');

const router = express.Router();

// Rota de registro
router.post('/register', async (req, res, next) => {
    try {
        console.log('Recebida requisição de registro:', req.body);
        const { username, password, email } = req.body;

        // Validação
        if (!username || !password) {
            return res.status(400).json({ message: 'Nome de usuário e senha são obrigatórios' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'A senha deve ter pelo menos 6 caracteres' });
        }

        console.log('Validação passou, tentando registrar usuário...');
        // Registrar usuário
        const newUser = await User.register(username, password, email);
        console.log('Usuário registrado com sucesso:', username);

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
        console.error('Erro ao registrar usuário:', error);
        // Passar o erro para o middleware de tratamento de erros
        next(error);
    }
});

// Rota de login
router.post('/login', async (req, res, next) => {
    try {
        console.log('Recebida requisição de login:', req.body.username);
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
        console.log('Login bem-sucedido para usuário:', username);

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
        console.error('Erro no login:', error);
        next(error);
    }
});

// Rota para obter usuário atual
router.get('/me', authenticateToken, async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.json({ user });
    } catch (error) {
        console.error('Erro ao buscar usuário atual:', error);
        next(error);
    }
});

module.exports = router; 