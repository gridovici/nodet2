const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

const routes = require('./routes');
const { authenticationRoute } = require('./authenticate');

const port = process.env.PORT || 3456;
const app = express();

// TODO: add route guard ?
// TODO: check dist folder <<- for production
// TODO: remove views and hbs files || for PROD serve hbs from gulp
// TODO: preprocessor ?
// TODO: sinon, jest
// TODO: SVG

// TODO: check components in repo for consistency
// TODO: add first 3 tasks

// TODO: add TravisCI, GitHub, Heroku and ENV vars process.env, server localhost hardcoded remove
// TODO: check fe, be and db in travis

// TODO: address all todos

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    // open('http://localhost:' + port);
    console.log(`Example app listening on port ${port}!`);
  }
});

// Add plugins
app.use(
  cors(),
  bodyParser.urlencoded({ extended: true }), // for POST req
  bodyParser.json(),
  morgan('tiny')
);

authenticationRoute(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../../dist')));
  app.get('/*', (req, res) => {
    // Not use webpack dev server in prod
    res.sendFile(path.resolve('index.html'));
  });
}

app.post('/task/new', routes.taskNew);

app.post('/task/update', routes.taskUpdate);

app.post('/comment/new', routes.commentNew);
