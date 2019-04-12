const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const proxy = require('http-proxy-middleware');

app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/books/:id', express.static(path.join(__dirname, '/../public')));

// mainInfo
app.use (
  '/books/:id/info',
  proxy({ target: 'http://localhost:3002', changeOrigin: true }),
);

// detailInfo
app.use (
  '/books/:id/details',
  proxy({ target: 'http://localhost:3001', changeOrigin: true }),
);

// Reviews
app.use (
  '/books/:id/reviews',
  proxy({ target: 'http://localhost:3003', changeOrigin: true }),
);

// Author
app.use (
  '/books/:id/authors',
  proxy({ target: 'http://localhost:3000', changeOrigin: true }),
);


module.exports = app;