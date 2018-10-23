const ErrorHandler = err => {
  let message;
  if (err && err.response) {
    if (err.response.status === 500 || err.response.status === 404) {
      message = err.response.statusText;
    }
  }  
  if (err.response === undefined) {
    message = "You're probably offline, check your connection and try again.";
  }
  else {
    message = "Something is probably wrong check back later";
  }
  alert(message);
};

module.exports = ErrorHandler;
