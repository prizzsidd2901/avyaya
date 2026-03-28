/* ============================================================
   BRAND AID — Registration Controller
   ============================================================ */

// In-memory store (replace with MongoDB/MySQL in production)
const registrations = [];

/**
 * POST /api/register
 * Register a new team for Brand Aid
 */
const registerTeam = (req, res) => {
  const { teamName, college, course, phone, members, email } = req.body;

  /* ── Validation ── */
  if (!teamName || !college || !course || !phone || !members || !email) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email address.' });
  }

  // Check for duplicate team name
  const duplicate = registrations.find(r => r.teamName.toLowerCase() === teamName.toLowerCase());
  if (duplicate) {
    return res.status(409).json({ success: false, message: 'Team name already registered.' });
  }

  /* ── Save ── */
  const registration = {
    id         : Date.now().toString(),
    teamName,
    college,
    course,
    phone,
    members    : members.split(',').map(m => m.trim()),
    email,
    registeredAt: new Date().toISOString(),
    status     : 'pending'
  };

  registrations.push(registration);

  console.log(`✅ New registration: ${teamName} from ${college}`);

  return res.status(201).json({
    success : true,
    message : 'Registration successful! You will receive a confirmation email shortly.',
    id      : registration.id
  });
};

/**
 * GET /api/register
 * Get all registrations (admin use)
 */
const getAllRegistrations = (req, res) => {
  return res.json({
    success : true,
    count   : registrations.length,
    data    : registrations
  });
};

module.exports = { registerTeam, getAllRegistrations };
