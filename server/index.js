require('dotenv').config()
const port = process.env.PORT || 3000;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { getListings } = require('./controllers/index.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('client/dist'));

app.get('/api/listings', async (req, res) => {
  const listings = await getListings(req.query.city);
  res.json(listings);
});

app.listen(port, () => console.log(`Listening on port ${port}!`))
