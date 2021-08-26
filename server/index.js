const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
const connection = require('../database/connection.js');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../dist')));

app.get('/', (req, res) => {
  res.sendStatus(200);
})
app.get('/game', (req, res) => {

  axios.get(`https://www.giantbomb.com/api/search/?api_key=dbbeaebbcf26215fc71a790a44e6f8e9dbb0cabe&query=${req.query.searchTerm}&format=json&resources=game`, {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  })
    .then((response) => {
      res.send(response.data.results);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
})

app.post('/create', (req, res) => {
  console.log(req.query)
  let queryArgs = [req.query.username, req.query.password];
  connection.query('INSERT INTO Users (username, password) VALUES (?, ?)', queryArgs, (err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      connection.query('SELECT id FROM Users ORDER BY id DESC LIMIT 1', (err, result) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          res.status(201);
          res.send(result);
        }
      })

    }
  })
})

app.post('/addToFavs', (req, res) => {
  let queryArgs = [req.body.userId, JSON.stringify(req.body.game)]
  connection.query('INSERT INTO Favorites (user_id, game) VALUES (?, ?)', queryArgs, (err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      connection.query('SELECT game FROM Favorites WHERE user_id = ?', [req.body.userId], (err, result) => {
        if (err) {
          res.sendStatus(500);
        } else {
          res.status(201);
          res.send(result);
        }
      })
    }
  })
})
app.listen(port, () => {
  console.log('Listening on port ' + port);
})