var mongoose = require('mongoose');

module.exports = mongoose.model('Participent', {
  screen_name : { type : String },
  email : { type : String },
  twitterid : { type : String }

});
