
'use strict';

/**
*Module Dependencies
*/

const mongoose = require('mongoose');
const { Schema } = mongoose;

let today = new Date().toISOString().slice(0, 10);

//==============================================================================
/**
*Create Gainers schema
*/

const gainerSchema = new Schema({
  gainers: [{
    id: Number,
    symbol: String,
    lastClose: Number,
    todaysClose: Number,
    percentageChange: Number,
    symbol2: String,
  }],
  dateAdded: {
    type: String,
    default: `${today}`
  }
});



mongoose.model('gainer', gainerSchema);