const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const {connect} = require('./db.config');
const mongoose = require('mongoose');

// const path = require('path');

const port = 9000;

app.use(express.urlencoded());


// SetUp cookieParser

app.use(cookieParser());

// Set up Our View Engine
app.set('view engine' , 'ejs');
app.set('views', './views');

// use Express Router
app.use('/' , require('./routes/index1'));

// db connection code
connect();

app.listen(port , function(err){
  if(err){
    console.log(`Error is Running on Server : ${err}`)
  };
  console.log(`Server is Running on port : ${port}`);
});
