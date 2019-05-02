const express = require('express');

const app = express();
const port = 3456;

app.get('/', (req, res) => res.send('Hell World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
