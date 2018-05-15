var happn = require('happn-3');

var service = happn.service;

service.create(function (e) {
  if (e) return process.send('SERVICE START FAILED: ' + e.toString());
  console.log('started:::');//process.send('STARTED');
});