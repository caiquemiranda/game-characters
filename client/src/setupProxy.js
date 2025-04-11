const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  console.log('Configurando proxy para API...');

  // Tente se conectar diretamente ao serviço do Docker se estiver rodando no Docker
  // ou use o localhost se estiver rodando localmente
  const apiUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000';
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

        // Garantir que os headers corretos estejam presentes
        proxyReq.setHeader('Accept', 'application/json');
        proxyReq.setHeader('Content-Type', 'application/json');

        // Adicionar flag para indicar origem do request
        proxyReq.setHeader('X-Proxy-Client', 'React-App');
      },
      onError: (err, req, res) => {
        console.log('Proxy Error:', err);
        res.writeHead(500, {
          'Content-Type': 'application/json',
        });
        res.end(JSON.stringify({
          message: 'Erro ao conectar ao servidor da API. Por favor, verifique se o servidor está em execução.',
          error: err.message,
          apiUrl: apiUrl
        }));
      }
    })
  );
}; 