require('dotenv').config(); // load .env variables
const express = require('express');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 4000;
const SECRET = process.env.JWT_SECRET;

app.use(cors());
app.use(bodyParser.json());

const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// Helper: hash with sha256
function sha256(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Test DB connection on startup
async function testDatabaseConnection() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('✅ Database connection successful');
    await connection.end();
  } catch (err) {
    console.error('❌ Failed to connect to the database:', err);
  }
}

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Successfully connected to the database');

    const [rows] = await connection.execute(
      'SELECT * FROM accounts WHERE username = ?',
      [username]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Ungültiger Benutzer oder Passwort' });
    }

    const user = rows[0];
    const inputHash = sha256(password);

    if (inputHash !== user.password) {
      return res.status(401).json({ message: 'Ungültiger Benutzer oder Passwort' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET, {
      expiresIn: '2h',
    });

    res.json({ token });
  } catch (err) {
    console.error('❌ Login error or DB connection failed:', err);
    res.status(500).json({ message: '500 Server error' });
  } finally {
    if (connection) {
      try {
        await connection.end();
        console.log('🔌 Database connection closed');
      } catch (closeErr) {
        console.error('⚠️ Error closing the DB connection:', closeErr);
      }
    }
  }
});

// Run DB test, then start the server
testDatabaseConnection();

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
