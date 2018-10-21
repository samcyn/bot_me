/**
 * created by Samson Iyanda
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */

// Module dependencies
const express = require("express");
const compression = require("compression");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

module.exports = function(app) {
  app.enable("trust proxy");
  app.use(require("express-status-monitor")());
  app.use(compression());
  app.use(cors());
  app.use(bodyParser.json({ limit: "1mb" }));
  app.use(express.static(path.join(__dirname, "..", "dist")));
};
