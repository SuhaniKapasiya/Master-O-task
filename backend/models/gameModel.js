// Game data model (in-memory for now)
class Game {
  constructor() {
    this.points = 5000;
  }

  updatePoints(amount) {
    this.points += amount;
    return this.points;
  }

  getPoints() {
    return this.points;
  }
}

module.exports = new Game();
