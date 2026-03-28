/* ============================================================
   BRAND AID - Product Advisor Controller
   Explains a product, maps it to customer needs, and suggests
   practical product enhancements.
   ============================================================ */

const fetch = (...args) => import('node-fetch').then(({ default: f }) => f(...args));

/**
 * POST /api/product-advisor
 * Body: {
 *   product: string,
 *   details?: string,
 *   customerRequirement: string,
 *   chatHistory?: Array<{ role: string, content: string }>
 * }
 */
const productAdvisor = async (req, res) => {
  const {
    product,
    details = '',
    customerRequirement,
    chatHistory = []
  } = req.body || {};

  if (!product || !customerRequirement) {
    return res.status(400).json({
      success: false,
      message: 'Product name and customer requirement are required.'
    });
  }

  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

  if (!ANTHROPIC_API_KEY) {
    return res.json({
      success: true,
      reply: generateFallbackAdvice(product, details, customerRequirement)
    });
  }

  try {
    const sanitizedHistory = Array.isArray(chatHistory)
      ? chatHistory
          .filter(item => item && typeof item.content === 'string' && typeof item.role === 'string')
          .slice(-6)
          .map(item => ({
            role: item.role === 'assistant' ? 'assistant' : 'user',
            content: item.content.trim()
          }))
          .filter(item => item.content)
      : [];

    const historyText = sanitizedHistory.length
      ? `Recent chat context:\n${sanitizedHistory.map(item => `${item.role.toUpperCase()}: ${item.content}`).join('\n')}\n\n`
      : '';

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 500,
        system: [
          'You are Brand Aid Product Advisor, a helpful website chatbot.',
          'Your job is to explain the product clearly, connect it to the customer requirement, and suggest realistic product enhancements.',
          'Use simple business-friendly language.',
          'Avoid hype, avoid markdown headings, and keep the response compact but useful.',
          'Structure the answer in 4 short labeled parts exactly:',
          'Product Explanation:',
          'Customer Fit:',
          'Recommended Enhancements:',
          'Suggested Reply to Customer:'
        ].join(' '),
        messages: [{
          role: 'user',
          content: [
            historyText,
            `Product: ${product}`,
            `Product details from website: ${details || 'No extra product details were provided.'}`,
            `Customer requirement: ${customerRequirement}`,
            '',
            'Respond in the required 4-part format. Include 3 enhancement suggestions max.'
          ].join('\n')
        }]
      })
    });

    const data = await response.json();
    const reply = data.content?.[0]?.text?.trim();

    if (!reply) {
      throw new Error('Empty response from AI provider');
    }

    return res.json({ success: true, reply });
  } catch (error) {
    console.error('Product advisor error:', error.message);
    return res.json({
      success: true,
      reply: generateFallbackAdvice(product, details, customerRequirement)
    });
  }
};

function generateFallbackAdvice(product, details, customerRequirement) {
  const detailLine = details
    ? ` It appears to focus on ${details.trim().replace(/\s+/g, ' ').slice(0, 180)}.`
    : '';

  const enhancementIdeas = buildEnhancementIdeas(customerRequirement, details);

  return [
    `Product Explanation: ${product} is positioned as a solution for customers who need a reliable and easy-to-understand product experience.${detailLine}`,
    `Customer Fit: For this requirement - "${customerRequirement}" - the strongest value is how ${product} can reduce friction, solve the main pain point faster, and create a clearer benefit for the buyer.`,
    `Recommended Enhancements: 1. ${enhancementIdeas[0]} 2. ${enhancementIdeas[1]} 3. ${enhancementIdeas[2]}`,
    `Suggested Reply to Customer: ${product} can support your need around "${customerRequirement}" by focusing on usability, measurable value, and a better end-user experience. We can also improve it further with the enhancements listed above to make it even more aligned with your expectations.`
  ].join('\n\n');
}

function buildEnhancementIdeas(customerRequirement, details) {
  const combined = `${customerRequirement} ${details}`.toLowerCase();
  const ideas = [];

  if (combined.includes('price') || combined.includes('budget') || combined.includes('cost')) {
    ideas.push('add a lower-cost package or entry plan for price-sensitive buyers');
  }
  if (combined.includes('fast') || combined.includes('quick') || combined.includes('speed')) {
    ideas.push('improve onboarding and performance so customers see value faster');
  }
  if (combined.includes('support') || combined.includes('help') || combined.includes('service')) {
    ideas.push('offer stronger support options such as guided setup or live assistance');
  }
  if (combined.includes('custom') || combined.includes('personal') || combined.includes('flexible')) {
    ideas.push('add more customization so the product fits different customer workflows');
  }
  if (combined.includes('team') || combined.includes('business') || combined.includes('company')) {
    ideas.push('include team collaboration and admin controls for business users');
  }
  if (combined.includes('secure') || combined.includes('privacy') || combined.includes('safe')) {
    ideas.push('strengthen trust with clearer privacy, security, and data protection features');
  }

  const defaults = [
    'clarify the product benefits with a simpler value proposition on the website',
    'add customer feedback loops to guide future product updates',
    'introduce one standout feature that directly addresses the biggest customer pain point'
  ];

  for (const item of defaults) {
    if (ideas.length >= 3) break;
    if (!ideas.includes(item)) ideas.push(item);
  }

  return ideas.slice(0, 3);
}

module.exports = { productAdvisor };
