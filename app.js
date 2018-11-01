/**
 * created by Samson Iyanda
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */

'use strict';
/**
*Module Dependencies
*/


const 
  express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'), 
  keys = require('./config/keys'),
  app = express();
 

//==============================================================================
/**
* Module variables
*/

let 
  db;
const
  dbURL = keys.mongoURI;


//==============================================================================
/**
* DB connection
*/

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, {useNewUrlParser: true});

db = mongoose.connection;

db.on('error', (err) => {
  console.error('There was a db connection error');
  return  console.error(err.message);
});
db.once('connected',  () => {
  return console.log('Successfully connected to ' + dbURL);
});
db.once('disconnected', () => {
  return console.error('Successfully disconnected from ' + dbURL);
});
process.on('SIGINT',  () => {
  mongoose.connection.close(() => {
    console.error('dBase connection closed due to app termination');
    return process.exit(0);
  });
});



// Bootstrap application settings
require("./config/express")(app);

// // Configure the Watson services
require("./routes/conversation")(app);
require("./routes/speech-to-text")(app);
require("./routes/text-to-speech")(app);

//error-handler settings
require("./config/error-handler")(app);

module.exports = app;
