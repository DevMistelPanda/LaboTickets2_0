require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const cors = require('cors');
const bodyParser = require('body-parser');
const ExcelJS = require('exceljs');
const path = require('path'); // 🔹 For static file serving
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 4000;
const SECRET = process.env.JWT_SECRET;

app.use(cors());
app.use(bodyParser.json());

// Create a connection pool for better performance
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Helper: hash password with sha256
function sha256(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Middleware: verify JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token fehlt' });

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Ungültiger Token' });
    req.user = user; // user contains { id, username, role, iat, exp }
    next();
  });
}

// Test DB connection on startup
async function testDatabaseConnection() {
  try {
    const conn = await pool.getConnection();
    console.log('✅ Database connection successful');
    conn.release();
  } catch (err) {
    console.error('❌ Failed to connect to the database:', err);
  }
}

// --- Routes ---

// Login route (public)
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: 'Benutzername und Passwort erforderlich' });

  try {
    const [rows] = await pool.execute(
      'SELECT * FROM accounts WHERE username = ?',
      [username]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Ungültiger Benutzer oder Passwort' });
    }

    const user = rows[0];
    const storedHash = user.password;
    // Use bcrypt to compare password
    const isMatch = await bcrypt.compare(password, storedHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Ungültiger Benutzer oder Passwort' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      SECRET,
      { expiresIn: '2h' }
    );

    res.json({ token, username: user.username, role: user.role });
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ message: 'Serverfehler' });
  }
});

// Get visitor list (public)
app.get('/api/visitors', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM besucher');
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Fehler beim Abrufen der Besucher' });
  }
});

// Get visitor stats (public)
app.get('/api/visitors/stats', async (req, res) => {
  try {
    const [results] = await pool.query(
      `SELECT 
        COUNT(*) AS total_visitors, 
        COUNT(CASE WHEN entered = 1 THEN 1 END) AS entered_visitors 
       FROM besucher`
    );
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Fehler beim Abrufen der Besucherstatistiken' });
  }
});

// Export visitor list as Excel (protected)
app.get('/api/visitors/download', authenticateToken, async (req, res) => {
  try {
    const [results, fields] = await pool.query('SELECT * FROM besucher');

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Besucher Liste');

    const headers = fields.map(f => f.name);
    worksheet.addRow(headers);

    results.forEach(row => {
      worksheet.addRow(headers.map(header => row[header] ?? ''));
    });

    worksheet.getRow(1).eachCell(cell => {
      cell.font = { bold: true };
    });
    worksheet.views = [{ state: 'frozen', ySplit: 1 }];

    res.setHeader(
      'Content-Disposition',
      'attachment; filename="SB_Besucher.xlsx"'
    );
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error('Excel export error:', err);
    res.status(500).send('Fehler beim Exportieren der Daten');
  }
});

// Hot news (public)
app.get('/api/news/hot', async (req, res) => {
  try {
    const [results] = await pool.query(
      'SELECT imp_news AS first_imp_news FROM news WHERE nr = 1'
    );
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Fehler beim Abrufen der Hot News' });
  }
});

// Pub news (public)
app.get('/api/news/pub', async (req, res) => {
  try {
    const [results] = await pool.query(
      'SELECT imp_news AS pub_news FROM news WHERE nr = 2'
    );
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Fehler beim Abrufen der Pub News' });
  }
});

// All news except hot and pub (public)
app.get('/api/news', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM news WHERE imp_news IS NULL');
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Fehler beim Abrufen der News' });
  }
});

// Submit general news (protected)
app.post('/api/news/sub_all', authenticateToken, async (req, res) => {
  const { title, text } = req.body;
  if (!title || !text) {
    return res.status(400).json({ message: 'Ungültige Daten' });
  }
  try {
    await pool.execute(
      'INSERT INTO news (imp_news, nr, news_title, news_text) VALUES (NULL, NULL, ?, ?)',
      [title, text]
    );
    res.json({ message: 'ok' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Fehler beim Hinzufügen der News' });
  }
});

// Submit hot news (protected)
app.post('/api/news/sub_hot', authenticateToken, async (req, res) => {
  const { hot_news } = req.body;
  if (!hot_news) {
    return res.status(400).json({ message: 'Ungültige Daten' });
  }
  try {
    await pool.execute(
      'UPDATE news SET imp_news = ? WHERE nr = 1',
      [hot_news]
    );
    res.json({ message: 'Hot News erfolgreich aktualisiert' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Fehler beim Aktualisieren der Hot News' });
  }
});

// Submit pub news (protected)
app.post('/api/news/sub_pub', authenticateToken, async (req, res) => {
  const { pub_news } = req.body;
  if (!pub_news) {
    return res.status(400).json({ message: 'Ungültige Daten' });
  }
  try {
    await pool.execute(
      'UPDATE news SET imp_news = ? WHERE nr = 2',
      [pub_news]
    );
    res.json({ message: 'Pub News erfolgreich aktualisiert' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Fehler beim Aktualisieren der Pub News' });
  }
});

// Tickets sold over time (by day)
app.get('/api/stats/sales-over-time', async (req, res) => {
  try {
    // Parse vdate (VARCHAR) as date using STR_TO_DATE
    const [results] = await pool.query(`
      SELECT 
        DATE(STR_TO_DATE(vdate, '%d/%m/%Y')) AS date, 
        COUNT(*) AS sold
      FROM besucher
      WHERE vdate IS NOT NULL AND vdate != ''
      GROUP BY DATE(STR_TO_DATE(vdate, '%d/%m/%Y'))
      ORDER BY DATE(STR_TO_DATE(vdate, '%d/%m/%Y'))
    `);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Fehler beim Abrufen der Verkaufsdaten' });
  }
});

// Tickets sold per class (numbers only)
app.get('/api/stats/sales-per-class', async (req, res) => {
  try {
    // Sortiere explizit nach Klassen 5-13 in der gewünschten Reihenfolge
    const [results] = await pool.query(`
      SELECT 
        REGEXP_REPLACE(class, '[^0-9]', '') AS class_number,
        COUNT(*) AS sold
      FROM besucher
      WHERE class IS NOT NULL AND class != ''
      GROUP BY class_number
      HAVING class_number IN ('5','6','7','8','9','10','11','12','13')
      ORDER BY FIELD(class_number, '5','6','7','8','9','10','11','12','13')
    `);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Fehler beim Abrufen der klassendaten' });
  }
});

// People entered over time (by entry HOUR, date irrelevant)
app.get('/api/stats/entered-over-time', async (req, res) => {
  try {
    // Extract hour from edate (VARCHAR) using STR_TO_DATE and TIME_FORMAT
    const [results] = await pool.query(`
      SELECT 
        LPAD(HOUR(STR_TO_DATE(SUBSTRING_INDEX(edate, ',', -1), ' %H:%i:%s')), 2, '0') AS hour,
        COUNT(*) AS entered
      FROM besucher
      WHERE edate IS NOT NULL AND edate != ''
      GROUP BY hour
      HAVING hour >= '15' AND hour <= '22'
      ORDER BY hour
    `);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Fehler beim Abrufen der Eintrittszeiten' });
  }
});

// Tickets sold per user
app.get('/api/stats/sales-per-user', async (req, res) => {
  try {
    const [results] = await pool.query(`
      SELECT 
        user AS username,
        COUNT(*) AS sold
      FROM besucher
      WHERE user IS NOT NULL AND user != ''
      GROUP BY username
      ORDER BY sold DESC
    `);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Fehler beim Abrufen der Verkaufszahlen pro Benutzer' });
  }
});

// 🔹 Static file serving (frontend)
app.use(express.static(path.join(__dirname, 'dist')));

// 🔹 Catch-all fallback for SPA routing
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// 🔹 Start server
testDatabaseConnection();
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
