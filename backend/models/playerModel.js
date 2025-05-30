const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, 
    },
    points: {
      type: Number,
      default: 5000,
    },
  },
  { timestamps: true }
);

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
