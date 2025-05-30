const { rollDice, getResultType } = require('../utils/diceUtils');
const gameModel = require('../models/gameModel');

// POST /api/game/roll
exports.roll = (req, res) => {
  const { betType, betAmount } = req.body;
  if (!['up', 'down', 'seven'].includes(betType) || ![100, 200, 500].includes(betAmount)) {
    return res.status(400).json({ error: 'Invalid bet type or amount' });
  }

  const [die1, die2] = rollDice();
  const sum = die1 + die2;
  const resultType = getResultType(sum);
  let win = false;
  let payout = 0;

  if (betType === resultType) {
    win = true;
    payout = betType === 'seven' ? betAmount * 5 : betAmount * 2;
  } else {
    payout = -betAmount;
  }

  const newPoints = gameModel.updatePoints(payout);

  res.json({
    dice: [die1, die2],
    sum,
    resultType,
    win,
    payout,
    points: newPoints
  });
};

// GET /api/game/points
exports.getPoints = (req, res) => {
  res.json({ points: gameModel.getPoints() });
};
