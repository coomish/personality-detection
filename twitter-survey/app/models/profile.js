var mongoose = require('mongoose');

module.exports = mongoose.model('Profile', {
	screen_name : {type : String, default: ''},
	age : { type : String },
	gender : {type : String },
	twittername : { type: String },
	picture_url : { type: String },
	twitterID : {type: String },
	//interest : {type : Array },
});
