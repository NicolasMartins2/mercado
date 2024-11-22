
const mysql = require('mysql2');

// Cria uma pool de conexões para o banco de dados MySQL
const pool = mysql.createPool({
    host: 'localhost',      // Endereço do servidor
    user: 'root',    // Nome de usuário do MySQL
    password: "",  // Senha do MySQL
    database: 'mercado'   // Nome do banco de dados
});

// Exporta a pool para que seja usada em outros módulos
module.exports = pool.promise();
