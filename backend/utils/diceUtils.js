// Utility functions for dice operations
function rollDice() {
  // Returns an array with two random numbers between 1 and 6
  return [
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1
  ];
}

function getResultType(sum) {
  if (sum < 7) return 'down';
  if (sum === 7) return 'seven';
  return 'up';
}

module.exports = { rollDice, getResultType };
