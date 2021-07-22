
module.exports.home = function(req,res){


  console.log(req.cookies);
  res.cookie('user_id' , 25);


  //isme file ko show kr rhe
  return res.render('home' , {
    title : "Home"  });
}


