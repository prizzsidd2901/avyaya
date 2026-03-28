/* ============================================================
   BRAND AID — Contact Route
   POST /api/contact
   ============================================================ */

const express = require('express');
const router  = express.Router();
const { sendMessage } = require('../controllers/contactController');

/* Send a contact message */
router.post('/', sendMessage);

module.exports = router;
