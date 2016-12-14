var async = require('async');
var happn = require('happn-3');
var path = require('path');
var fs = require('fs-extra');

var package = require([__dirname, 'node_modules', 'happn-3', 'package.json'].join(path.sep));

var protocol = package.protocol;

var version = package.version;

var currentProtocolLog = [];

var currentClient = null;

var otherClient = null;

var currentService = null;

var inboundLayers = [

  function(message, cb){

    if (['throw/an/error', '/ALL@/subscription/error'].indexOf(message.raw.path) > -1) return cb(new Error('a fly in the ointment'));

    currentProtocolLog.push('###client -> server');
    currentProtocolLog.push('```json\r\n' + JSON.stringify(message.raw, null, 2) + '\r\n```');

    cb(null, message);
  }
];

var outboundLayers = [

  function(message, cb){

    currentProtocolLog.push('###server -> client');

    if (message.response) currentProtocolLog.push('```json\r\n' + JSON.stringify(message.response, null, 2) + '\r\n```');

    else currentProtocolLog.push('```json\r\n' + JSON.stringify(message.raw, null, 2) + '\r\n```');

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
    step:'start happn server',
    parameters:{
      config:serviceConfig
    },
    do:function(params, cb){

      var _this = this;

      happn.service.create(params.config, function(e, service){
        currentService = service;
        _this.output.push('#HAPPN PROTOCOL VERSION: ' + protocol + '\r\n');
        _this.output.push('##HAPPN VERSION: ' + version);
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

      happn.client.create(params.config, function(e, instance){

        if (e) return cb(e);

        currentClient = instance;

        happn.client.create(params.config, function(e, instance){

          if (e) return cb(e);

          otherClient = instance;

          cb(null, _this.output);

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
    text:'merge some new values with an existing record',
    parameters:{
      path:'set/some/data',
      val:{data:{was:{set:'again'}}}
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
  },

  {
    step:'set sibling data',
    text:'create sibling records on a base path',
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
  },

  {
    heading:'data subscriptions',
    step:'on all',
    text:'subscribe to all changes on a data point',
    parameters:{
      path:'/subscribe/on/all/*',
      options:{}
    },
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
    step:'on specific path and action',
    text:'subscribe to all changes on a data point',
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
    step:'subscribe for only N messages',
    text:'subscribe to a change only once',
    parameters:{
      path:'/subscribe/once',
      options:{
        event_type: '*',
        count: 1
      }
    },

    do:function(params, cb){

      var _this = this;

      console.log('subscribing once:::', params);

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
    heading:'Disconnection',
    step:'disconnect session from client',
    text:'the client sends out a disconnect request, which the server receives - the server then queues the disconnection request, the client the ends the websocket session, and the server cleans up on the other side without sending a disconnection warning',
    parameters:{
    },

    do:function(params, cb){

      var _this = this;

      currentClient.disconnect(function(e){

        if (e) return cb(e);
        cb(null, _this.output);
      })
    }
  }
  ,{
    step:'disconnect from server',
    text:'server pushed out a disconnection message to the client',
    parameters:{
      path:'/subscription/error',
      options:{}
    },

    do:function(params, cb){

      var _this = this;

      console.log('disconnectAllClients being called:::');

      currentService.services.session.disconnectAllClients(function(e){

        if (e) return cb(e);
        cb(null, _this.output);
      })
    }
  }
];

var protocolReport = [];

async.eachSeries(jobs, function(job, jobCB){

  console.log('doing:::', job.step);

  job.output = [];//reset this
  currentProtocolLog = job.output;

  job.do(job.parameters, function(e, output){

    if (e) return jobCB(e);

    if (output){

      if (job.heading) protocolReport.push('#' + job.heading + '\r\n');
      if (job.text) protocolReport.push('##' + job.text + '\r\n');
      if (job.description) protocolReport.push('*' + job.description + '*\r\n');

      output.forEach(function(line){
        protocolReport.push(line);
      });

    }
    jobCB();
  });

}, function(e){

  if (e) return console.log('protocol describe failed:::', e);
  writeReportToFile(protocolReport);

  process.exit();

});

function writeReportToFile(){

  console.log('writing to report file');
  console.log(protocolReport.join('\r\n'));

  var outputFile = __dirname + path.sep + 'automated-docs' + path.sep + protocol + path.sep + version + path.sep + 'protocol.md';

  fs.ensureDirSync(__dirname + path.sep + 'automated-docs' + path.sep + protocol);

  fs.ensureDirSync(__dirname + path.sep + 'automated-docs' + path.sep + protocol + path.sep + version);

  try{
    fs.unlinkSync(outputFile);
  }catch(e){

  }

  protocolReport.forEach(function(line){
    fs.appendFileSync(outputFile, line + '\r\n');
  })

}