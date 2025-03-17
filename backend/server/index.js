const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const sql = require('mssql');

const app = express();
app.use(cors());
app.use(express.json());

// 2. MSSQL Configuration
const dbConfig = {
  user: 'user_db_2229773_diss', 
  password: 'Database123',            
  server: 'mssql.chester.network',      
  database: 'db_2229773_diss',  
  options: {
    encrypt: true,
    trustServerCertificate: true
  },
  port: 1433 
};

// Helper function to get a DB connection pool
async function getPool() {
  const pool = await sql.connect(dbConfig);
  return pool;
}


app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into DB
    const pool = await getPool();
    const result = await pool.request()
      .input('email', sql.NVarChar, email)
      .input('password', sql.NVarChar, hashedPassword)
      .query(`INSERT INTO users (email, password) VALUES (@email, @password)`);

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Registration error:', error);
    // If duplicate email, you might get an SQL error for unique constraint
    return res.status(500).json({ message: 'Error registering user.', error });
  }
});


app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }
    
    const pool = await getPool();
    const userResult = await pool.request()
      .input('email', sql.NVarChar, email)
      .query(`SELECT * FROM users WHERE email = @email`);

    if (userResult.recordset.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const user = userResult.recordset[0];
    
    // Compare hashed passwords
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    
    // At this point, user is authenticated.
    res.json({ message: 'Login successful!' });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Error logging in.', error });
  }
});




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
