
'use strict';

/**
*Module Dependencies
*/

const mongoose = require('mongoose');
const { Schema } = mongoose;

let today = new Date().toISOString().slice(0, 10);

//==============================================================================
/**
*Create Bond schema
*/

const bondSchema = new Schema({
  bonds: [{
    id: Number,
    symbol: String,
    lastClose: Number,
    todays: Number,
    percentageChange: Number
  }],
  dateAdded: {
    type: String,
    default: `${today}`
  }
});

mongoose.model('bond', bondSchema);

 