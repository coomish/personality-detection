# Twitter Survey App

Provides a Twitter survey application that allows users to submit their attributes. Data is stored in mongodb.
- Node Backend
- Express
- MongoDB
- AngularJS Frontend

## Requirements

- [Node and npm](http://nodejs.org)
- MongoDB

## Installation

1. Clone the repository
2. Install the application: `npm install`
3. Create config/database.js with the following content:
```
module.exports = {
	url: 'mongodb://localhost/profilesSurvey'
}
```
You can always change the database.
4. Start the server: `nodemon server.js`
5. View in browser at `http://localhost:8080`
