const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");
const protect = require("../middleware/authMiddleware");
const {
  validateBet,
  rollAndPlay,
  getGameHistory,
} = require("../controllers/gameController");

router.post("/play", protect, validateBet, rollAndPlay);

router.get("/history", protect, getGameHistory);

module.exports = router;
