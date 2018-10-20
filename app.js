/**
 * created by Samson Iyanda
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */

const express = require("express");
const app = express();

// Bootstrap application settings
require("./config/express")(app);

// // Configure the Watson services
require("./routes/conversation")(app);
require("./routes/speech-to-text")(app);
require("./routes/text-to-speech")(app);

//error-handler settings
require("./config/error-handler")(app);

module.exports = app;
