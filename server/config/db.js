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
    queueLimit: 0
});

// Função para inicializar o banco de dados e criar tabelas se não existirem
async function initializeDatabase() {
    try {
        const connection = await pool.getConnection();

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
        throw error;
    }
}

// Inicializar banco de dados
initializeDatabase();

module.exports = pool; 