/* ============================================================
   BRAND AID — Input Validation Middleware
   Reusable validators for routes
   ============================================================ */

/**
 * Validate registration fields
 */
const validateRegistration = (req, res, next) => {
  const { teamName, college, course, phone, members, email } = req.body;
  const errors = [];

  if (!teamName  || teamName.trim().length < 2)   errors.push('Team name must be at least 2 characters.');
  if (!college   || college.trim().length < 2)    errors.push('College name is required.');
  if (!course    || course.trim().length < 2)     errors.push('Course & year is required.');
  if (!phone     || !/^\+?\d{7,15}$/.test(phone.replace(/\s/g, ''))) errors.push('Valid phone number required.');
  if (!members   || members.trim().length < 2)   errors.push('At least one member name is required.');
  if (!email     || !/^\S+@\S+\.\S+$/.test(email)) errors.push('Valid email address required.');

  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: errors[0], errors });
  }

  next();
};

/**
 * Validate contact message fields
 */
const validateContact = (req, res, next) => {
  const { name, email, message } = req.body;
  const errors = [];

  if (!name    || name.trim().length < 2)              errors.push('Name must be at least 2 characters.');
  if (!email   || !/^\S+@\S+\.\S+$/.test(email))      errors.push('Valid email address required.');
  if (!message || message.trim().length < 10)          errors.push('Message must be at least 10 characters.');

  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: errors[0], errors });
  }

  next();
};

/**
 * Validate slogan generation request
 */
const validateSlogan = (req, res, next) => {
  const { product, audience } = req.body;

  if (!product  || product.trim().length < 2)  {
    return res.status(400).json({ success: false, message: 'Product name is required (min 2 chars).' });
  }
  if (!audience || audience.trim().length < 2) {
    return res.status(400).json({ success: false, message: 'Target audience is required (min 2 chars).' });
  }

  next();
};

module.exports = { validateRegistration, validateContact, validateSlogan };
