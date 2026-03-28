/* ============================================================
   BRAND AID — Leaderboard Route
   GET  /api/leaderboard
   POST /api/leaderboard/update  (admin)
   ============================================================ */

const express = require('express');
const router  = express.Router();
const { getLeaderboard, updateScore } = require('../controllers/leaderboardController');

/* Get current leaderboard */
router.get('/', getLeaderboard);

/* Update a team score (admin) */
router.post('/update', updateScore);

module.exports = router;
