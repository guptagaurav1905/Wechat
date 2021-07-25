const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 9000;
const expressLayouts = require('express-ejs-layouts');
const {connect} = require('./db.config');
const mongoose = require('mongoose');



// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
// const MongoStore = require('connect-mongo')(session);


app.use(express.urlencoded());

// SetUp cookieParser

app.use(cookieParser());


app.use(express.static('./assets'));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// Set up Our View Engine
app.set('view engine' , 'ejs');
app.set('views', './views');


// mongo store is used to store session cookie in db
app.use(session ({
  name  :'codeial',
 // TODO change the secret
  secret:'blahsomething',
  saveUninitialized: false,
  resave : false,
  cookie: {
     maxAge : (1000 * 60* 100)
  },
  // store: new  MongoStore(
  //   {
  //     mongooseConnection : db,
  //     autoRemove : 'disabled'
  //   },
  //   function(err){
  //     console.log(err || 'Connect MongoDb Setup Ok');
  //   }
  // )
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

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
