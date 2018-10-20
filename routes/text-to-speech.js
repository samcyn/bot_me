/**
 * created by Samson Iyanda
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */

const AuthorizationV1 = require('watson-developer-cloud/authorization/v1');

// Create the token manager
let tokenManager;
const serviceUrl = process.env.TEXT_TO_SPEECH_URL || 'https://stream.watsonplatform.net/text-to-speech/api';


tokenManager = new AuthorizationV1({
  username: process.env.TEXT_TO_SPEECH_USERNAME || '<username>',
  password: process.env.TEXT_TO_SPEECH_PASSWORD || '<password>',
  url: serviceUrl,
});
// Inform user that TTS is not configured properly or at all
if (!process.env.TEXT_TO_SPEECH_USERNAME && !process.env.TEXT_TO_SPEECH_IAM_APIKEY) {
  // eslint-disable-next-line
  console.warn('WARNING: The app has not been configured with a TEXT_TO_SPEECH_USERNAME');
}


module.exports = function initTextToSpeech(app) {
  app.get('/api/text-to-speech/token', (req, res) =>
    tokenManager.getToken(function (err, token) {
      if (err) {
        console.log('error:', err);
      } else {
        res.send(token);
      }
    })
  );
};
