const uuid = require('uuid/v1');
const fs = require('fs');

class Game {
  constructor(playerID) {
    this._playerID = playerID;
    this._id = uuid();
    this._myBoard = [[0], [0]];
    this._oponentBoard = [[1], [1]];

    fs.open(`./games/${this._id}.json`, 'w+', (err, fd) => {
      if (err) throw err;

      const gameData = JSON.stringify({
        myBoard: this._myBoard,
        oponentBoard: this._oponentBoard
      });

      fs.write(fd, gameData), (err) => {
        if (err) throw err;
      };

      fs.close(fd, (err) => {
        if (err) throw err;
      });
    });
  }

  static find(id, callback) {
    fs.readFile(`./games/${id}.json`, {encoding: 'utf8'}, (err, data) => {
      if (err) throw err;

      const game = new Game('a');
      const gameData = JSON.parse(data);
      game._myBoard = gameData.myBoard;
      game._oponentBoard = gameData.oponentBoard;

      callback(game);
    });
  }

  get id() {
    return this._id;
  }

  get myBoard() {
    return this._myBoard;
  }

  get oponentBoard() {
    return this._oponentBoard;
  }
}

module.exports = Game;
