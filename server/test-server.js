const http = require('http');

const server = http.createServer((req, res) => {
    // Ativar CORS para todas as origens
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Lidar com requisições OPTIONS (preflight)
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Extrair informações do caminho e método
    const url = req.url;
    const method = req.method;

    console.log(`${method} ${url}`);

    // Rota para verificação de saúde
    if (url === '/health' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            status: 'UP',
            message: 'Servidor de teste está funcionando!'
        }));
        return;
    }

    // Rota para registro
    if (url === '/api/auth/register' && method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            console.log('Corpo da requisição de registro:', body);

            try {
                const userData = JSON.parse(body);
                console.log('Dados de usuário recebidos:', userData);

                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    message: 'Usuário registrado com sucesso (teste)',
                    token: 'test-token-123',
                    user: {
                        id: 1,
                        username: userData.username,
                        email: userData.email || 'test@example.com'
                    }
                }));
            } catch (error) {
                console.error('Erro ao processar registro:', error);
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    message: 'Erro ao processar dados de registro',
                    error: error.message
                }));
            }
        });

        return;
    }

    // Rota para login
    if (url === '/api/auth/login' && method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            console.log('Corpo da requisição de login:', body);

            try {
                const userData = JSON.parse(body);
                console.log('Dados de login recebidos:', userData);

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    message: 'Login bem-sucedido (teste)',
                    token: 'test-token-123',
                    user: {
                        id: 1,
                        username: userData.username,
                        email: 'test@example.com'
                    }
                }));
            } catch (error) {
                console.error('Erro ao processar login:', error);
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    message: 'Erro ao processar dados de login',
                    error: error.message
                }));
            }
        });

        return;
    }

    // Rota padrão para outras requisições
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        message: 'Rota não encontrada',
        path: url,
        method: method
    }));
});

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Servidor de teste rodando em http://localhost:${PORT}`);
}); 