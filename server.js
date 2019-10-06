const express = require('express');
const cookieSession = require('cookie-session');
const uuid = require('uuid/v1');
const Game = require('./lib/game.js');
const PORT = 3000;

const app = express();

app.set('view engine', 'ejs');
app.use(cookieSession({
  name: 'battleship',
  secret: 'thisissupersecret'
}));

const newPlayer = () => {
  return uuid();
};

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/game/new', (req, res) => {
  let playerID;
  if (req.session.player_id) {
    playerID = req.session.playerID;
  } else {
    playerID = newPlayer();
    req.session.playerID = playerID;
  }

  const game = new Game(playerID);

  res.redirect(`/game/${game.id}`);
});

app.get('/game/:id', (req, res) => {
  Game.find(req.params.id, (game) => {
    if (game.shipsArePlaced) {
      return res.redirect(`/game/${game.id}/place_ships`);
    }

    const templateVars = {
      playerBoard: game.myBoard,
      oponentBoard: game.oponentBoard
    };

    res.render('game/board.ejs', templateVars);
  });
});

app.listen(PORT, () => {
  console.log(`Serving up Battleship on port ${PORT}.`);
});
