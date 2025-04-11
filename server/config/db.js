const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

// Configuração do banco de dados
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'game_characters',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: false,
  // Opção necessária para desabilitar o SSL
  enableSsl: false
});

// Função para inicializar o banco de dados e criar tabelas se não existirem
async function initializeDatabase() {
  let connection;
  try {
    // Tenta conectar várias vezes (útil para esperar MySQL iniciar no Docker)
    let retries = 15; // Aumentado para 15 tentativas
    while (retries) {
      try {
        console.log(`Tentando conectar ao banco de dados (${16 - retries}/15)...`);
        connection = await pool.getConnection();
        console.log('Conexão com o banco de dados estabelecida com sucesso!');
        break;
      } catch (err) {
        retries -= 1;
        console.log(`Falha ao conectar ao banco de dados. Tentativas restantes: ${retries}`);
        if (retries === 0) {
          console.log('Erro de conexão:', err.message);
        }
        // Aumentado para 10 segundos de espera entre tentativas
        await new Promise(resolve => setTimeout(resolve, 10000));
      }
    }

    if (!connection) {
      throw new Error('Não foi possível conectar ao banco de dados após várias tentativas');
    }

    // Criar tabela de usuários
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(100) UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Criar tabela de personagens
    await connection.query(`
      CREATE TABLE IF NOT EXISTS characters (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        name VARCHAR(50) NOT NULL,
        strength INT DEFAULT 5,
        intelligence INT DEFAULT 5,
        skin_color VARCHAR(20) DEFAULT 'natural',
        hair_color VARCHAR(20) DEFAULT 'black',
        hair_style VARCHAR(20) DEFAULT 'normal',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    console.log('Banco de dados inicializado com sucesso!');
    connection.release();
  } catch (error) {
    console.error('Erro ao inicializar o banco de dados:', error);
    if (connection) connection.release();
    throw error;
  }
}

// Inicializar banco de dados
initializeDatabase();

module.exports = pool; 