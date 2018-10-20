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


const updateMessage = (input, response) => {
  var responseText = null;
  if (!response.output) {
    response.output = {};
  } else {
    return response;
  }
  if (response.intents && response.intents[0]) {
    var intent = response.intents[0];
    if (intent.confidence >= 0.75) {
      responseText = "I understood your intent was " + intent.intent;
    } else if (intent.confidence >= 0.5) {
      responseText = "I think your intent was " + intent.intent;
    } else {
      responseText = "I did not understand your intent";
    }
  }
  response.output.text = responseText;
  return response;
};

module.exports = function(app) {
  app.post("/api/message", (req, res, next) => {
    const workspace = process.env.WORKSPACE_ID || "<workspace-id>";
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
    assistant.message(payload, (error, data) => {
      if (error) {
        return next(error);
      }
      // update response before sending to client....
      return res.json(updateMessage(payload, data));
    });
  });
};
