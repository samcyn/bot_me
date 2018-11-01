'use strict';

/**
*Module Dependencies
*/

const mongoose = require('mongoose');
const { Schema } = mongoose;

let today = new Date().toISOString().slice(0, 10);

//==============================================================================
/**
*Create Trades Schema
*/

const tradeSchema = new Schema({

  trades: [{
    id: Number,
    symbol: String,
    symbol2: String,
    volume: Number,
    value: Number,
  }],
  dateAdded: {
    type: String,
    default: `${today}`
  }
});

mongoose.model('trade', tradeSchema);