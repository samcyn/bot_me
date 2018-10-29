/**
 * created by Samson Iyanda
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */

const ErrorHandler = (err, extra) => {
  console.log({ err }, extra);
  let message;
  if (err && err.response) {
    if (err.response.status === 500 || err.response.status === 404) {
      message = err.response.statusText;
    }
  }
  if (err.message) {
    message = err.message;
  } else if (err.name === "UNRECOGNIZED_FORMAT") {
    message =
      "Unable to determine content type from file name or header; mp3, wav, flac, ogg, opus, and webm are supported. Please choose a different file.";
  } else if (err.name === "NotSupportedError") {
    message = "This browser does not support microphone input.";
  } else if (err.message === "('UpsamplingNotAllowed', 8000, 16000)") {
    message =
      "Please select a narrowband voice model to transcribe 8KHz audio files.";
  } else if (err.message === "Invalid constraint") {
    // iPod Touch does this on iOS 11 - there is a microphone, but Safari claims there isn't
    message = "Unable to access microphone";
  } else {
    message = "Something is probably wrong check back later";
  }
  console.log(message, err.code);
};

module.exports = ErrorHandler;
