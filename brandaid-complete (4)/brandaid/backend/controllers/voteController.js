/* ============================================================
   BRAND AID — Voting Controller
   ============================================================ */

// Vote counts per team (keyed by teamId)
const votes = { 1: 186, 2: 72, 3: 42 };

// Track voter IPs to prevent duplicate votes
const voterIPs = new Set();

/**
 * POST /api/vote
 * Cast a vote for a team
 */
const castVote = (req, res) => {
  const { teamId } = req.body;

  if (!teamId || ![1, 2, 3].includes(Number(teamId))) {
    return res.status(400).json({ success: false, message: 'Invalid team ID.' });
  }

  // One vote per IP
  const voterIP = req.ip || req.connection.remoteAddress;
  if (voterIPs.has(voterIP)) {
    return res.status(409).json({ success: false, message: 'You have already voted.' });
  }

  voterIPs.add(voterIP);
  votes[Number(teamId)]++;

  console.log(`🗳 Vote cast for Team ${teamId}. Totals:`, votes);

  return res.json({
    success : true,
    message : 'Vote recorded!',
    results : getVoteResults()
  });
};

/**
 * GET /api/vote/results
 * Get current voting results with percentages
 */
const getResults = (req, res) => {
  return res.json({ success: true, results: getVoteResults() });
};

/* Helper: compute percentages */
function getVoteResults() {
  const total = Object.values(votes).reduce((a, b) => a + b, 0);
  return Object.entries(votes).map(([id, count]) => ({
    teamId     : Number(id),
    votes      : count,
    percentage : total > 0 ? Math.round((count / total) * 100) : 0
  }));
}

module.exports = { castVote, getResults };
