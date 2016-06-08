var mongoose = require('mongoose');

module.exports = mongoose.model('Profile', {
	screen_name : {type : String, default: ''},
	age : { type : String },
	gender : {type : String },
	twittername : { type: String },
	interest : {type : Array },
	finished_survey : {type : Boolean, default: false}
});
