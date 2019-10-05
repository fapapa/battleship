const express = require('express');
const PORT = 3000;

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/game/new', (req, res) => {
  res.send('This will eventually start a new game');
});

app.listen(PORT, () => {
  console.log(`Serving up Battleship on port ${PORT}.`);
});
