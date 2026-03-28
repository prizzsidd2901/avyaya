/* ============================================================
   BRAND AID - Product Advisor Route
   POST /api/product-advisor
   ============================================================ */

const express = require('express');
const router = express.Router();
const { productAdvisor } = require('../controllers/productAdvisorController');

router.post('/', productAdvisor);

module.exports = router;
