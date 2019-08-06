const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

const routes = require('./routes');
const logger = require('./logger');

const port = process.env.PORT || 3456;
const app = express();

app.listen(port, (err) => {
  if (err) {
    logger.logError(err);
  } else {
    logger.logInfo(`Example app listening on port ${port}!`);
  }
});

// Add plugins
app.use(
  cors(),
  bodyParser.urlencoded({ extended: true }), // for POST req
  bodyParser.json(),
  morgan('combined', { stream: logger.getLogger().stream })
);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../../dist')));
  app.get('/*', (req, res) => {
    // Not use webpack dev server in prod
    res.sendFile(path.resolve('index.html'));
  });
}

app.post('/task/new', routes.taskNew);
app.post('/task/update', routes.taskUpdate);
app.post('/authenticate', routes.authenticate);
app.post('/user/create', routes.createUser);
