/**
 * created by Samson Iyanda
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */

const AuthorizationV1 = require('watson-developer-cloud/authorization/v1');
const IamTokenManagerV1 = require('watson-developer-cloud/iam-token-manager/v1');

// Create the token manager
let tokenManager;
const serviceUrl = process.env.SPEECH_TO_TEXT_URL || 'https://stream.watsonplatform.net/speech-to-text/api';

if (process.env.SPEECH_TO_TEXT_IAM_APIKEY && process.env.SPEECH_TO_TEXT_IAM_APIKEY !== '') {
  tokenManager = new IamTokenManagerV1.IamTokenManagerV1({
    iamApikey: process.env.SPEECH_TO_TEXT_IAM_APIKEY || '<iam_apikey>',
    iamUrl: process.env.SPEECH_TO_TEXT_IAM_URL || 'https://iam.bluemix.net/identity/token',
  });
} else {
  tokenManager = new AuthorizationV1({
    username: process.env.SPEECH_TO_TEXT_USERNAME || '<username>',
    password: process.env.SPEECH_TO_TEXT_PASSWORD || '<password>',
    url: serviceUrl,
  });
}
// Inform user that TTS is not configured properly or at all
if (!process.env.SPEECH_TO_TEXT_USERNAME && !process.env.SPEECH_TO_TEXT_IAM_APIKEY) {
  console.warn('WARNING: The app has not been configured with a SPEECH_TO_TEXT_USERNAME and/or ');
}

module.exports = function initSpeechToText(app) {
  app.get('/api/speech-to-text/token', (req, res) =>
    tokenManager.getToken((err, token) => {
      if (err) {
        console.log('error:', err);
      } else {
        res.send(token);
      }
    })
  );
};
