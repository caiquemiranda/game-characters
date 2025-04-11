// Middleware para tratamento global de erros
const errorHandler = (err, req, res, next) => {
    console.error('Erro na API:', err);

    // Erros de banco de dados
    if (err.code && (err.code.startsWith('ER_') || err.code.startsWith('ECONNREFUSED'))) {
        console.error('Erro de banco de dados:', err.message);
        return res.status(500).json({
            message: 'Erro de conexão com banco de dados',
            details: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }

    // Erros de validação
    if (err.message && (
        err.message.includes('required') ||
        err.message.includes('validation') ||
        err.message.includes('already exists')
    )) {
        return res.status(400).json({ message: err.message });
    }

    // Erro genérico
    res.status(500).json({
        message: 'Erro interno do servidor',
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
};

module.exports = errorHandler; 