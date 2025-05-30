const Player = require("../models/playerModel");
const User = require('../models/userModel');

exports.getOrCreatePlayer = async (req, res) => {
  try {
    // Accept userId from JWT (preferred) or from body for backward compatibility
    const userId = req.user ? req.user.userId : req.body.userId;
    const username = req.body.username;
    if (!userId && !username)
      return res.status(400).json({ error: "UserId or Username is required" });

    let player;
    if (userId) {
      player = await Player.findOne({ user: userId });
      if (!player) {
        // If username is not provided, fallback to user's username
        let name = username;
        if (!name) {
          const user = await User.findById(userId);
          name = user ? user.username : undefined;
        }
        player = await Player.create({ user: userId, username: name });
        console.log(`New player created for user: ${userId}`);
      } else {
        console.log(`Player fetched for user: ${userId}`);
      }
    } else {
      // Fallback: legacy support by username
      player = await Player.findOne({ username });
      if (!player) {
        player = await Player.create({ username });
        console.log(`New player created: ${username}`);
      } else {
        console.log(`Player fetched: ${username}`);
      }
    }
    res.status(200).json(player);
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
    console.log(`Dice rolled: ${die1}, ${die2} (Total: ${total})`);
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
    console.log(
      `Result calculated: betType=${betType}, total=${total}, win=${win}, payout=${payout}`
    );
    res.status(200).json({ win, payout });
  } catch (error) {
    console.error("Error in calculateResult:", error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.updatePoints = async (req, res) => {
  try {
    const { username, newPoints } = req.body;
    const player = await Player.findOneAndUpdate(
      { username },
      { points: newPoints },
      { new: true }
    );
    if (!player) {
      console.error(`Player not found for update: ${username}`);
      return res.status(404).json({ error: "Player not found" });
    }
    console.log(`Points updated for ${username}: ${newPoints}`);
    res.status(200).json(player);
  } catch (error) {
    console.error("Error in updatePoints:", error.message);
    res.status(500).json({ error: error.message });
  }
};
