/* eslint-disable import/no-extraneous-dependencies */
import { config as webpackConfig } from '../tasks/webpack';

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const hbs = require('express-handlebars');
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');

const compiler = webpack(config);

const app = express();
const PORT = process.env.PORT || 3456;

app.use(morgan('tiny'));

// serve static files from the `public` folder
app.use(express.static(path.join(__dirname, '/public')));

app.use(
  middleware(compiler, {
    // webpack-dev-middleware options
  })
);

// view engine setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.engine('hbs', hbs({
  extname: 'hbs',
  defaultView: 'home',
  defaultLayout: 'default',
  layoutsDir: path.join(__dirname, 'views/layouts/'),
  partialsDir: path.join(__dirname, 'views/partials/')
}));

app.get('/', (req, res, next) => {
  // res.send('Hellooo World 2!!!');
  res.render('hello', { layout: 'default' });
});


app.get('/home', (req, res, next) => {
  res.render('home');
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    // open('http://localhost:' + port);
    console.log(`Example app listening on port ${port}!`);
  }
});
