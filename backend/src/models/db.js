const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'db',
    user: 'root',
    password: process.env.DB_ROOT_PASSWORD,
    database: process.env.DB_NAME || 'nemochat',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;