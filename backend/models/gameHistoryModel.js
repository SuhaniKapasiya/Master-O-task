const mongoose = require("mongoose");

const gameHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    betType: {
      type: String,
      enum: ["7up", "7down", "7"],
      required: true,
    },
    betAmount: {
      type: Number,
      required: true,
    },
    die1: {
      type: Number,
      required: true,
    },
    die2: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    win: {
      type: Boolean,
      required: true,
    },
    payout: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const GameHistory = mongoose.model("GameHistory", gameHistorySchema);

module.exports = GameHistory;
