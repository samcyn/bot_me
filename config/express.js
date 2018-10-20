// Module dependencies
const express = require("express");
const compression = require("compression");
const bodyParser = require("body-parser");
const path = require("path");

module.exports = function(app) {
  app.enable("trust proxy");
  app.use(require("express-status-monitor")());

  // Only loaded when running in Bluemix
  if (process.env.VCAP_APPLICATION) {
    require("./security")(app);
  }

  app.use(compression());
  app.use(bodyParser.json({ limit: "1mb" }));
  app.use(express.static(path.join(__dirname, "..", "dist")));
};
