/* ============================================================
   BRAND AID — Contact Controller
   ============================================================ */

const messages = [];

/**
 * POST /api/contact
 * Save an incoming contact message
 */
const sendMessage = (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email address.' });
  }

  const entry = {
    id        : Date.now().toString(),
    name,
    email,
    message,
    receivedAt: new Date().toISOString(),
    read      : false
  };

  messages.push(entry);
  console.log(`✉ New contact message from: ${name} <${email}>`);

  /* 
    To send real emails, integrate nodemailer here:
    
    const transporter = nodemailer.createTransport({ ... });
    await transporter.sendMail({
      from   : process.env.EMAIL_FROM,
      to     : process.env.EMAIL_TO,
      subject: `Brand Aid Contact: ${name}`,
      text   : message
    });
  */

  return res.json({
    success : true,
    message : "Message received! We'll reply within 24 hours."
  });
};

module.exports = { sendMessage };
