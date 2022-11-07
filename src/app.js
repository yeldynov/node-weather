const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname, '../views/partials');

app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Nico Yeldynbach',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Nico Yeldynbach',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help!!!',
    message:
      'If you see this message, you neeeded help. I am not sure if I could help you though. You may help yourself?',
    name: 'Nico Yeldynbach',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address.',
    });
  }

  geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
    if (err) return res.send({ err });

    forecast(latitude, longitude, (err, forecastData) => {
      if (err) return res.send({ err });

      res.send({
        location,
        forecast: forecastData,
        address: req.query.address,
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term.',
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    errorMessage: 'Help article not found',
    title: 'Help not found',
    name: 'Nico Yeldynbach',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    errorMessage: 'Page not found.',
    title: 'Page not Found',
    name: 'Nico Yeldynbach',
  });
});

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
