/* ============================================================
   BRAND AID — Registration Route
   POST /api/register
   ============================================================ */

const express = require('express');
const router  = express.Router();
const { registerTeam, getAllRegistrations } = require('../controllers/registrationController');

/* Register a new team */
router.post('/', registerTeam);

/* Get all registrations (admin use) */
router.get('/', getAllRegistrations);

module.exports = router;
