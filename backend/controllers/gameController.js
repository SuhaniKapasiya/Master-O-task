const User = require("../models/userModel");

exports.getOrCreatePlayer = async (req, res) => {
  try {
    const userId = req.user ? req.user.userId : req.body.userId;
    if (!userId) return res.status(400).json({ error: "UserId is required" });
    let user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    // Player info is now part of User model
    res.status(200).json({ username: user.username, points: user.points });
  } catch (error) {
    console.error("Error in getOrCreatePlayer:", error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.rollDice = (req, res) => {
  try {
    const die1 = Math.floor(Math.random() * 6) + 1;
    const die2 = Math.floor(Math.random() * 6) + 1;
    const total = die1 + die2;
    // console.log(`Dice rolled: ${die1}, ${die2} (Total: ${total})`);
    res.status(200).json({ die1, die2, total });
  } catch (error) {
    console.error("Error in rollDice:", error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.calculateResult = (req, res) => {
  try {
    const { betType, betAmount, total } = req.body;
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

    res.status(200).json({ win, payout });
  } catch (error) {
    console.error("Error in calculateResult:", error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.updatePoints = async (req, res) => {
  try {
    const { userId, newPoints } = req.body;
    if (!userId) return res.status(400).json({ error: "UserId is required" });
    const user = await User.findByIdAndUpdate(
      userId,
      { points: newPoints },
      { new: true }
    );
    if (!user) {
      console.error(`User not found for update: ${userId}`);
      return res.status(404).json({ error: "User not found" });
    }
    console.log(`Points updated for ${user.username}: ${newPoints}`);
    res.status(200).json({ username: user.username, points: user.points });
  } catch (error) {
    console.error("Error in updatePoints:", error.message);
    res.status(500).json({ error: error.message });
  }
};
