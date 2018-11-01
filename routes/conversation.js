/**
 * created by Samson Iyanda
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */

const AssistantV1 = require("watson-developer-cloud/assistant/v1"); // watson sdk

//Watson API set up. Watson Assistant automatically pick up username and password from .env
var assistant = new AssistantV1({
  version: "2018-07-10"
});

const keys = require('../config/keys');

/**
*Module Variables
*/

const conv = require('../controllers/exchange');


module.exports = function (app) {
  app.post("/api/message", (req, res, next) => {
    const workspace = keys.WORKSPACE_ID || "<workspace-id>";
    if (!workspace || workspace === "<workspace-id>") {
      return res.json({
        output: {
          text: "The app has not been configured with a <b>WORKSPACE_ID</b> environment variable. Please refer to the "
        }
      });
    }
    const payload = {
      workspace_id: workspace,
      context: req.body.context || {},
      input: req.body.input || {}
    };

    // Send the input to the conversation service
    assistant.message(payload, async (error, data) => {
      if (error) {
        return next(error);
      }
      data = await conv.bot_conversation(data).catch((err) => {
        throw err;
      });


      const output = data.output;

      // if (output.text.length === 0 && output.hasOwnProperty('generic')) {
      //   const generic = output.generic;

      //   if (Array.isArray(generic)) {

      //     // Loop through generic and add all text to data.output.text.
      //     // If there are multiple responses, this will add all of them
      //     // to the response.

      //     for (const i = 0; i < generic.length; i++) {
      //       if (generic[i].hasOwnProperty('text')) {
      //         data.output.text.push(generic[i].text);
      //       } 
      //       // else if (generic[i].hasOwnProperty('title')) {
      //       //   data.output.text.push(generic[i].title);
      //       // }
      //     }
      //   }
      // }

      return res.json(updateMessage(payload, data));
    });
  });

  /**
 * Updates the response text using the intent confidence
 * @param  {Object} input The request to the Assistant service
 * @param  {Object} response The response from the Assistant service
 * @return {Object}          The response with the updated message
 */
  const updateMessage = (input, response) => {

    const responseText = null;
    if (!response.output) {
      response.output = {};
    }
    else {
      return response;
    }
    if (response.intents && response.intents[0]) {
      const intent = response.intents[0];

      // Depending on the confidence of the response the app can return different messages.
      // The confidence will consty depending on how well the system is trained. The service will always try to assign
      // a class/intent to the input. If the confidence is low, then it suggests the service is unsure of the
      // user's intent . In these cases it is usually best to return a disambiguation message
      // ('I did not understand your intent, please rephrase your question', etc..)

      if (intent.confidence >= 0.75) {
        responseText = 'I understood your intent was ' + intent.intent;
      }
      else if (intent.confidence >= 0.5) {
        responseText = 'I think your intent was ' + intent.intent;
      }
      else {
        responseText = 'I did not understand your intent';
      }
    }
    if (response.intents.length > 0 && response.intents[0].intent === "help") {

    }
    response.output.text = responseText;
    return response;
  }
};