const User = require("../models/userModel");
const GameHistory = require("../models/gameHistoryModel");
const { body, validationResult } = require("express-validator");

exports.validateBet = [
  body("betType").isIn(["7up", "7down", "7"]).withMessage("Invalid bet type"),
  body("betAmount").isIn([100, 200, 500]).withMessage("Invalid bet amount"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.rollAndPlay = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { betType, betAmount } = req.body;

    const user = await User.findOneAndUpdate(
      { _id: userId, points: { $gte: betAmount } },
      { $inc: { points: -betAmount } },
      { new: true }
    );
    if (!user) return res.status(400).json({ error: "Insufficient points" });

    const die1 = Math.floor(Math.random() * 6) + 1;
    const die2 = Math.floor(Math.random() * 6) + 1;
    const total = die1 + die2;

    let win = false;
    let payout = 0;
    if (betType === "7up" && total > 7) {
      win = true;
      payout = betAmount * 2;
    } else if (betType === "7down" && total < 7) {
      win = true;
      payout = betAmount * 2;
    } else if (betType === "7" && total === 7) {
      win = true;
      payout = betAmount * 5;
    }

    let updatedUser = user;
    if (win && payout > 0) {
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { $inc: { points: payout } },
        { new: true }
      );
    }

    await GameHistory.create({
      user: userId,
      betType,
      betAmount,
      die1,
      die2,
      total,
      win,
      payout,
    });
    res.status(200).json({
      die1,
      die2,
      total,
      win,
      payout,
      points: updatedUser.points,
    });
  } catch (error) {
    console.error("Error in rollAndPlay:", error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.getGameHistory = async (req, res) => {
  try {
    const userId = req.user.userId;
    const history = await GameHistory.find({ user: userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
