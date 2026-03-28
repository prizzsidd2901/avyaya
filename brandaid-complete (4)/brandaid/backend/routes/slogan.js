/* ============================================================
   BRAND AID — AI Slogan Generator Route
   POST /api/generate-slogan
   ============================================================ */

const express = require('express');
const router  = express.Router();
const { generateSlogan } = require('../controllers/sloganController');

/* Generate AI marketing slogans */
router.post('/', generateSlogan);

module.exports = router;
