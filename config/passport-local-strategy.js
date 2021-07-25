const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/USER');

// authentication Using Passport
passport.use(new LocalStrategy({
  usernameField: 'email'
},
function(email , password , done){
     // find a user and establish the identity
     User.findOne({email : email} , function(err , user){
       if(err){
         console.log('Error in Finding User --> passport');
         return done(err);
       }

       if(!user || user.password != password){
         console.log('Invalid UserName/Password');
         return done(null , false );
       }

       return done(null , user);
     });
}
));


// serializing User to decide which key is kept in the Cookie
passport.serializeUser(function(user , done){
  done(null , user.id);
});


// Deserializing the user from the key in cookie

passport.deserializeUser(function(id , done){
  User.findById(id , function(err , user){
    if(err){
      console.log('Error in Finding User --> passport');
         return done(err);
    }

    return done(null, user);
  });
});

// check the user is authenticated

passport.checkAuthentication = function(req , res , next){
  // if the user is signed in , then pass on the req to next function(controller action)
  if(req.isAuthenticated()){
    return next();
  }
  // if the user is not Sign In
  return res.redirect('/user/sign-in')
}

passport.setAuthenticatedUser = function(req , res , next){
  if(req.isAuthenticated()){
    // req.user contain the current signed in user from the session cookie and we are just sending this to local for view
    res.locals.user =  req.user;
  }

  next();
}

  module.exports = passport;
