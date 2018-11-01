
'use strict';

/**
*Module Dependencies
*/

const mongoose = require('mongoose');
const { Schema } = mongoose;

let today = new Date().toISOString().slice(0, 10);

//==============================================================================
/**
*Create Etf schema
*/


const etfSchema = new Schema({
  etf: [{
    id: Number,
    symbol: String,
    lastClose: Number,
    todaysClose: Number,
    percentageChange: Number
  }],
  dateAdded: {
    type: String,
    default: `${today}`
  }
});

mongoose.model('etf', etfSchema);
