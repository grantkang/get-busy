require('dotenv/config');
const express = require('express');

const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const fetch = require('node-fetch');

const app = express();

app.use(staticMiddleware);

app.use(express.json());

app.post('/api/yelp/customers', (req, res, next) => {
  const yelpBusinessSearchRequest = req.body;
  let url = 'https://api.yelp.com/v3/businesses/search?';
  url += 'location=' + yelpBusinessSearchRequest.location;
  for (var param in yelpBusinessSearchRequest.optionalParams) {
    url += '&' + param + '=' + yelpBusinessSearchRequest.optionalParams[param];
  }
  const request = {
    headers: {
      Authorization: process.env.YELP_API_KEY
    }
  };
  fetch(url, request)
    .then(response => response.json())
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => next(err));
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
