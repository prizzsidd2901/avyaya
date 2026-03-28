/* ============================================================
   BRAND AID — Submission Route
   POST /api/submit
   GET  /api/submit  (admin)
   ============================================================ */

const express = require('express');
const router  = express.Router();
const { submitEntry, getAllSubmissions } = require('../controllers/submissionController');

/* Submit a creative entry */
router.post('/', submitEntry);

/* Get all submissions (admin) */
router.get('/', getAllSubmissions);

module.exports = router;
