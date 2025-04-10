const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');

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

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/characters', characterRoutes);

// Rota padrão
app.get('/', (req, res) => {
    res.send('API do Sistema de Personalização de Personagens');
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
}); 