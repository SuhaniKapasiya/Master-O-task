const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const protect = require('../middleware/authMiddleware');

// Route to get or create a player (protected)
router.post('/player', protect, gameController.getOrCreatePlayer);

// Route to roll dice and get result
router.post('/roll', gameController.rollDice);

// Route to calculate result (win/loss)
router.post('/result', gameController.calculateResult);

// Route to update player points
router.post('/update', gameController.updatePoints);

module.exports = router;