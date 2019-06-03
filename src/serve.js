// const path = require('path');
// const express = require('express');
import path from 'path';
import express from 'express';

const app = express();
const DIST_DIR = __dirname;
// const HTML_FILE = path.join(DIST_DIR, 'index.html');
const PORT = process.env.PORT || 3456;

app.use(express.static(DIST_DIR));

// app.get('*', (req, res) => {
// //   res.sendFile(HTML_FILE);
//   res.send('all routes');
// });

app.get('/', (req, res) => {
  res.send('root');
});

app.get('/home', (req, res) => {
  res.send('home');
});

app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`);
  console.log('Press Ctrl+C to quit.');
});
