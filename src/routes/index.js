const routes = require('express').Router();

routes.get('/', (req, res) => {
//   res.status(200).json({ message: 'Connected!' });
  res.send('HELL WORLD 3!');
});

module.exports = routes;
