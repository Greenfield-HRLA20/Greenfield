const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const router = require('./router');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('short'));
app.use(router);

app.use('/', express.static(path.join(__dirname, '../Client/dist')));
app.use(router);

var port = process.env.port || 1337;

app.listen(port, () => {
  console.log('connected to port 1337!');
});
