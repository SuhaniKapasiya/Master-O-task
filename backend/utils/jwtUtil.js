const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// Generate JWT for email verification (15 min expiry)
function generateVerificationToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '15m' });
}

// Verify JWT from email link
function verifyVerificationToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

module.exports = { generateVerificationToken, verifyVerificationToken };