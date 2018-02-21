const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const mysql = require('mysql');
// const sqlServer = require('./db/index');

let app = express();


// MYSQL DB CONNECTION
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  // password: '2/)dvk940XrY',
  password: 'password',
  database: ''
});

connection.connect(function(err) {
  if (err) {
    console.log(err);
  }
  console.log('Connected to InstaDB');
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(logger('tiny'));

app.get('/', (req, res) => {
  res.send('Hello to the main page!!!');
})



app.listen(1337, () => {
  console.log('Connected to Instagram Clone Server!');
});



