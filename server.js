/**
 * created by Samson Iyanda
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */

require('dotenv').config({ silent: true });

var server = require('./app');
var port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Server running on port: %d', port);
});
