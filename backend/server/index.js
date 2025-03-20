/***********************************************
 * File: backend/index.js
 *----------------------------------------------
 * A single server with:
 * 1) JWT-based login
 * 2) Products, Customers, Orders endpoints
 * 3) /api/users/me GET/PUT for "My Account"
 ***********************************************/

 require('dotenv').config();
 const express = require('express');
 const cors = require('cors');
 const bcrypt = require('bcrypt');
 const sql = require('mssql');
 const jwt = require('jsonwebtoken');
 
 const app = express();
 app.use(cors());
 app.use(express.json());
 
 // Example secret; in production, store in .env
 const JWT_SECRET = process.env.JWT_SECRET || 'some-super-secret';
 
 // MSSQL Configuration
 const dbConfig = {
   user: 'user_db_2229773_diss',
   password: 'Database123',
   server: 'mssql.chester.network',
   database: 'db_2229773_diss',
   port: 1433,
   options: {
     encrypt: true,
     trustServerCertificate: true
   }
 };
 
 // Helper: connect to SQL
 async function getPool() {
   try {
     const pool = await sql.connect(dbConfig);
     return pool;
   } catch (err) {
     console.error("SQL Connection Error:", err);
     throw err;
   }
 }
 
 /****************************************************
  * authMiddleware: Decodes JWT from Authorization header
  ****************************************************/
 function authMiddleware(req, res, next) {
   const authHeader = req.headers.authorization;
   if (!authHeader) {
     return res.status(401).json({ message: 'No token provided' });
   }
   const token = authHeader.split(' ')[1];
   try {
     const decoded = jwt.verify(token, JWT_SECRET);
     req.userId = decoded.userId; // store userId in req
     next();
   } catch (err) {
     return res.status(401).json({ message: 'Invalid token' });
   }
 }
 
 /****************************************************
  *                  Users Endpoints
  ****************************************************/
 // POST /register - create a new user
 app.post('/register', async (req, res) => {
   try {
     // We allow optional name/phone, but require email/password
     const { email, password, name, phone } = req.body;
     if (!email || !password) {
       return res.status(400).json({ message: 'Email and password are required.' });
     }
     const hashedPassword = await bcrypt.hash(password, 10);
 
     const pool = await getPool();
     await pool.request()
       .input('email', sql.NVarChar, email)
       .input('password', sql.NVarChar, hashedPassword)
       .input('name', sql.NVarChar, name || '')
       .input('phone', sql.NVarChar, phone || '')
       .query(`
         INSERT INTO users (email, password, name, phone)
         VALUES (@email, @password, @name, @phone)
       `);
 
     res.status(201).json({ message: 'User registered successfully!' });
   } catch (error) {
     console.error('Registration error:', error);
     res.status(500).json({ message: 'Error registering user.', error });
   }
 });
 
 // POST /login - authenticate user, return token
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
 
     // create a JWT token
     const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
 
     res.json({ message: 'Login successful!', token });
   } catch (error) {
     console.error('Login error:', error);
     res.status(500).json({ message: 'Error logging in.', error });
   }
 });
 
 // GET /api/users/me - fetch user info (requires token)
 app.get('/api/users/me', authMiddleware, async (req, res) => {
   try {
     const userId = req.userId; // from token
 
     const pool = await getPool();
     const result = await pool.request()
       .input('id', sql.Int, userId)
       .query(`
         SELECT id, email, name, phone, role, createdAt
         FROM dbo.users
         WHERE id = @id
       `);
 
     if (result.recordset.length === 0) {
       return res.status(404).json({ message: 'User not found.' });
     }
     res.json(result.recordset[0]);
   } catch (error) {
     console.error('Error fetching user info:', error);
     res.status(500).json({ message: 'Error fetching user info.', error });
   }
 });
 
 // PUT /api/users/me - update user info (requires token)
 app.put('/api/users/me', authMiddleware, async (req, res) => {
   try {
     const userId = req.userId;
 
     const { email, name, phone, role, newPassword } = req.body;
 
     let passwordSql = '';
     if (newPassword && newPassword.trim() !== '') {
       const hashed = await bcrypt.hash(newPassword, 10);
       passwordSql = `, password = '${hashed}'`;
     }
 
     const pool = await getPool();
     const updateQuery = `
       UPDATE dbo.users
       SET
         email = @email,
         name = @name,
         phone = @phone,
         role = @role
         ${passwordSql}
       WHERE id = @id;
 
       SELECT id, email, name, phone, role, createdAt
       FROM dbo.users
       WHERE id = @id;
     `;
 
     const updateResult = await pool.request()
       .input('id', sql.Int, userId)
       .input('email', sql.NVarChar, email || '')
       .input('name', sql.NVarChar, name || '')
       .input('phone', sql.NVarChar, phone || '')
       .input('role', sql.NVarChar, role || 'user')
       .query(updateQuery);
 
     if (updateResult.recordset.length === 0) {
       return res.status(404).json({ message: 'User not found.' });
     }
     res.json(updateResult.recordset[0]);
   } catch (error) {
     console.error('Error updating user info:', error);
     res.status(500).json({ message: 'Error updating user info.', error });
   }
 });
 
 /****************************************************
  *             Product Endpoints
  ****************************************************/
 // GET /api/products
 app.get('/api/products', async (req, res) => {
   try {
     const pool = await getPool();
     const result = await pool.request().query(`SELECT * FROM Products`);
     res.json(result.recordset);
   } catch (error) {
     console.error('Error fetching products:', error);
     res.status(500).json({ message: 'Error fetching products.', error });
   }
 });
 
 // GET /api/products/:id
 app.get('/api/products/:id', async (req, res) => {
   const { id } = req.params;
   try {
     const pool = await getPool();
     const result = await pool.request()
       .input('id', sql.Int, id)
       .query(`SELECT * FROM Products WHERE id = @id`);
 
     if (result.recordset.length === 0) {
       return res.status(404).json({ message: 'Product not found.' });
     }
     res.json(result.recordset[0]);
   } catch (error) {
     console.error('Error fetching product:', error);
     res.status(500).json({ message: 'Error fetching product.', error });
   }
 });
 
 // POST /api/products
 app.post('/api/products', async (req, res) => {
   const { name, status, inventory, type, vendor } = req.body;
   if (!name) {
     return res.status(400).json({ message: 'Product name is required.' });
   }
 
   try {
     const pool = await getPool();
     const result = await pool.request()
       .input('name', sql.NVarChar, name)
       .input('status', sql.NVarChar, status || '')
       .input('inventory', sql.NVarChar, inventory || '')
       .input('type', sql.NVarChar, type || '')
       .input('vendor', sql.NVarChar, vendor || '')
       .query(`
         INSERT INTO Products (name, status, inventory, type, vendor)
         OUTPUT INSERTED.id
         VALUES (@name, @status, @inventory, @type, @vendor)
       `);
 
     if (result.recordset && result.recordset.length > 0) {
       const insertedId = result.recordset[0].id;
       res.status(201).json({ id: insertedId, name, status, inventory, type, vendor });
     } else {
       res.status(500).json({ message: 'Insertion did not return an ID.' });
     }
   } catch (error) {
     console.error('Error inserting product:', error);
     res.status(500).json({ message: 'Error inserting product.', error });
   }
 });
 
 // PUT /api/products/:id
 app.put('/api/products/:id', async (req, res) => {
   const { id } = req.params;
   const { name, status, inventory, type, vendor } = req.body;
 
   if (!name) {
     return res.status(400).json({ message: 'Product name is required.' });
   }
 
   try {
     const pool = await getPool();
     const result = await pool.request()
       .input('id', sql.Int, id)
       .input('name', sql.NVarChar, name)
       .input('status', sql.NVarChar, status || '')
       .input('inventory', sql.NVarChar, inventory || '')
       .input('type', sql.NVarChar, type || '')
       .input('vendor', sql.NVarChar, vendor || '')
       .query(`
         UPDATE Products
         SET name = @name,
             status = @status,
             inventory = @inventory,
             type = @type,
             vendor = @vendor
         WHERE id = @id;
         SELECT * FROM Products WHERE id = @id;
       `);
 
     if (result.recordset && result.recordset.length > 0) {
       res.json(result.recordset[0]);
     } else {
       res.status(404).json({ message: 'Product not found.' });
     }
   } catch (error) {
     console.error('Error updating product:', error);
     res.status(500).json({ message: 'Error updating product.', error });
   }
 });
 
 // DELETE /api/products/:id
 app.delete('/api/products/:id', async (req, res) => {
   const { id } = req.params;
   try {
     const pool = await getPool();
     const result = await pool.request()
       .input('id', sql.Int, id)
       .query(`DELETE FROM Products WHERE id = @id`);
 
     if (result.rowsAffected[0] > 0) {
       res.json({ message: 'Product deleted successfully.' });
     } else {
       res.status(404).json({ message: 'Product not found.' });
     }
   } catch (error) {
     console.error('Error deleting product:', error);
     res.status(500).json({ message: 'Error deleting product.', error });
   }
 });
 
 /****************************************************
  *             Customers Endpoints
  ****************************************************/
 // GET /api/customers
 app.get('/api/customers', async (req, res) => {
   try {
     const pool = await getPool();
     const result = await pool.request().query(`SELECT * FROM Customers`);
     res.json(result.recordset);
   } catch (error) {
     console.error('Error fetching customers:', error);
     res.status(500).json({ message: 'Error fetching customers.', error });
   }
 });
 
 // GET /api/customers/:id
 app.get('/api/customers/:id', async (req, res) => {
   const { id } = req.params;
   try {
     const pool = await getPool();
     const result = await pool.request()
       .input('id', sql.Int, id)
       .query(`SELECT * FROM Customers WHERE id = @id`);
 
     if (result.recordset.length === 0) {
       return res.status(404).json({ message: 'Customer not found.' });
     }
     res.json(result.recordset[0]);
   } catch (error) {
     console.error('Error fetching customer:', error);
     res.status(500).json({ message: 'Error fetching customer.', error });
   }
 });
 
 // POST /api/customers
 app.post('/api/customers', async (req, res) => {
   const { name, email, total_orders, total_spent, last_order, tags } = req.body;
 
   if (!name || !email) {
     return res.status(400).json({ message: 'Name and email are required.' });
   }
 
   try {
     const pool = await getPool();
     const result = await pool.request()
       .input('name', sql.NVarChar, name)
       .input('email', sql.NVarChar, email)
       .input('total_orders', sql.Int, total_orders || 0)
       .input('total_spent', sql.Float, total_spent || 0)
       .input('last_order', sql.NVarChar, last_order || '')
       .input('tags', sql.NVarChar, tags || '')
       .query(`
         INSERT INTO Customers (name, email, total_orders, total_spent, last_order, tags)
         OUTPUT INSERTED.id
         VALUES (@name, @email, @total_orders, @total_spent, @last_order, @tags)
       `);
 
     if (result.recordset && result.recordset.length > 0) {
       const insertedId = result.recordset[0].id;
       res.status(201).json({
         id: insertedId,
         name,
         email,
         total_orders,
         total_spent,
         last_order,
         tags
       });
     } else {
       res.status(500).json({ message: 'Insertion did not return an ID.' });
     }
   } catch (error) {
     console.error('Error inserting customer:', error);
     res.status(500).json({ message: 'Error inserting customer.', error });
   }
 });
 
 // PUT /api/customers/:id
 app.put('/api/customers/:id', async (req, res) => {
   const { id } = req.params;
   const { name, email, total_orders, total_spent, last_order, tags } = req.body;
 
   if (!name || !email) {
     return res.status(400).json({ message: 'Name and email are required.' });
   }
 
   try {
     const pool = await getPool();
     const result = await pool.request()
       .input('id', sql.Int, id)
       .input('name', sql.NVarChar, name)
       .input('email', sql.NVarChar, email)
       .input('total_orders', sql.Int, total_orders || 0)
       .input('total_spent', sql.Float, total_spent || 0)
       .input('last_order', sql.NVarChar, last_order || '')
       .input('tags', sql.NVarChar, tags || '')
       .query(`
         UPDATE Customers
         SET name = @name,
             email = @email,
             total_orders = @total_orders,
             total_spent = @total_spent,
             last_order = @last_order,
             tags = @tags
         WHERE id = @id;
         SELECT * FROM Customers WHERE id = @id;
       `);
 
     if (result.recordset && result.recordset.length > 0) {
       res.json(result.recordset[0]);
     } else {
       res.status(404).json({ message: 'Customer not found.' });
     }
   } catch (error) {
     console.error('Error updating customer:', error);
     res.status(500).json({ message: 'Error updating customer.', error });
   }
 });
 
 // DELETE /api/customers/:id
 app.delete('/api/customers/:id', async (req, res) => {
   const { id } = req.params;
   try {
     const pool = await getPool();
     const result = await pool.request()
       .input('id', sql.Int, id)
       .query(`DELETE FROM Customers WHERE id = @id`);
 
     if (result.rowsAffected[0] > 0) {
       res.json({ message: 'Customer deleted successfully.' });
     } else {
       res.status(404).json({ message: 'Customer not found.' });
     }
   } catch (error) {
     console.error('Error deleting customer:', error);
     res.status(500).json({ message: 'Error deleting customer.', error });
   }
 });
 
 /****************************************************
  *             Orders Endpoints
  ****************************************************/
 // GET /api/orders
 app.get('/api/orders', async (req, res) => {
   try {
     const pool = await getPool();
     const result = await pool.request().query(`SELECT * FROM Orders`);
     res.json(result.recordset);
   } catch (error) {
     console.error('Error fetching orders:', error);
     res.status(500).json({ message: 'Error fetching orders.', error });
   }
 });
 
 // GET /api/orders/:id
 app.get('/api/orders/:id', async (req, res) => {
   const { id } = req.params;
   try {
     const pool = await getPool();
     const result = await pool.request()
       .input('id', sql.Int, id)
       .query(`SELECT * FROM Orders WHERE id = @id`);
 
     if (result.recordset.length === 0) {
       return res.status(404).json({ message: 'Order not found.' });
     }
     res.json(result.recordset[0]);
   } catch (error) {
     console.error('Error fetching order:', error);
     res.status(500).json({ message: 'Error fetching order.', error });
   }
 });
 
 // POST /api/orders
 app.post('/api/orders', async (req, res) => {
   const {
     order_date,
     visitors,
     orders,
     conversion_rate,
     average_order_value,
     revenue,
     cogs,
     marketing_spend,
     refunds,
     profit
   } = req.body;
 
   if (!order_date) {
     return res.status(400).json({ message: 'Order date is required.' });
   }
 
   try {
     const pool = await getPool();
     const result = await pool.request()
       .input('order_date', sql.NVarChar, order_date)
       .input('visitors', sql.Int, visitors || 0)
       .input('orders', sql.Int, orders || 0)
       .input('conversion_rate', sql.Float, conversion_rate || 0)
       .input('average_order_value', sql.Float, average_order_value || 0)
       .input('revenue', sql.Float, revenue || 0)
       .input('cogs', sql.Float, cogs || 0)
       .input('marketing_spend', sql.Float, marketing_spend || 0)
       .input('refunds', sql.Int, refunds || 0)
       .input('profit', sql.Float, profit || 0)
       .query(`
         INSERT INTO Orders
          (order_date, visitors, orders, conversion_rate, average_order_value, revenue, cogs, marketing_spend, refunds, profit)
          OUTPUT INSERTED.id
          VALUES
          (@order_date, @visitors, @orders, @conversion_rate, @average_order_value, @revenue, @cogs, @marketing_spend, @refunds, @profit)
       `);
 
     if (result.recordset && result.recordset.length > 0) {
       const insertedId = result.recordset[0].id;
       res.status(201).json({
         id: insertedId,
         order_date,
         visitors,
         orders,
         conversion_rate,
         average_order_value,
         revenue,
         cogs,
         marketing_spend,
         refunds,
         profit
       });
     } else {
       res.status(500).json({ message: 'Insertion did not return an ID.' });
     }
   } catch (error) {
     console.error('Error inserting order:', error);
     res.status(500).json({ message: 'Error inserting order.', error });
   }
 });
 
 // PUT /api/orders/:id
 app.put('/api/orders/:id', async (req, res) => {
   const { id } = req.params;
   const {
     order_date,
     visitors,
     orders,
     conversion_rate,
     average_order_value,
     revenue,
     cogs,
     marketing_spend,
     refunds,
     profit
   } = req.body;
 
   if (!order_date) {
     return res.status(400).json({ message: 'Order date is required.' });
   }
 
   try {
     const pool = await getPool();
     const result = await pool.request()
       .input('id', sql.Int, id)
       .input('order_date', sql.NVarChar, order_date)
       .input('visitors', sql.Int, visitors || 0)
       .input('orders', sql.Int, orders || 0)
       .input('conversion_rate', sql.Float, conversion_rate || 0)
       .input('average_order_value', sql.Float, average_order_value || 0)
       .input('revenue', sql.Float, revenue || 0)
       .input('cogs', sql.Float, cogs || 0)
       .input('marketing_spend', sql.Float, marketing_spend || 0)
       .input('refunds', sql.Int, refunds || 0)
       .input('profit', sql.Float, profit || 0)
       .query(`
         UPDATE Orders
         SET order_date = @order_date,
             visitors = @visitors,
             orders = @orders,
             conversion_rate = @conversion_rate,
             average_order_value = @average_order_value,
             revenue = @revenue,
             cogs = @cogs,
             marketing_spend = @marketing_spend,
             refunds = @refunds,
             profit = @profit
         WHERE id = @id;
         SELECT * FROM Orders WHERE id = @id;
       `);
 
     if (result.recordset && result.recordset.length > 0) {
       res.json(result.recordset[0]);
     } else {
       res.status(404).json({ message: 'Order not found.' });
     }
   } catch (error) {
     console.error('Error updating order:', error);
     res.status(500).json({ message: 'Error updating order.', error });
   }
 });
 
 // DELETE /api/orders/:id
 app.delete('/api/orders/:id', async (req, res) => {
   const { id } = req.params;
   try {
     const pool = await getPool();
     const result = await pool.request()
       .input('id', sql.Int, id)
       .query(`DELETE FROM Orders WHERE id = @id`);
 
     if (result.rowsAffected[0] > 0) {
       res.json({ message: 'Order deleted successfully.' });
     } else {
       res.status(404).json({ message: 'Order not found.' });
     }
   } catch (error) {
     console.error('Error deleting order:', error);
     res.status(500).json({ message: 'Error deleting order.', error });
   }
 });
 
 // Start server
 const PORT = process.env.PORT || 5000;
 app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
 });
 