const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Rotas
const authRoutes = require('./routes/auth');
const characterRoutes = require('./routes/character');

// Configuração
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0'; // Ouvir em todas as interfaces de rede

// Middleware
app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://game-characters-client:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Proxy-Client']
}));
app.use(express.json());

// Log de todas as requisições
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - IP: ${req.ip}`);
    next();
});

// Rota para verificar saúde da API
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', message: 'API está funcionando normalmente' });
});

// Rota padrão
app.get('/', (req, res) => {
    res.send('API do Sistema de Personalização de Personagens');
});

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/characters', characterRoutes);

// Middleware de tratamento de erros (deve ser o último)
app.use(errorHandler);

// Iniciar servidor
app.listen(PORT, HOST, () => {
    console.log(`Servidor rodando em http://${HOST}:${PORT}`);
}); 