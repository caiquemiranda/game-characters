const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  console.log('Configurando proxy para API...');

  // Sempre use localhost:5000 para acessar a API do servidor
  const apiUrl = 'http://localhost:5000';
  console.log('URL da API:', apiUrl);

  app.use(
    '/api',
    createProxyMiddleware({
      target: apiUrl,
      changeOrigin: true,
      secure: false,
      pathRewrite: { '^/api': '/api' },
      onProxyReq: (proxyReq, req, res) => {
        console.log(`Proxy request: ${req.method} ${req.path} -> ${apiUrl}${req.path}`);
      },
      onError: (err, req, res) => {
        console.log('Proxy Error:', err);
        res.writeHead(500, {
          'Content-Type': 'application/json',
        });
        res.end(JSON.stringify({
          message: 'Erro ao conectar ao servidor da API. Por favor, verifique se o servidor está em execução.',
          error: err.message
        }));
      }
    })
  );
}; 