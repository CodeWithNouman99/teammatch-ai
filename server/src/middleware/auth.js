import jwt from "jsonwebtoken";

// Reads the token from the header "Authorization: Bearer <token>"
// and returns the user data stored inside it, or null if it is missing or invalid.
function getUserFromToken(req) {
  const header = req.headers.authorization || "";
  if (!header.startsWith("Bearer ")) return null;

  try {
    const token = header.split(" ")[1];
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

// Only logged-in users can pass
export function protect(req, res, next) {
  const user = getUserFromToken(req);
  if (!user) {
    return res.status(401).json({ message: "Not logged in or token expired" });
  }
  req.user = user;
  next();
}

// n8n can pass with a secret key, everyone else needs to be logged in
export function allowN8nOrUser(req, res, next) {
  const key = req.headers["x-api-key"];
  if (key && key === process.env.N8N_API_KEY) {
    req.isN8n = true;
    return next();
  }
  return protect(req, res, next);
}