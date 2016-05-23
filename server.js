const express = require('express');
const fs = require('fs');
const Redis = require('ioredis');

const read = fs.readFileSync;
const app = express();

const redis = new Redis();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send(read('./public/index.html', 'utf8'));
});

app.get('/categories', (req, res) => {
  redis.keys('*').then(keys => {
    res.send(keys);
  });
});

app.get('/categories/index.js', (req, res) => {
  res.redirect('/index.js');
});

app.get('/categories/:category', (req, res) => {
  res.send(read('./public/index.html', 'utf8'));
});

const server = app.listen(process.env.PORT, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Website server listening at http://${host}:${port}`);
});
