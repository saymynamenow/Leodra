import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const createToken = async (payload) => {
  try {
    const secret = process.env.JWT_SECRET;
    return jwt.sign(payload, secret, { expiresIn: "1h" });
  } catch (error) {
    console.error("Error creating JWT token:", error);
  }
};

export const createRefreshToken = (payload) => {
  try {
    const secret = process.env.REFRESH_TOKEN_SECRET;
    return jwt.sign(payload, secret, { expiresIn: "7d" });
  } catch (error) {
    console.error("Error creating refresh token:", error);
  }
};

export const verifyToken = (token) => {
  try {
    const secret = process.env.JWT_SECRET;
    return jwt.verify(token, secret);
  } catch (error) {
    console.error("Error verifying JWT token:", error);
  }
};

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
};
