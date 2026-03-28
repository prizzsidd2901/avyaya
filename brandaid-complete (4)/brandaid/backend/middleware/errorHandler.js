/* ============================================================
   BRAND AID — Global Error Handler Middleware
   ============================================================ */

const errorHandler = (err, req, res, next) => {
  const status  = err.status || 500;
  const message = err.message || 'Internal server error';

  console.error(`❌ Error [${status}]: ${message}`);
  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack);
  }

  res.status(status).json({
    success : false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

const notFound = (req, res, next) => {
  const err = new Error(`Route not found: ${req.originalUrl}`);
  err.status = 404;
  next(err);
};

module.exports = { errorHandler, notFound };
