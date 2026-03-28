/* ============================================================
   BRAND AID — Submission Controller
   ============================================================ */

const submissions = [];

/**
 * POST /api/submit
 * Submit a creative entry (slogan / ad copy)
 */
const submitEntry = (req, res) => {
  const { teamName, email, slogan, type } = req.body;

  if (!slogan && !type) {
    return res.status(400).json({ success: false, message: 'At least a slogan or submission type is required.' });
  }

  const entry = {
    id          : Date.now().toString(),
    teamName    : teamName || 'Anonymous',
    email       : email   || '',
    slogan      : slogan  || '',
    type        : type    || 'Slogan',
    submittedAt : new Date().toISOString()
  };

  submissions.push(entry);
  console.log(`📥 New submission from: ${entry.teamName}`);

  return res.status(201).json({
    success : true,
    message : 'Entry submitted successfully!',
    id      : entry.id
  });
};

/**
 * GET /api/submit
 * Get all submissions (admin)
 */
const getAllSubmissions = (req, res) => {
  return res.json({
    success : true,
    count   : submissions.length,
    data    : submissions
  });
};

module.exports = { submitEntry, getAllSubmissions };
