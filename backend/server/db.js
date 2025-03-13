// db.js
require('dotenv').config();
const sql = require('mssql');

const config = {
  user: process.env.DB_USER, // from .env
  password: process.env.DB_PASS, // from .env
  server: process.env.DB_SERVER, // from .env
  database: process.env.DB_DATABASE, // from .env
  options: {
    encrypt: true, // set to true if your SQL Server requires encryption
    trustServerCertificate: true // use with caution in production
  }
};

async function connectDB() {
  try {
    const pool = await sql.connect(config);
    console.log('Connected to SQL Server');
    return pool;
  } catch (err) {
    console.error('Database Connection Failed!', err);
    throw err;
  }
}

module.exports = { sql, connectDB };
