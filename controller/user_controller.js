const User = require('../models/USER');

module.exports.profile = function(req,res){
    return res.render('profile' ,{
          title : 'User-Profile',
        })
      }

// Render The SignUp page
module.exports.signup = function(req , res){
  if(req.isAuthenticated()){
   return res.redirect('/user/profile');
  }
  return res.render('user_sign_Up' ,{
    title : " Codeial/Sign-Up"
  } )
}

// Render The SignIn Page
module.exports.signin = function(req , res){
  if(req.isAuthenticated()){
    return res.redirect('/user/profile');
  }
  return res.render('user_sign_In' , {
    title: "Codeial/Sign-In"
  })
}


// Get The Sign-up Data

module.exports.create = function(req , res){
  if(req.body.password != req.body.confirm_password){
    return res.redirect('back');
  }

  // Finding User
  User.findOne({email: req.body.email} , function(err , user){
    if(err){console.log('Error in finding User '); return}

    // User Not FOund
    if(!user){
      User.create(req.body , function(err , user){
    if(err){console.log('Error in Finding User '); return}

    // After Successful Finding
    return res.redirect('/user/sign-in');
      })
    } else{
      return res.redirect('back');
    }
  });
}


//  Sign-In USing Passport
module.exports.createSession = function(req,res){
  return res.redirect('/');
}

// Sign_Out

module.exports.destroySession =  function(req,res){
  req.logout();
  return res.redirect('/');
}
