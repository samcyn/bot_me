'use strict';

/**
*Module Dependencies
*/

const 
  mongoose = require('mongoose'),
  moment = require('moment'),
   _ = require('lodash');
  require('../models/priceList');
  require('../models/bonds');
  require('../models/etf');
  require('../models/gainers');
  require('../models/losers');
  require('../models/trades');
  require('../models/marketSnapshot');

//==============================================================================
/**
* Module variables
*/


const
  priceList = mongoose.model("priceList"),
  mrkSnapshot = mongoose.model('mrkSnapshot'),
  bond = mongoose.model('bond'),
  etf = mongoose.model('etf'),
  gainers = mongoose.model('gainer'),
  losers = mongoose.model('loser'),
  trade = mongoose.model('trade');

/**
 * Intercepts watson response and return response to the user based on the intent and context
 * @param  {Object} response  response from watson
 * @return {object} return response object
 */

const bot_conversation = async (response) => {
  if (response.intents.length > 0) {

    if (response.intents[0].intent === "stock_price" && response.context.symbol ) {
      let dateRange = getDateRange(response);
      const resp = await getEquityPriceList(response.context.symbol.replace("#", ""), dateRange);
      if (resp.includes("Sorry no price data available for this company at the moment. thanks")) {

        response.output.text = [];
      }

      response.output.text.push(resp);
      response.output.generic.push({ response_type: '_html', text: resp });
      return response;
    }
 
    else if (response.intents.length > 0 && response.intents[0].intent === "top_gainers") {

      let dateRange = getDateRange(response);  
      const resp = await getTopGainers(gainers, dateRange);

      response.output.text.push(resp);
      response.output.generic.push({response_type: '_html', text: resp});

      return response;
    }
 
    else if (response.intents.length > 0 && response.intents[0].intent === "top_losers") {
      let dateRange = getDateRange(response);  
      const resp = await getTopLosers(losers, dateRange);
      response.output.text.push(resp);
      response.output.generic.push({ response_type: '_html', text: resp });
      return response;
    }
   
    else if (response.intents.length > 0 && response.intents[0].intent === "market_info") {
      let dateRange = getDateRange(response);
      const resp = await getMarketSnapshot(mrkSnapshot, dateRange);
      response.output.text.push(resp);
      response.output.generic.push({ response_type: '_html', text: resp });
      // console.log(response);
      return response;
    }

 
    else if (response.intents.length > 0 && response.intents[0].intent === "trades") {

      let dateRange = getDateRange(response);  
      const resp = await getTrades(trade, dateRange);
      response.output.text.push(resp);
      response.output.generic.push({ response_type: '_html', text: resp });
      return response;
    }
 
    else if (response.intents.length > 0 && response.intents[0].intent === "bonds") {
      let dateRange = getDateRange(response);  
      const resp = await getBonds(bond, dateRange);
      response.output.text.push(resp);
      response.output.generic.push({ response_type: '_html', text: resp });
      return response;
    }

    else if (response.intents.length > 0 && response.intents[0].intent === "etf") {
      let dateRange = getDateRange(response);  
      const resp = await getBonds(etf, dateRange);
      response.output.text.push(resp);
      response.output.generic.push({ response_type: '_html', text: resp });
      return response;
     }
 
    else {
      // console.log(response);
      return response;
    }

  }
  else {
    if (response.entities[0]) {
      if (response.entities[0].entity === "symbol" && response.context.symbol) {

        let dateRange = getDateRange(response);
        const resp = await getEquityPriceList(response.context.symbol.replace("#", ""), dateRange);

        if (resp.includes("Sorry no price data available for this company at the moment. thanks")) {

          response.output.text = [];
        }

        response.output.text.push(resp);
        response.output.generic.push({ response_type: '_html', text: resp });
        return response;
      }
    }

    else {
      console.log(response);
      return response;
    }
  }
}


/**
 * Get date response and transform them into dates that would be used to query the DB
 * @param  {Object} response  response from watson
 * @return {object} return formatted date range
 */

  
const getDateRange = (response) => {
  let 
    today = new Date().toISOString().slice(0, 10),
    objArray = response.entities,
    startDate,
    endDate;

  const 
    result = objArray.map(a => a.entity),
    resultsCount = _.countBy(result);
 
  
  if (response.entities.length <= 2 ) {
   
    if (response.entities[0] && response.entities[0].entity === 'sys-date') {
      startDate = response.entities[0] ? response.entities[0].value : false;
      endDate = response.entities[1] ? response.entities[1].value : false;

      if (startDate && moment(startDate).isAfter(today)) {
        startDate = moment(startDate).subtract(1,"years").format("YYYY-MM-DD");
      }
  
      if (endDate && moment(endDate).isAfter(today)) {
        endDate = moment(endDate).subtract(1,"years").format("YYYY-MM-DD");
      }
    }
    else if (response.intents[0] && response.intents[0].intent === "stock_price") {
      startDate = response.entities[1] ? response.entities[1].value : false;
      endDate = response.entities[2] ? response.entities[2].value : false;

      if (startDate && moment(startDate).isAfter(today)) {
        startDate = moment(startDate).subtract(1,"years").format("YYYY-MM-DD");
      }
  
      if (endDate && moment(endDate).isAfter(today)) {
        endDate = moment(endDate).subtract(1,"years").format("YYYY-MM-DD");
      }
    }
    else {
      startDate = false;
      endDate = false;
    }
  }

  else {

    startDate = response.entities[1] ? response.entities[1].value : false;
    endDate = response.entities[2] ? response.entities[2].value : false;


    if (startDate && moment(startDate).isAfter(today)) {
      startDate = moment(startDate).subtract(1,"years").format("YYYY-MM-DD");
    }

    if (endDate && moment(endDate).isAfter(today)) {
      endDate = moment(endDate).subtract(1,"years").format("YYYY-MM-DD");
    }

  }

  return { "startDate": startDate, "endDate": endDate };
  
}

// retrieve equity data

const getEquityPriceList = async (symbol, dateRange) => {

  let price_list;

  if (dateRange.startDate && dateRange.endDate) {

    price_list = await priceList
      .find({ 'symbol': { '$regex': symbol, '$options': 'i' }, 'dateAdded': { "$gte": dateRange.startDate, "$lte": dateRange.endDate } });

  }

  else if (dateRange.startDate && !dateRange.endDate) {

    price_list = await priceList
      .find({ 'symbol': { '$regex': symbol, '$options': 'i' }, 'dateAdded': dateRange.startDate });
  }

  else {
    let today = new Date().toISOString().slice(0, 10);
    price_list = await priceList
      .find({ 'symbol': { '$regex': symbol, '$options': 'i' }, 'dateAdded': today });
  }

  return formatSymbolResponse(price_list);
}

// retrieve gainers data
const getTopGainers = async (gainers, dateRange) => {
   
  let topGainers;

  if (dateRange.startDate && dateRange.endDate) {

    topGainers = await gainers.find({'dateAdded': {"$gte": dateRange.startDate, "$lte": dateRange.endDate}});
   
  }

  else if (dateRange.startDate && ! dateRange.endDate) {
  
    topGainers = await gainers.find({'dateAdded': dateRange.startDate});
  }
  
  else {
    let today = new Date().toISOString().slice(0, 10);
    
    topGainers = await gainers.find({'dateAdded': today});
   
  }
  
 return formatGainersResponse(topGainers,"Gainers");
}

// retrieve bonds data

const getBonds = async (bond, dateRange) => {
 
  let bonds;

  if (dateRange.startDate && dateRange.endDate) {

    bonds = await bond.find({'dateAdded': {"$gte": dateRange.startDate, "$lte": dateRange.endDate}});
   
  }

  else if (dateRange.startDate && ! dateRange.endDate) {
  
    bonds = await bond.find({'dateAdded': dateRange.startDate});
  }
  
  else {
    let today = new Date().toISOString().slice(0, 10);
    bonds = await bond.find({'dateAdded': today});
  }

  return formatBondsResponse(bonds);
}


// retrieve trades data
const getTrades = async (trade, dateRange) => {

  let trades;

  if (dateRange.startDate && dateRange.endDate) {

    trades = await trade.find({'dateAdded': {"$gte": dateRange.startDate, "$lte": dateRange.endDate}});
   
  }

  else if (dateRange.startDate && ! dateRange.endDate) {
  
    trades = await trade.find({'dateAdded': dateRange.startDate});
  }
  
  else {
    let today = new Date().toISOString().slice(0, 10);
    trades = await trade.find({'dateAdded': today});
  }

  return formatTradesResponse(trades);

}

// retrieve losers data

const getTopLosers = async (losers, dateRange) => {
  let topLosers;

  if (dateRange.startDate && dateRange.endDate) {

    topLosers = await losers.find({'dateAdded': {"$gte": dateRange.startDate, "$lt": dateRange.endDate}});
   
  }

  else if (dateRange.startDate && ! dateRange.endDate) {
  
    topLosers = await losers.find({'dateAdded': dateRange.startDate});
  }
  
  else {
    let today = new Date().toISOString().slice(0, 10);
    topLosers = await losers.find({'dateAdded': today});
  }

  return formatGainersResponse(topLosers,"Losers");
}

// retrieve market snapshot
const getMarketSnapshot = async (mrkSnapshot, dateRange) => {
 
  let mrksnapshot;

  if (dateRange.startDate && dateRange.endDate) {

    mrksnapshot = await mrkSnapshot.find({'dateAdded': {"$gte": dateRange.startDate, "$lt": dateRange.endDate}});
   
  }

  else if (dateRange.startDate && ! dateRange.endDate) {
  
    mrksnapshot = await mrkSnapshot.find({'dateAdded': dateRange.startDate});
  }
  
  else {
    let today = new Date().toISOString().slice(0, 10);
    mrksnapshot = await mrkSnapshot.find({'dateAdded': today});
  }

  return formatMarketResponse(mrksnapshot);

}

//format losers data

const formatSymbolResponse= async (data) => {
  let HtmlStr = ``;
  if (data.length > 0) {
      data = _.groupBy(data,"dateAdded");
  
    for (let date in data) {
          HtmlStr += `Stock price details on ${date}`;
          let respArray = data[date];
          for (let resp of respArray) {
            HtmlStr+=  `<h5> ${resp.symbol } </h5> <li> Opening Price: ${formatValue(resp.openingPrice)} </li>  <li> Closing Price: ${resp.closePrice} </li>  <li> High Price: ${resp.highPrice}  </li>  <li> Low Price: ${resp.lowPrice}  </li> <br>`;
          }
    }
  }
  else {
    HtmlStr+=  `<i style="color:red;"> Sorry no price data available for this company at the moment. thanks <i>`;
  }
  
 
  return `<html>  ${ HtmlStr}</html>`;
} 

//format gainers data

const formatGainersResponse= async (data, type) => {
  console.log("TOP GAINERS", data);
  const topType = type === "Losers" ? "Losers" : "Gainers" ;

  let HtmlStr = ``;
  if (data.length > 0) {
     
    for (let gainer of data) {
     
      const gainersData = gainer.gainers ? gainer.gainers : gainer.losers ;
      HtmlStr += `<h4 class="bot-item-link"> Top ${topType} on ${gainer.dateAdded} </h4>`;
      for (let gainer of gainersData) {
        HtmlStr+=  `<h5 class="bot-item-link"> ${gainer.symbol} </h5> <li> Last Close: ${gainer.lastClose} </li>  <li> Today's Close: ${gainer.todaysClose} </li>  <li> Change(%): ${gainer.percentageChange } <br>`;
      }
   }
  }
  
  return `<html>  ${ HtmlStr}</html>`
} 

//format market data

const formatMarketResponse= async (data) => {
  let HtmlStr = ``;
  for (let mrkData of data) {
    HtmlStr += `<h4 class="bot-item-link"> Stock market report on ${mrkData.dateAdded} </h4>`;
    HtmlStr+=  `<li> ASI: ${formatValue(mrkData.asi)} </li> <li> DEALS: ${formatValue(mrkData.deals)} </li>  <li> VOLUMES: ${formatValue(mrkData.volume)} </li>  <li> VALUE: N ${formatValue(mrkData.value) } </li> <li> BOND: ${formatValue(mrkData.bondCap)} </li>  <li> ETF:  ${formatValue(mrkData.etfCap)} </li><br>`;
  }
  return `<html>  ${ HtmlStr}</html>`;
} 

//format trade data
const formatTradesResponse= async (data) => {
  
  let HtmlStr = ``;
  for (let tradeData of data) {
    HtmlStr += `<h4 class="bot-item-link"> Trade report on ${tradeData.dateAdded} </h4>`;
    for (let trade of tradeData.trades) {
      HtmlStr+=  `<h5 class="bot-item-link"> ${trade.symbol} </h5> <li> Value: ${formatValue(trade.value)} </li>  <li> Volume: ${formatValue(trade.volume) }  </li> <br>`;
    }
  }
  return `<html>  ${ HtmlStr}</html>`;
} 


//format bond data
const formatBondsResponse= async (data) => {
  
  let HtmlStr = ``;
  for (let bondData of data) {
  
    HtmlStr += `<h4 class="bot-item-link"> Bonds report on ${bondData.dateAdded} </h4>`;
    for (let bond of bondData.bonds) {
     HtmlStr+=  `<h5 class="bot-item-link"> ${bond.symbol} </h5> <li> Last Close:  ${formatValue(bond.lastClose)} </li>  <li> Today's Close: N ${formatValue(bond.todaysClose)} </li>  <li> CHANGE(%): ${bond.percentageChange } </li> <br>`;
    }
  }
  return `<html>  ${ HtmlStr}</html>`;
} 

//format number values
const formatValue = (amount, decimalCount = 2, decimal = ".", thousands = ",")  => {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  bot_conversation
}