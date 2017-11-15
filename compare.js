
var expect = require('expect.js');
var path = require('path');
var colors = require('colors/safe');
var diff = require('deep-diff').diff;

var protocolFile;
var toProtocolFile;
var verbose;

if (process.argv[2] == 'previous'){

  protocolFile = __dirname + path.sep + 'automated-docs' + path.sep + 'happn-3' + path.sep + 'current' + path.sep  + 'protocol.json';

  toProtocolFile = __dirname + path.sep + 'automated-docs' + path.sep + 'happn-3' + path.sep + 'previous'  + path.sep  + 'protocol.json';

  verbose = process.argv[3];

} else {

  var protocol = process.argv[2].split('/')[0];
  var version = process.argv[2].split('/')[1];

  var toProtocol = process.argv[3].split('/')[0];
  var toVersion = process.argv[3].split('/')[1];

  verbose = process.argv[4] == '--v';

  protocolFile = __dirname + path.sep + 'automated-docs' + path.sep + 'happn-3' + path.sep + protocol + path.sep + version + path.sep + 'protocol.json';

  toProtocolFile = __dirname + path.sep + 'automated-docs' + path.sep + 'happn-3' + path.sep + toProtocol + path.sep + toVersion + path.sep + 'protocol.json';
}


var protocolJSON = require(protocolFile);

var toProtocolJSON = require(toProtocolFile);

Object.keys(protocolJSON).forEach(function(action){

  console.log();

  var actionJSON = protocolJSON[action];
  var toActionJSON = toProtocolJSON[action];

  try{

    expect(toActionJSON).to.eql(actionJSON);
    console.log(colors.green('OK: ' + action));
  }catch(e){
    console.log(colors.red('COMPARE FAILURE: ' + action));

    if (e.expected && verbose){

      console.log(colors.yellow('EXPECTED:::'));
      console.log(colors.yellow(JSON.stringify(e.actual, null, 2)));

      console.log(colors.yellow('ACTUAL:::'));
      console.log(colors.yellow(JSON.stringify(e.expected, null, 2)));

      var differences = diff(actionJSON, toActionJSON);

      var doneDiff = {};

      differences.forEach(function(difference){

        var path = difference.path.slice(1).join('/');
        if (doneDiff[path]) return;
        doneDiff[path] = true;
        console.log(colors.red(difference.kind + ': ' + path));
      });
    }
  }
});

