const express = require('express');
const cookieSession = require('cookie-session');
const PORT = 3000;

const app = express();

app.set('view engine', 'ejs');
app.use(cookieSession({
  name: 'battleship',
  secret: 'thisissupersecret'
}));

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/game/new', (req, res) => {

});

app.listen(PORT, () => {
  console.log(`Serving up Battleship on port ${PORT}.`);
});
