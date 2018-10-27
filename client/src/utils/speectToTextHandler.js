/**
 * created by Samson Iyanda
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */

import WatsonSpeech from "watson-speech";


const SpeechToTextHandler = (speechToken, callback) => {
  if (speechToken) {
    // I N I T I A L I Z E - A U D I O - R E C O R D I N G
    const stream = WatsonSpeech.SpeechToText.recognizeMicrophone({
      token: speechToken,
      extractResults: true,
      inactivity_timeout: 5,
      format: false,
      keepMicrophone: true
    });
    stream.on("data", function (data) {
      if (data.final === true) {
        stream.stop();
      }
    });
    callback(stream);
  }
}

export default SpeechToTextHandler;