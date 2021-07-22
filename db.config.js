const mongoose = require('mongoose');
const {db} = require('./keys');
const connect = async ()=>{
  try{
    await mongoose.connect(db.url);
    console.log('dB is Connected');
  }catch (e) {
    throw e;
  }
};

module.exports = {connect};
