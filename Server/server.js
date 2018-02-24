const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const router = require('./router');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(logger('short'));

app.use('/', express.static(path.join(__dirname, "../Client/dist")));

app.listen(1337, () => {
  console.log('connected');
});