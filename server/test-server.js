const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());

// Rota simples para teste
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', message: 'Servidor de teste está funcionando!' });
});

// Rota de teste para registro
app.post('/api/auth/register', (req, res) => {
    console.log('Recebida requisição de registro:', req.body);
    res.status(201).json({
        message: 'Usuário registrado com sucesso (teste)',
        token: 'test-token-123',
        user: {
            id: 1,
            username: req.body.username,
            email: req.body.email || 'test@example.com'
        }
    });
});

// Rota de teste para login
app.post('/api/auth/login', (req, res) => {
    console.log('Recebida requisição de login:', req.body);
    res.status(200).json({
        message: 'Login bem-sucedido (teste)',
        token: 'test-token-123',
        user: {
            id: 1,
            username: req.body.username,
            email: 'test@example.com'
        }
    });
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor de teste rodando em http://0.0.0.0:${PORT}`);
}); 