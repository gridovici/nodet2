const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 3456;

app.use(morgan('tiny'));
app.get('/', (req, res) => res.send('Hell World!!!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
