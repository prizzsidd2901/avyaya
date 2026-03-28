/* ============================================================
   BRAND AID — Leaderboard Controller
   ============================================================ */

// In-memory leaderboard (replace with DB in production)
let leaderboard = [
  { rank: 1, teamName: 'The Brand Hunters',  round1: 28, round2: 31, round3: 29, total: 88 },
  { rank: 2, teamName: 'Pixel Pitch Co.',    round1: 27, round2: 28, round3: 29, total: 84 },
  { rank: 3, teamName: 'Ad Alchemists',      round1: 25, round2: 27, round3: 27, total: 79 },
  { rank: 4, teamName: 'MarketMind Squad',   round1: 24, round2: 26, round3: 24, total: 74 },
  { rank: 5, teamName: 'Creative Catalyst',  round1: 22, round2: 24, round3: 23, total: 69 }
];

/**
 * GET /api/leaderboard
 * Returns current leaderboard sorted by total score
 */
const getLeaderboard = (req, res) => {
  const sorted = [...leaderboard].sort((a, b) => b.total - a.total);
  sorted.forEach((t, i) => t.rank = i + 1);

  return res.json({ success: true, data: sorted });
};

/**
 * POST /api/leaderboard/update
 * Body: { teamName, round1?, round2?, round3? }
 * Updates scores for a team (admin use)
 */
const updateScore = (req, res) => {
  const { teamName, round1, round2, round3 } = req.body;

  if (!teamName) {
    return res.status(400).json({ success: false, message: 'teamName is required.' });
  }

  const team = leaderboard.find(t => t.teamName.toLowerCase() === teamName.toLowerCase());

  if (!team) {
    // Add new team
    const newTeam = {
      rank     : leaderboard.length + 1,
      teamName,
      round1   : Number(round1) || 0,
      round2   : Number(round2) || 0,
      round3   : Number(round3) || 0,
      total    : (Number(round1) || 0) + (Number(round2) || 0) + (Number(round3) || 0)
    };
    leaderboard.push(newTeam);
    return res.json({ success: true, message: 'Team added.', data: newTeam });
  }

  // Update existing team
  if (round1 !== undefined) team.round1 = Number(round1);
  if (round2 !== undefined) team.round2 = Number(round2);
  if (round3 !== undefined) team.round3 = Number(round3);
  team.total = team.round1 + team.round2 + team.round3;

  console.log(`📊 Score updated for: ${teamName} → Total: ${team.total}`);

  return res.json({ success: true, message: 'Score updated.', data: team });
};

module.exports = { getLeaderboard, updateScore };
