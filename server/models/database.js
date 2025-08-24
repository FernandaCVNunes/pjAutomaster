const mysql = require('mysql2/promise');

// Configurações de conexão com o seu banco de dados
const pool = mysql.createPool({
    host: '127.0.0.1',       // Endereço do seu servidor MySQL
    user: 'root',     // Seu usuário do MySQL Workbench
    password: 'root0208',     // Sua senha
    database: 'dbmecanica', // O nome do banco que você criou
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

console.log("Conexão com o banco de dados estabelecida com sucesso!");

module.exports = pool;