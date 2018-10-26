/**
 * created by Samson Iyanda
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */

const ErrorHandler = err => {
  console.log({ err });
  let message;
  if (err && err.response) {
    if (err.response.status === 500 || err.response.status === 404) {
      message = err.response.statusText;
    }
  }
  if (err.response === undefined) {
    message = "You're probably offline, check your connection and try again.";
  } else {
    message = "Something is probably wrong check back later";
  }
  alert(message, err.code);
};

module.exports = ErrorHandler;
