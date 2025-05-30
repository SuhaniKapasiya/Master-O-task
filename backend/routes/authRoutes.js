const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register
router.post('/register', authController.register);
// Email verification
router.get('/verify/:token', authController.verifyEmail);
// Login
router.post('/login', authController.login);

module.exports = router;