/* ============================================================
   BRAND AID — Voting Route
   POST /api/vote
   GET  /api/vote/results
   ============================================================ */

const express = require('express');
const router  = express.Router();
const { castVote, getResults } = require('../controllers/voteController');

/* Cast a vote */
router.post('/', castVote);

/* Get voting results */
router.get('/results', getResults);

module.exports = router;
