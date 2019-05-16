const express = require('express');
const path = require('path');
const morgan = require('morgan');
const hbs = require('express-handlebars');

const app = express();
const port = 3456;

app.use(morgan('tiny'));

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

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
