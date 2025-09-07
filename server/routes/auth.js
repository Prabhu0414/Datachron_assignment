// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticate = require('../middleware/auth');
const permit = require('../middleware/roles');

// Public register (will create Member). To create Admin, authenticated Admin should call /register with role=Admin
router.post('/register', authenticateOptional, authController.register);

// Public login
router.post('/login', authController.login);

// Helper middleware to allow optional authentication for register route
function authenticateOptional(req, res, next) {
  // attempt to read token but don't fail if absent
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) return next();
  try {
    const jwt = require('jsonwebtoken');
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach minimal user info; full user will be reloaded in controller if needed
    req.user = { id: payload.id, role: payload.role };
  } catch (err) {
    // ignore invalid token for optional auth
  }
  return next();
}

module.exports = router;
