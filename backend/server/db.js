require('dotenv').config();
const sql = require('mssql');

const config = {
  user: process.env.DB_USER, 
  password: process.env.DB_PASS, 
  server: process.env.DB_SERVER, 
  database: process.env.DB_DATABASE, 
  options: {
    encrypt: true, 
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
