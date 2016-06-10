var restclient = require('node-restclient');
var Twit = require('twit');
var fs = require('fs');
var express = require('express');
var prettyjson = require('prettyjson');

//connect DB
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/twitter');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('DB Connected');
});
var profileSchema = mongoose.Schema({
    name: String
});
var Profile = mongoose.model('Profile', profileSchema);


//create Server
var app = express.createServer();

//  Middleware
app.listen(3000)

//  Twitter Credentials
var T = new Twit({
  consumer_key:         '###',
  consumer_secret:      '###',
  access_token:         '###-###',
  access_token_secret:  '###'
});
fs.readFile('cmds.txt', function (err, data) {
   if (err) {
       return console.error(err);
   }
   console.log(data.toString());
});

//  command line input
var stdin = process.openStdin();
console.log("Starting CLI for MessageBot v. 0.1 ...");
console.log("Enter one of the following commands:");

stdin.addListener("data", function(d) {

    console.log("used command: [" +
        d.toString().trim() + "]");
    console.log("text: [" +
            d.toString().trim().split(" ")[1] + "]");
    // make CMD Input readable for commands
    // array cmd[] contains elements for executable Twitter requests
    cmd = d.toString().trim().split(" ");

    // "tweet" <word>: tweets a word to timeline
    if (cmd[0] == "tweet") {
      console.log("Tweet sent");
      T.post('statuses/update', { status: cmd[1]}, function(err, reply) {
        console.log("error: " + err);
        console.log("reply: " + reply);
      });
    };

    // dm <screen_name> <word>: sends direct message "word" to screen_name
    if (cmd[0] == "dm") {

      T.post('direct_messages/new', {screen_name: cmd[1], text:cmd[2]}, function(err, reply){
        if (err) {
            return console.error(err);
        }
        console.log("sending DM");

      });
    };

    // search <word>: searches for words in tweets
    if (cmd[0] == "search") {
      T.get('search/tweets', { q: cmd[1]+' since:2016-03-11', lang:"de", count: 5 }, function(err, data, response) {
        console.log(data)
      })
    };

    // followers <screen_name> <int> returns <int> followers of <screen_name>
    if (cmd[0] == "followers") {
      T.get('followers/ids', { screen_name: cmd[1], count: cmd[2] },  function (err, data, response) {

        for (var i = 0; i < data.ids.length; i++) {
          console.log("profile");
          T.get('users/show', { user_id: data.ids[i] },  function (err, profile, response) {
            console.log(prettyjson.render(profile));
          })

        }

      })
    };
    // profile <screen_name> returns profile of user
    if (cmd[0] == "profile") {

      console.log("profile");
      T.get('users/show', { screen_name: cmd[1] },  function (err, profile, response) {
        console.log(prettyjson.render(profile));
      });

    };

  });
