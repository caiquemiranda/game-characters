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

// Middleware
app.use(cors());
app.use(express.json());

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
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
}); 