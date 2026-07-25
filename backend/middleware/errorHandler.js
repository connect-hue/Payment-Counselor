const errorHandler = (err, req, res, next) => {
  console.error("Error path:", req.path);
  console.error(err);

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  // Mongoose duplicate key error (code 11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      message: `A record with this ${field} already exists.`,
      error: process.env.NODE_ENV === "production" ? null : err.message,
    });
  }

  // Mongoose validation errors
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((val) => val.message);
    return res.status(400).json({
      message: "Validation Error",
      errors: messages,
    });
  }

  res.json({
    message: err.message || "An unexpected server error occurred.",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export default errorHandler;
