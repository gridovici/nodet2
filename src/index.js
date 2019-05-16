const express = require('express');
const path = require('path');
const morgan = require('morgan');
const hbs = require('express-handlebars');

const app = express();
const router = express.Router();
const port = 3456;

app.use(morgan('tiny'));

// view engine setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// app.engine('handlebars', exphbs({defaultLayout: 'main'}));

app.engine('hbs', hbs({
  extname: 'hbs',
//   defaultView: 'default',
//   defaultLayout: 'index',
//   layoutsDir: path.join(__dirname, 'views/pages/'),
//   partialsDir: path.join(__dirname, 'views/partials/')
}));

app.get('/', (req, res) => {
  res.send('Hellooo World 1!!!');
//   res.render('index');
});

// app.get('/', (req, res, next) => {
//   // res.render('index');
//   res.render('hello', { layout: 'default' });
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
