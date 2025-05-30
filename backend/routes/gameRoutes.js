const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");
const protect = require("../middleware/authMiddleware");

// Route to roll dice and get result
router.post("/roll", protect, gameController.rollDice);

// Route to calculate result (win/loss)
router.post("/result", protect, gameController.calculateResult);

// Route to update player points (protected)
router.post("/update", protect, gameController.updatePoints);

module.exports = router;
