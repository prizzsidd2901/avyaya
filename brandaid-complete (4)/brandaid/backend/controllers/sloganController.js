/* ============================================================
   BRAND AID — AI Slogan Generator Controller
   Uses Anthropic Claude API as a backend proxy
   (keeps API key secure on the server side)
   ============================================================ */

const fetch = (...args) => import('node-fetch').then(({ default: f }) => f(...args));

/**
 * POST /api/generate-slogan
 * Body: { product: string, audience: string }
 * Returns: { success: true, slogan: string }
 */
const generateSlogan = async (req, res) => {
  const { product, audience } = req.body;

  if (!product || !audience) {
    return res.status(400).json({ success: false, message: 'Product and audience are required.' });
  }

  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

  if (!ANTHROPIC_API_KEY) {
    // Return fallback slogans if API key not configured
    return res.json({
      success : true,
      slogan  : generateFallback(product, audience)
    });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method  : 'POST',
      headers : {
        'Content-Type'      : 'application/json',
        'x-api-key'         : ANTHROPIC_API_KEY,
        'anthropic-version' : '2023-06-01'
      },
      body: JSON.stringify({
        model      : 'claude-sonnet-4-20250514',
        max_tokens : 200,
        system     : 'You are a world-class marketing copywriter. Generate exactly 3 short, punchy, memorable marketing slogans. Return ONLY the 3 slogans numbered 1. 2. 3. — nothing else.',
        messages   : [{
          role    : 'user',
          content : `Product: ${product}\nTarget Audience: ${audience}\n\nGenerate 3 marketing slogans.`
        }]
      })
    });

    const data   = await response.json();
    const slogan = data.content?.[0]?.text?.trim();

    if (!slogan) throw new Error('Empty response from Claude');

    console.log(`🤖 Slogan generated for: ${product} / ${audience}`);

    return res.json({ success: true, slogan });

  } catch (err) {
    console.error('Slogan generation error:', err.message);
    return res.json({
      success : true,
      slogan  : generateFallback(product, audience)
    });
  }
};

/* Fallback slogans when API is unavailable */
function generateFallback(product, audience) {
  const templates = [
    `1. "${product}: Built for ${audience} who dare to be different."\n2. "More than ${product}. A statement for ${audience}."\n3. "${audience} don't settle. Neither does ${product}."`,
    `1. "Fuel your world — ${product} gets ${audience} going."\n2. "${product}. Because ${audience} deserve the best."\n3. "Dream bold, live loud — ${product} for ${audience}."`,
    `1. "${product} — The smart choice for ${audience}."\n2. "See the future. Choose ${product}."\n3. "${audience} deserve better. ${product} delivers."`
  ];
  return templates[Math.floor(Math.random() * templates.length)];
}

module.exports = { generateSlogan };
