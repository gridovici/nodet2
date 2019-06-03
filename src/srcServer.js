const express = require('express');
const path = require('path');
const morgan = require('morgan');
const hbs = require('express-handlebars');

const app = express();
const port = 3456;
const DIST_DIR = __dirname;
const HTML_FILE = path.join(DIST_DIR, 'index.html');

app.use(morgan('tiny'));

// serve static files from the `public` folder
app.use(express.static(path.join(__dirname, '/public')));

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
  // res.send('Hellooo World 3!!!');
  // res.render('hello', { layout: 'default' });
  res.sendFile(HTML_FILE);
});


app.get('/home', (req, res, next) => {
  res.send('home');
  // res.render('home');
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    // open('http://localhost:' + port);
    console.log(`Example app listening on port ${port}!`);
  }
});
