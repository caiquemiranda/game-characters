// Middleware para tratamento global de erros
const errorHandler = (err, req, res, next) => {
    console.error('Erro na API:', err.message);

    // Erro genérico
    res.status(500).json({
        message: 'Erro interno do servidor',
        error: err.message
    });
};

module.exports = errorHandler; 