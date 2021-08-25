const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, '../dist')));

app.get('/', (req, res) => {
  res.sendStatus(200);
})
app.get('/game', (req, res) => {
  console.log(req)
  axios.get(`https://www.giantbomb.com/api/search/?api_key=dbbeaebbcf26215fc71a790a44e6f8e9dbb0cabe&query=${req.query.searchTerm}&format=json&resources=game`, {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  })
    .then((response) => {
      res.send(response.data.results);
    })
    .catch((err) => {
      res.send(err);
    })
})
app.listen(port, () => {
  console.log('Listening on port ' + port);
})