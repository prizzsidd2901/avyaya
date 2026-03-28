/* ============================================================
   BRAND AID — Request Logger Middleware
   Logs every incoming request with timestamp, method, URL
   ============================================================ */

const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method    = req.method.padEnd(6);
  const url       = req.originalUrl;
  const ip        = req.ip || req.connection.remoteAddress;

  console.log(`[${timestamp}] ${method} ${url}  (${ip})`);
  next();
};

module.exports = requestLogger;
