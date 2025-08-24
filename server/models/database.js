const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '127.0.0.1',       
    user: 'root',     
    password: '1234',  
    database: 'bdmecanica',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function testarConexao() {
    try {
        const connection = await pool.getConnection();
        console.log("Conexão com o banco de dados estabelecida com sucesso!");
        connection.release(); // libera a conexão de volta para o pool
    } catch (err) {
        console.error("Erro ao conectar ao banco:", err.message);
    }
}

testarConexao();

module.exports = pool;