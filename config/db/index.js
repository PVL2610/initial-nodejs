const mysql = require('mysql2/promise');
require('dotenv').config()

async function connectDatabase() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT
        });
        console.log('Connected to the database');
        return connection;   
      } catch (err) {
        console.log(err);
      }
}

module.exports = { connectDatabase }; 