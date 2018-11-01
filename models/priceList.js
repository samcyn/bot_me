
'use strict';

/**
*Module Dependencies
*/

const mongoose = require('mongoose');
const { Schema } = mongoose;

let today = new Date().toISOString().slice(0, 10);

//==============================================================================
/**
*Create priceList Schema
*/

const priceListSchema = new Schema({
  id: Number,
  symbol: String,
  prevClosingPrice: Number,
  openingPrice: Number,
  highPrice: Number,
  lowPrice: Number,
  closePrice: Number,
  change: Number,
  percChange: Number,
  trades: Number,
  volume: Number,
  value: Number,
  market: String,
  sector: String,
  company2: String ,
  dateAdded: {
    type: String,
    default: `${today}`
  }
});

mongoose.model('priceList', priceListSchema);
