import express from 'express';
import path from 'path';
import morgan from 'morgan';
import hbs from 'express-handlebars';

const app = express();
const port = 3456;
const DIST_DIR = __dirname;

app.use(morgan('tiny'));

// serve static files from the `dist` folder
app.use(express.static(DIST_DIR));

// view engine setup
app.set('view engine', 'hbs');
app.set('views', path.join(DIST_DIR, '../src/views'));

app.engine('hbs', hbs({
  extname: 'hbs',
  defaultView: 'home',
  defaultLayout: 'default',
  layoutsDir: path.join(DIST_DIR, '../src/views/layouts/'),
  partialsDir: path.join(DIST_DIR, '../src/views/partials/')
}));

app.get('/', (req, res, next) => {
  // res.send('Hellooo World 3!!!');
  // res.render('hello', { layout: 'default' });
  res.render('hello', { a: 'test' });
});


app.get('/home', (req, res, next) => {
  // res.send('home');
  res.render('home');
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    // open('http://localhost:' + port);
    console.log(`Example app listening on port ${port}!`);
  }
});
