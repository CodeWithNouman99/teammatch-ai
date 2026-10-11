// Runs when no route matched the URL
export function notFound(req, res) {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
}

// Runs when any route throws an error. Express knows it is the error handler
// because it has 4 parameters.
export function errorHandler(err, req, res, next) {
  // Data did not pass the model rules (missing field, wrong enum value)
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  }

  // The id in the URL is not a valid MongoDB id
  if (err.name === "CastError") {
    return res.status(400).json({ message: `Invalid ${err.path}: ${err.value}` });
  }

  // A unique field (like email) already exists
  if (err.code === 11000) {
    return res.status(409).json({ message: "This record already exists" });
  }

  // The request body is not valid JSON
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ message: "Request body is not valid JSON" });
  }

  console.error(err);
  res.status(500).json({ message: "Something went wrong on the server" });
}