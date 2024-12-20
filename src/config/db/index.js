// const mysql = require('mysql2/promise');
require('dotenv').config({ path: './src/.env' });

// async function connectDatabase() {
//     try {
//         const connection = await mysql.createConnection({
//             host: process.env.DB_HOST,
//             user: process.env.DB_USER,
//             password: process.env.DB_PASSWORD,
//             database: process.env.DB_NAME,
//             port: process.env.DB_PORT
//         });
//         console.log('Connected to the database');
//         return connection;
//       } catch (err) {
//         console.log(err);
//       }
// }

// module.exports = { connectDatabase };

// config/db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  },
);

module.exports = sequelize;
