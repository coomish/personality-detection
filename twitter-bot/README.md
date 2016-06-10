# Twitter-Bot

This Messagebot will be used to gather twitter profile Data.

## Installation

```sh
$ cd twitter-bot
$ npm install
```

For using the Twitter-API, got to Twitter and obtain your API credentials.
paste them in messagebot.JS at
```
//  Twitter Credentials
var T = new Twit({
  consumer_key:         'xxx',
  consumer_secret:      'xxx',
  access_token:         'xxx-xxx',
  access_token_secret:  'xxx'
});
```

## Start Application + Usage
```sh
$ node server.js
```
After System starts, available commands are shown in Terminal

### Version

0.1 - Inital Version, no intelligence or use of external sources
