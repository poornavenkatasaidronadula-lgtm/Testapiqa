const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

// Since Vercel hosts both on the same domain, cors is permissive
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_Yb3geuD5HzVk@ep-twilight-mud-amztxd7w-pooler.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require',
});

// Avoid running DDL on every single serverless invocation
// but keeping it safe with IF NOT EXISTS
const initializeDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        "firstName" VARCHAR(255),
        "lastName" VARCHAR(255),
        company VARCHAR(255),
        address VARCHAR(255),
        address2 VARCHAR(255),
        country VARCHAR(255),
        state VARCHAR(255),
        city VARCHAR(255),
        zipcode VARCHAR(50),
        mobile VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_email VARCHAR(255) REFERENCES users(email),
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(50),
        items JSONB,
        subtotal NUMERIC,
        shipping NUMERIC,
        total NUMERIC,
        address JSONB
      );
    `);
  } catch (err) {
    console.error("Error initializing database:", err);
  }
};

initializeDB();

// Signup Route
app.post('/api/signup', async (req, res) => {
  const { name, email, password, firstName, lastName, company, address, address2, country, state, city, zipcode, mobile } = req.body;
  
  try {
    const userExist = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExist.rows.length > 0) {
      return res.status(400).json({ error: 'Email already registered. Please login.' });
    }

    const newUser = await pool.query(
      `INSERT INTO users (name, email, password, "firstName", "lastName", company, address, address2, country, state, city, zipcode, mobile)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
      [name, email, password, firstName, lastName, company, address, address2, country, state, city, zipcode, mobile]
    );
    res.json(newUser.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error during signup' });
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
    if (user.rows.length > 0) {
      res.json(user.rows[0]);
    } else {
      res.status(400).json({ error: 'Invalid email or password. Please try again.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// Create Order Route
app.post('/api/orders', async (req, res) => {
  const { user_email, items, subtotal, shipping, total, address, status } = req.body;
  try {
    const newOrder = await pool.query(
      `INSERT INTO orders (user_email, items, subtotal, shipping, total, address, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [user_email, JSON.stringify(items), subtotal, shipping, total, JSON.stringify(address), status || 'Processing']
    );
    res.json(newOrder.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error creating order' });
  }
});

// Get User Orders Route
app.get('/api/orders/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const orders = await pool.query('SELECT * FROM orders WHERE user_email = $1 ORDER BY date DESC', [email]);
    res.json(orders.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error fetching orders' });
  }
});

// Delete Order Route
app.delete('/api/orders/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM orders WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error deleting order' });
  }
});

// Important: export the app for Vercel instead of app.listen()
module.exports = app;
