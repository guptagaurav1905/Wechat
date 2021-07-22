const User = require('../models/USER');

module.exports.profile = function(req,res){

if(req.cookies.user_id){
    User.findById(req.cookies.user_id , function(err , user){
      if(user){
        return res.render('profile' ,{
          title : 'User-Profile',
          user : user
        })
      }
        return res.redirect('/user/sign-in');
    });
}else{
  return res.redirect('/user/sign-in');
}
}


// Render The SignUp page
module.exports.signup = function(req , res){
  return res.render('user_sign_Up' ,{
    title : " Codeial/Sign-Up"
  } )
}

// Render The SignIn Page
module.exports.signin = function(req , res){
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


// Get tHE Sign-In data
module.exports.createSession = function(req,res){

  // Find USer
  User.findOne({email: req.body.email} , function(err , user){
    if(err){console.log('Error in Finding User '); return}

  // Handle USer Found
    if(user){
      console.log(user, req.body)
      // Password Do Not Match
      if(user.password != req.body.password){
        return res.redirect('back');
      }

      // handle session Created
      res.cookie('user_id' , user.id);
      return res.redirect('/user/profile');


    } else{
     // Handle User not found
     return res.redirect('back');
    }
  });
}


// Sign_Out

module.exports.deactivate  =  function(req,res){
  console.log(req);
  return res.redirect('/user/sign-in');
}
