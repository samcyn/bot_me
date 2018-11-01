'use strict';

/**
*Module Dependencies
*/

const mongoose = require('mongoose');
const { Schema } = mongoose;

let today = new Date().toISOString().slice(0, 10);

//==============================================================================
/**
*Create mrkSnapshot Schema
*/

const mrkSnapshotSchema = new Schema({
  id: Number,
  asi: Number,
  deals : Number,
  volume : Number,
  value: Number,
  cap: Number,
  bondCap: Number,
  etfCap: Number,
  dateAdded: {
    type: String,
    default: `${today}`
  }
});

mrkSnapshotSchema.pre('save', function(next) {
  const self = this;
  Object.keys(this.schema.paths).forEach(function(key) {
    if(self.schema.paths[key].options.default && self[key] === null) {
      self[key] = 0;
    }
  });
  next();
});

mongoose.model('mrkSnapshot', mrkSnapshotSchema);

 