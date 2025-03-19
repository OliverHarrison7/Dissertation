const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const sql = require('mssql');

const app = express();
app.use(cors());
app.use(express.json());

// MSSQL Configuration
const dbConfig = {
  user: 'user_db_2229773_diss',
  password: 'Database123',
  server: 'mssql.chester.network',
  database: 'db_2229773_diss',
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
  port: 1433,
};

// Helper function to get a DB connection pool
async function getPool() {
  try {
    const pool = await sql.connect(dbConfig);
    return pool;
  } catch (err) {
    console.error("SQL Connection Error:", err);
    throw err;
  }
}

// ----- User Endpoints ----- //

// POST /register - Register a new user
app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const pool = await getPool();
    await pool.request()
      .input('email', sql.NVarChar, email)
      .input('password', sql.NVarChar, hashedPassword)
      .query(`INSERT INTO users (email, password) VALUES (@email, @password)`);
    
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Error registering user.', error });
  }
});

// POST /login - Authenticate a user
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
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
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    
    res.json({ message: 'Login successful!' });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Error logging in.', error });
  }
});

// ----- Product Endpoints ----- //

// GET /api/products - Fetch all products
app.get('/api/products', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query('SELECT * FROM Products');
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products.', error });
  }
});

// POST /api/products - Add a new product
app.post('/api/products', async (req, res) => {
  const { name, status, inventory, type, vendor } = req.body;
  
  if (!name) {
    return res.status(400).json({ message: 'Product name is required.' });
  }
  
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('name', sql.NVarChar, name)
      .input('status', sql.NVarChar, status)
      .input('inventory', sql.NVarChar, inventory)
      .input('type', sql.NVarChar, type)
      .input('vendor', sql.NVarChar, vendor)
      .query(
        `INSERT INTO Products (name, status, inventory, type, vendor) 
         OUTPUT INSERTED.id 
         VALUES (@name, @status, @inventory, @type, @vendor)`
      );
      
    if (result.recordset && result.recordset.length > 0) {
      const insertedId = result.recordset[0].id;
      console.log(`Inserted product with ID: ${insertedId}`);
      res.status(201).json({ id: insertedId, name, status, inventory, type, vendor });
    } else {
      console.error('Insertion did not return an ID.');
      res.status(500).json({ message: 'Insertion did not return an ID.' });
    }
  } catch (error) {
    console.error('Error inserting product:', error);
    res.status(500).json({ message: 'Error inserting product.', error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
