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
  res.send("This is where the game will go!");
});

app.listen(PORT, () => {
  console.log(`Serving up Battleship on port ${PORT}.`);
});
