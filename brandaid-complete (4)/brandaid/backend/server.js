/* ============================================================
   BRAND AID — Backend Server (Node.js + Express)
   
   Run:  npm install
         npm start         (production)
         npm run dev       (development with nodemon)
   ============================================================ */

require('dotenv').config();

const express  = require('express');
const cors     = require('cors');
const morgan   = require('morgan');
const path     = require('path');

const registrationRoutes = require('./routes/registration');
const submissionRoutes   = require('./routes/submission');
const voteRoutes         = require('./routes/vote');
const contactRoutes      = require('./routes/contact');
const sloganRoutes       = require('./routes/slogan');
const leaderboardRoutes  = require('./routes/leaderboard');
const productAdvisorRoutes = require('./routes/productAdvisor');

const app  = express();
const PORT = process.env.PORT || 3000;

/* ── MIDDLEWARE ── */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

/* ── SERVE FRONTEND (static files) ── */
app.use(express.static(path.join(__dirname, '../frontend')));

/* ── API ROUTES ── */
app.use('/api/register',    registrationRoutes);
app.use('/api/submit',      submissionRoutes);
app.use('/api/vote',        voteRoutes);
app.use('/api/contact',     contactRoutes);
app.use('/api/generate-slogan', sloganRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/product-advisor', productAdvisorRoutes);

/* ── HEALTH CHECK ── */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

/* ── CATCH-ALL — Serve index.html for any unmatched route ── */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

/* ── ERROR HANDLER ── */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

/* ── START SERVER ── */
app.listen(PORT, () => {
  console.log(`\n🚀 Brand Aid server running at http://localhost:${PORT}`);
  console.log(`   Environment : ${process.env.NODE_ENV || 'development'}`);
  console.log(`   Frontend    : http://localhost:${PORT}/index.html\n`);
});
