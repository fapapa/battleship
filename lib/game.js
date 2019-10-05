const uuid = require('uuid/v1');

class Game {
  constructor(playerID) {
    this._playerID = playerID;
    this._id = uuid();
  }

  get id() {
    return this._id;
  }
}

module.exports = Game;
