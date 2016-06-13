var mongoose = require('mongoose');

module.exports = mongoose.model('Participent', {
  screen_name : { type : String },
  email : { type : String },
  twitterID : {type: String },
  time : { type : Date, default: Date.now }


});
