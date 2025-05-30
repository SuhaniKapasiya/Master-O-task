const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");
const protect = require("../middleware/authMiddleware");
const { validateBet, rollAndPlay, getGameHistory } = require('../controllers/gameController');

// Route to roll dice and get result
router.post("/roll", protect, gameController.rollDice);

// Route to calculate result (win/loss)
router.post("/result", protect, gameController.calculateResult);

// Route to update player points (protected)
router.post("/update", protect, gameController.updatePoints);

// Play a round (roll dice, calculate, update, log) - all in one
router.post('/play', protect, validateBet, rollAndPlay);

// Get game history for user
router.get('/history', protect, getGameHistory);

module.exports = router;
