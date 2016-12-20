var async = require('async');
var happn = require('happn-3');
var path = require('path');
var fs = require('fs-extra');

var package = require([__dirname, 'node_modules', 'happn-3', 'package.json'].join(path.sep));

var protocol = package.protocol;

var version = package.version;

var currentProtocolLog = [];

var currentJob;

var currentClient = null;

var otherClient = null;

var currentService = null;

var traverse = require('traverse');

var ephemerals = {
  timestamp:'number, utc',
  _id:'matches path if nedb, generated if mongo',
  eventId:'number, matches handler in client',
  name:{
    condition:function(name, property, message){

      if (message && message._meta && message._meta.status == 'error') {
        //do nada, we want to see the error
      }

      else if (message && message._meta && message._meta.action == 'describe') name = '{{string, server name - silly if not configured}}';

      else if (property.parent && property.parent.node && property.parent.node.name == 'happn') name = '{{string, server name - silly if not configured}}';

      else name = '{{string}}';

      return name;
    }
  },
  publicKey:'ECDSA public key',
  id:'guid',
  created:'number, utc',
  modified:'number, utc',
  token:'string, jwt token',
  sessionId:'guid',
  path:{
    condition:function(path, property, message){

      if (path.indexOf('set/sibling/data') > -1 && message && message.action == null){
        //coming from server
        path = 'set/sibling/data/[unique generated id]'
      }

      if (path.indexOf('/_TAGS/set/some/data/') > -1){
        path = '{{/_TAGS/set/some/data/[unique generated id]}}'
      }

      return path;
    }
  }
};


var cleanJSON = function(json){

  var cloned = JSON.parse(JSON.stringify(json));

  traverse(cloned).forEach(function (value) {

    if (value && this.key && ephemerals[this.key] != null){

      if (ephemerals[this.key].condition) this.update(ephemerals[this.key].condition(value, this, cloned));

      else this.update('{{' + ephemerals[this.key] + '}}');
    }

  });

  return '```json\r\n' + JSON.stringify(cloned, null, 2) + '\r\n```'

};

var inboundLayers = [

  function(message, cb){

    if (!currentJob) return cb(null, message);

    currentJob.output.push('###client -> server');
    currentJob.output.push(cleanJSON(message.raw));

    if (['throw/an/error', '/ALL@/subscription/error', 'remove/failed'].indexOf(message.raw.path) > -1) return cb(new Error('a fly in the ointment'));

    else cb(null, message);
  }
];

var outboundLayers = [

  function(message, cb){

    if (!currentJob) return cb(null, message);

    currentJob.output.push('###server -> client');

    if (message.response) currentJob.output.push(cleanJSON(message.response));

    else currentJob.output.push(cleanJSON(message.raw, null, 2));

    cb(null, message);
  }
];

var serviceConfig = {
  secure: true,
  services:{
    protocol:{
      config:{
        inboundLayers:inboundLayers,
        outboundLayers:outboundLayers
      }
    }
  }
};

var jobs = [

  {
    heading:'happn protocol specification',
    step:'start happn server',
    parameters:{
      config:serviceConfig
    },
    do:function(params, cb){

      var _this = this;

      happn.service.create(params.config, function(e, service){
        currentService = service;
        _this.output.push('##PROTOCOL VERSION: ' + protocol + '\r\n');
        _this.output.push('###HAPPN VERSION: ' + version);
        cb(null, _this.output);
      });
    }
  },
  {
    step:'connect a client',
    heading:'connect a client',
    text:'create a client session and login',
    parameters:{
      config:{
        secure:true,
        username:'_ADMIN',
        password:'happn'
      }
    },
    do:function(params, cb){

      var _this = this;

      var testGroup = {
        name: 'TEST GROUP',
        custom_data: {
          customString: 'custom1',
          customNumber: 0
        }
      };

      var testUser = {
        username: 'TEST USER@blah.com',
        password: 'TEST PWD',
        custom_data: {
          something: 'usefull'
        }
      };

      currentService.services.security.users.upsertGroup(testGroup, {overwrite: false}, function (e, result) {

        if (e) return cb(e);
        addedTestGroup = result;

        currentService.services.security.users.upsertUser(testUser, {overwrite: false}, function (e, result) {

            if (e) return cb(e);
            addedTestuser = result;

            currentService.services.security.users.linkGroup(addedTestGroup, addedTestuser, function (e) {

              if (e) return cb(e);

              happn.client.create(testUser, function(e, instance){

                if (e) return cb(e);

                otherClient = instance;

                _this.output = ['(existing client with session id: ' + otherClient.session.id + ' was already created) ##DIFF_IGNORE'];//we only want to demonstrate the login sequence once

                setTimeout(function(){

                  happn.client.create(params.config, function(e, instance){

                    if (e) return cb(e);

                    currentClient = instance;

                    cb(null, _this.output);

                  });

                }, 1000);
              });
            });
        });
      });
    }
  },

  {
    step:'set data',
    heading:'set',
    text:'set a piece of data using a key value pair',
    parameters:{
      path:'set/some/data',
      val:{data:{was:'set'}}
    },
    do:function(params, cb){

      var _this = this;

      currentClient.set(params.path, params.val, function(e){

        if (e) return cb(e);

        cb(null, _this.output);
      });
    }
  },

  {
    step:'merge data',
    text:'merge some new values with an existing record, NB: the merge only goes 1 property level deep',
    parameters:{
      path:'set/some/data',
      val:{an: {additional: 'field'}}
    },
    do:function(params, cb){

      var _this = this;

      currentClient.set(params.path, params.val, {merge:true}, function(e){

        if (e) return cb(e);

        cb(null, _this.output);
      });
    }
  },

  {
    step:'tag data',
    text:'tag some existing data',
    description:'tag an existing record, a clone of the record gets stored under /_TAGS/{{tagged record path}}',
    parameters:{
      path:'set/some/data'
    },
    do:function(params, cb){

      var _this = this;

      currentClient.set(params.path, null, {tag:'MYTAG'}, function(e){

        if (e) return cb(e);

        cb(null, _this.output);
      });
    }
  }, {
    step:'fail to tag data that doesnt exist',
    text:'tag failure',
    description:'fail to tag data that doesnt exist',
    parameters:{
      path:'tag/non-existent'
    },
    do:function(params, cb){

      var _this = this;

      currentClient.set(params.path, null, {tag:'MYTAG'}, function(){
        cb(null, _this.output);
      });
    }
  }, {
    step:'set sibling data',
    text:'setSibling',
    description:'create sibling records on a base path',
    parameters:{
      path:'set/sibling/data',
      data:{sibling:'data'}
    },
    do:function(params, cb){

      var _this = this;

      currentClient.setSibling(params.path, params.data, function(e){

        if (e) return cb(e);

        cb(null, _this.output);
      });
    }
  },

  {
    step:'error setting data',
    text:'fails to do a set',
    parameters:{
      path:'throw/an/error',
      val:{error:{was:'thrown'}}
    },
    do:function(params, cb){

      var _this = this;

      currentClient.set(params.path, params.val, function(e){

        cb(null, _this.output);
      });
    }
  },{
    step:'error setting data, no permissions',
    text:'fails to do a set, access denied, unauthorised',
    parameters:{
      path:'try/and/set/no/permission',
      val:{access:{was:'denied'}}
    },
    do:function(params, cb){

      var _this = this;

      otherClient.set(params.path, params.val, function(e){

        cb(null, _this.output);
      });
    }
  },

  {
    header:'remove',
    step:'remove a single item',
    text:'removes one data point',
    parameters:{
      path:'remove/one',
      val:{to:{be:"removed"}}
    },
    do:function(params, cb){

      var _this = this;

      currentClient.set(params.path, params.val, function(e){

        if (e) return cb(e);

        _this.output = [];//clear away the set as we already documented this

        currentClient.remove(params.path, function(e, results){

          if (e) return cb(e);
          cb(null, _this.output);
        });
      });
    }
  },{
    step:'remove a multiple items',
    text:'using a wildcard, we remove 2 items in the db keyed like so: remove/multiple/1 and remove/multiple/2 using a single request',
    parameters:{
      path:'remove/multiple',
      val:{to:{be:"removed"}}
    },
    do:function(params, cb){

      var _this = this;

      currentClient.set(params.path + '/1', params.val, function(e){

        if (e) return cb(e);

        currentClient.set(params.path + '/2', params.val, function(e){

          if (e) return cb(e);

          _this.output = [];//clear away the set as we already documented this

          currentClient.remove(params.path + '/*', function(e, results){

            if (e) return cb(e);
            cb(null, _this.output);
          });
        });
      });
    }
  }, {
    step:'remove no items',
    text:'call sequence representing a request to remove something that is not there',
    parameters:{
      path:'remove/non_existant'
    },
    do:function(params, cb){

      var _this = this;

      currentClient.remove(params.path , function(){
        cb(null, _this.output);
      });
    }
  }, {
    step:'remove failure',
    text:'an error happens when we try and remove an item',
    parameters:{
      path:'remove/failed'
    },
    do:function(params, cb){

      var _this = this;

      currentClient.remove(params.path , function(){
        cb(null, _this.output);
      });
    }
  }, {
    step:'remove failure - access denied',
    text:'an error happens when we try and remove an item, access denied',
    parameters:{
      path:'remove/no/permissions'
    },
    do:function(params, cb){

      var _this = this;

      otherClient.remove(params.path , function(){
        cb(null, _this.output);
      });
    }
  },

  {
    heading:'data subscriptions',
    step:'on all',
    text:'subscribe to all changes on all data points',
    parameters:{},
    do:function(params, cb){

      var _this = this;

      currentClient.onAll(

        function(data){

        },

        function(e){
          if (e) return cb(e);
          cb(null, _this.output);
        }
      );
    }
  },
  {
    step:'receive event',
    text:'set a piece of data, and get the event back based on the subscription in the previous step',
    description:'the item from the server with the property \'publication\' is the emitted event - the other server -> client message is the response on the set action',
    parameters:{
      path:'/subscribe/on/all/events',
      val:{data:{was:'set'}}
    },
    do:function(params, cb){

      var _this = this;

      currentClient.set(params.path, params.val, function(e){

        if (e) return cb(e);

        cb(null, _this.output);
      });
    }
  },
  {
    step:'off all',
    text:'unsubscribe from all changes on all data points, NB: will remove all subscriptions',
    parameters:{
      options:{}
    },
    do:function(params, cb){

      var _this = this;

      currentClient.offAll(
        function(e){
          if (e) return cb(e);
          cb(null, _this.output);
        }
      );
    }
  },
  {
    step:'on specific path and action',
    text:'subscribe to only set actions on a specific data point',
    parameters:{
      path:'/subscribe/on/specific',
      options:{
        event_type: 'set'
      }
    },

    do:function(params, cb){

      var _this = this;

      currentClient.on(

        params.path,

        params.options,

        function(data){

        },

        function(e){
          if (e) return cb(e);
          cb(null, _this.output);
        }
      );
    }
  },

  {
    step:'receive event',
    text:'set a piece of data, and get the event back based on the subscription in the previous step',
    description:'the item from the server with the property \'publication\' is the emitted event - the other server -> client message is the response on the set action',
    parameters:{
      path:'/subscribe/on/specific',
      val:{data:{was:'set'}}
    },
    do:function(params, cb){

      var _this = this;

      currentClient.set(params.path, params.val, function(e){

        if (e) return cb(e);

        cb(null, _this.output);
      });
    }
  },

  {
    step:'on specific path and remove',
    text:'subscribe to the removal of data at a specified point',
    parameters:{
      path:'/subscribe/on/remove',
      options:{
        event_type: 'remove'
      },
      data:{was:'removed'}
    },

    do:function(params, cb){

      var _this = this;

      currentClient.set(params.path, params.data, function(e){

        if (e) return cb(e);

        _this.output = ['(an item with the path ' + params.path + ' was previously added)'];

        currentClient.on(

          params.path,

          params.options,

          function(data){

          },

          function(e){
            if (e) return cb(e);
            cb(null, _this.output);
          }
        );

      });
    }
  },

  {
    step:'receive remove event',
    text:'remove a piece of data, and get the event back based on the subscription in the previous step',
    description:'the item from the server with the property \'publication\' is the emitted event - the other server -> client message is the response on the remove action',
    parameters:{
      path:'/subscribe/on/remove',
      val:{data:{was:'removed'}}
    },
    do:function(params, cb){

      var _this = this;

      currentClient.remove(params.path, function(e){

        if (e) return cb(e);

        cb(null, _this.output);
      });
    }
  },

  {
    header:'Unsubscribe',
    step:'subscribe and then unsubscribe from a data point',
    text:'subscribe to a change only once, on the native happn client this is done by specifying the \'count\' option, but you can tell from the following sequence how to unsubscribe',
    parameters:{
      path:'/subscribe/once',
      options:{
        event_type: 'all',
        count: 1
      }
    },

    do:function(params, cb){

      var _this = this;

      currentClient.on(

        params.path,

        params.options,

        function(data){

        },

        function(e){
          if (e) return cb(e);
          cb(null, _this.output);
        }
      );
    }
  },

  {
    step:'receive event then unsubscribe',
    text:'set a piece of data, and get the event back based on the subscription in the previous step',
    description:'the item from the server with the property \'publication\' is the emitted event - the other server -> client message is the response on the set action',
    parameters:{
      path:'/subscribe/once',
      val:{data:{was:'set'}}
    },
    do:function(params, cb){

      var _this = this;

      currentClient.set(params.path, params.val, function(e){

        if (e) return cb(e);

        cb(null, _this.output);
      });
    }
  },

  {
    step:'noPublish flag subscribe',
    header:'noPublish flag',
    text:'perform an action without publishing using the noPublish flag',
    parameters:{
      path:'/subscribe/noPublish',
      options:{
        event_type: 'all'
      }
    },
    do:function(params, cb){

      var _this = this;

      _this.output = [];

      currentClient.on(

        params.path,

        params.options,

        function(data){

        },

        function(e){
          if (e) return cb(e);
          cb(null, _this.output);
        }
      );
    }
  },

  {
    step:'don\'t receive event',
    text:'set a piece of data, and get a response from the server, but no publication because noPublish was set to true',
    description:'the item from the server with the property \'publication\' is the emitted event - the other server -> client message is the response on the set action',
    parameters:{
      path:'/subscribe/noPublish',
      val:{data:{was:'set'}},
      options:{
        noPublish:true
      }
    },
    do:function(params, cb){

      var _this = this;

      currentClient.set(params.path, params.val, params.options, function(e){

        if (e) return cb(e);

        cb(null, _this.output);
      });
    }
  },

  {
    step:'fail to subscribe',
    text:'failure to subscribe',
    parameters:{
      path:'/subscription/error',
      options:{}
    },

    do:function(params, cb){

      var _this = this;

      currentClient.on(

        params.path,

        params.options,

        function(data){

        },

        function(e){
          cb(null, _this.output);
        }
      );
    }
  },
  {
    step:'fail to subscribe - access denied',
    text:'failure to subscribe - access denied',
    parameters:{
      path:'/subscription/access/denied',
      options:{}
    },

    do:function(params, cb){

      var _this = this;

      otherClient.on(

        params.path,

        params.options,

        function(data){

        },

        function(e){
          cb(null, _this.output);
        }
      );
    }
  },
  {
    heading:'Disconnection',
    step:'disconnect session from client',
    text:'the client sends out a disconnect request, which the server receives - the server then queues the disconnection request, the client the ends the websocket session, and the server cleans up on the other side without sending a disconnection warning',
    parameters:{
    },

    do:function(params, cb){

      var _this = this;

      currentClient.disconnect(function(e){

        if (e) return cb(e);
        setTimeout(function(){
          cb(null, _this.output);
        }, 3000)
      })
    }
  }
  ,{
    step:'disconnect from server',
    text:'when a client is forcefully diconnected from the server side, or when a service shutdown happens, all clients are notified a disconnection is imminent',
    description:'the disconnectAllClients method is called - this method is called on the happn instance shutdown, causing the server to push out a disconnection message to all connected clients',
    parameters:{
      path:'/subscription/error',
      options:{}
    },

    do:function(params, cb){

      var _this = this;

      _this.output.push('one connected client remaining, so disconnect warning is sent to it, session id (matches the one stipulated in section 1_1) is:' + otherClient.session.id + '  ##DIFF_IGNORE');

      currentService.services.session.disconnectAllClients(function(e){

        if (e) return cb(e);
        cb(null, _this.output);
      })
    }
  }
];

var protocolReport = [];

async.eachSeries(jobs, function(job, jobCB){

  job.output = [];//reset this

  currentJob = job;

  currentJob.do(currentJob.parameters, function(e, output){

    if (e) return jobCB(e);

    if (currentJob.output){

      if (currentJob.heading) protocolReport.push('#' + currentJob.heading + '\r\n');
      if (currentJob.text) protocolReport.push('###' + currentJob.text + '\r\n');
      if (currentJob.description) protocolReport.push('*' + currentJob.description + '*\r\n');

      currentJob.output.forEach(function(line){
        protocolReport.push(line);
      });
    }
    jobCB();
  });

}, function(e){

  if (e) return console.log('protocol describe failed:::', e);
  var reportFile = writeReportToFile(protocolReport);

  console.log('protocol described in file: ' + reportFile);
  process.exit();

});

function writeReportToFile(){

  var outputFile = __dirname + path.sep + 'automated-docs' + path.sep + 'happn-3' + path.sep + protocol + path.sep + version + path.sep + 'protocol.md';
  var outputFileCurrent = __dirname + path.sep + 'automated-docs' + path.sep + 'happn-3' + path.sep + 'current' + path.sep + 'protocol.md';

  fs.ensureDirSync(__dirname + path.sep + 'automated-docs' + path.sep + 'happn-3' + path.sep + protocol + path.sep + version);

  fs.ensureDirSync(__dirname + path.sep + 'automated-docs' + path.sep + 'happn-3' + path.sep + 'current');

  try{

    fs.unlinkSync(outputFile);
    fs.unlinkSync(outputFileCurrent);

  }catch(e){}

  protocolReport.forEach(function(line){
    fs.appendFileSync(outputFile, line + '\r\n');
    fs.appendFileSync(outputFileCurrent, line + '\r\n');
  });
  
  return outputFile;
}