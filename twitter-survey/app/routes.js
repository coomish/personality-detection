var Profile = require('./models/profile');
var Participent = require('./models/participent');
var request = require('request');
var cheerio = require('cheerio');

function getProfiles(res){
	Profile.find(function(err, profiles) {
			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)
			res.json(profiles); // return all profiles in JSON
		});
};
function getParticipents(res){
	Participent.find(function(err, participents) {
			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)
			res.json(participents); // return all profiles in JSON
		});
};
// ------


// -------
module.exports = function(app) {

	// apis ---------------------------------------------------------------------

	// get all profiles
	app.get('/api/profiles', function(req, res) {
		//console.log('123');
		// db access
		getProfiles(res);
	});
	// get all participents
	app.get('/api/participents', function(req, res) {
		//console.log('123');
		// db access
		getParticipents(res);
	});

	// create participent and send back all participents after creation
	app.post('/api/participents', function(req, res) {
		// console.log(req.body);
		// create a profile, information comes from AJAX request from Angular
		Participent.create({
			screen_name : req.body.screen_name,
			email: req.body.email,
			twitterID: req.body.twitterdata.twitterID
		}, function(err, participent) {
			if (err)
				res.send(err);

			// get and return all the participents after you create another
			getParticipents(res);
		});

	});
	app.post('/api/profiles', function(req, res) {
		// create a profile, information comes from AJAX request from Angular
		Profile.create({
			screen_name : req.body.screen_name,
			age: req.body.age,
			gender: req.body.gender,
			picture_url: req.body.twitterdata.picture_url,
			twittername: req.body.twitterdata.twittername,
			twitterID: req.body.twitterdata.twitterID
		}, function(err, profile) {
			if (err)
				res.send(err);

			// get and return all the profiles after you create another
			getProfiles(res);
		});

	});

	// Define Crawler API that checks if Profile exists
	app.get('/api/twittercheck/:screen_name', function(req, res) {
		var json = { twittername : "", picture_url : "", exists : "", twitterID : ""};
		// create a profile, information comes from AJAX request from Angular
		url = 'https://twitter.com/' + req.params.screen_name;
		request(url, function (error, response, html) {
			if (!error && response.statusCode == 200) {
				var $ = cheerio.load(html);
				$('a.ProfileHeaderCard-nameLink').filter(function(){
            var data = $(this);
            json.twittername = data.text();
        })
				$('img.ProfileAvatar-image').filter(function(){
					var data = $(this);
					json.picture_url = data.attr('src');
					//console.log(data.attr("src"));
				})
				$('div.ProfileNav').filter(function(){
					var data = $(this);
					json.twitterID = data.attr('data-user-id');
					// console.log(json.twitterID);
				})

				json.exists = true;
				console.log(json);
				res.send(json);
		  }
			else {
				json.twittername = 'not found';
				json.exists = false;
				res.send(json);
			}
		});

	});
	// delete a profile
	app.delete('/api/profiles/:profile_id', function(req, res) {
		Profile.remove({
			_id : req.params.profile_id
		}, function(err, profile) {
			if (err)
				res.send(err);

			getProfiles(res);
		});
	});

	// application views -------------------------------------------------------------
	app.get('/', function(req, res) {
		res.render('index.jade');
	})
	app.get('/impressum/', function(req, res) {
		res.render('impressum.jade');
	})
	app.get('/datenschutz', function(req, res) {
		res.render('datenschutz.jade');
	});
};
