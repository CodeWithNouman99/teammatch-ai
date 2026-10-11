import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function login(req, res) {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() });

  // Same message for wrong email and wrong password,
  // so nobody can find out which emails exist.
  const passwordMatches = user ? await bcrypt.compare(password, user.passwordHash) : false;
  if (!passwordMatches) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign(
    { id: user._id, name: user.name, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
}