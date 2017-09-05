#happn protocol specification

##PROTOCOL VERSION: 1.1.0
###HAPPN VERSION: 2.21.0
####RUN DATE: 2017 September 05 01:45
#connect a client

###create a client session and login

(existing client with session id: 8eda6f6c-8821-43fd-a187-af115cde0e5d was already created) ##DIFF_IGNORE
###client -> server
```json
{
  "action": "describe",
  "eventId": "{{number, matches handler in client}}",
  "protocol": "1.1.0"
}
```
###server -> client
```json
{
  "data": {
    "name": "{{string, server name - silly if not configured}}",
    "secure": true,
    "encryptPayloads": false,
    "publicKey": "{{ECDSA public key}}"
  },
  "_meta": {
    "type": "response",
    "status": "ok",
    "published": false,
    "eventId": "{{number, matches handler in client}}",
    "action": "describe"
  },
  "protocol": "1.1.0"
}
```
###client -> server
```json
{
  "action": "login",
  "eventId": "{{number, matches handler in client}}",
  "data": {
    "username": "_ADMIN",
    "info": {
      "_browser": false
    },
    "password": "happn"
  },
  "protocol": "1.1.0"
}
```
###server -> client
```json
{
  "data": {
    "id": "{{guid}}",
    "token": "{{string, jwt token}}",
    "timestamp": "{{number, utc}}",
    "info": {
      "_browser": false,
      "_local": false,
      "happn": {
        "name": "{{string}}"
      }
    },
    "index": 1,
    "type": 1,
    "user": {
      "username": "_ADMIN"
    }
  },
  "_meta": {
    "type": "response",
    "status": "ok",
    "published": false,
    "eventId": "{{number, matches handler in client}}",
    "action": "login"
  },
  "protocol": "1.1.0"
}
```
#set

###set a piece of data using a key value pair

###client -> server
```json
{
  "action": "set",
  "eventId": "{{number, matches handler in client}}",
  "path": "/set/some/data",
  "data": {
    "data": {
      "was": "set"
    }
  },
  "sessionId": "{{guid}}",
  "options": {
    "timeout": 20000
  },
  "protocol": "1.1.0"
}
```
###server -> client
```json
{
  "data": {
    "data": {
      "was": "set"
    }
  },
  "_meta": {
    "created": "{{number, utc}}",
    "modified": "{{number, utc}}",
    "path": "/set/some/data",
    "type": "response",
    "status": "ok",
    "published": true,
    "eventId": "{{number, matches handler in client}}",
    "sessionId": "{{guid}}",
    "action": "/SET@/set/some/data"
  },
  "protocol": "1.1.0"
}
```
###merge some new values with an existing record, NB: the merge only goes 1 property level deep

###client -> server
```json
{
  "action": "set",
  "eventId": "{{number, matches handler in client}}",
  "path": "/set/some/data",
  "data": {
    "an": {
      "additional": "field"
    }
  },
  "sessionId": "{{guid}}",
  "options": {
    "merge": true,
    "timeout": 20000
  },
  "protocol": "1.1.0"
}
```
###server -> client
```json
{
  "data": {
    "an": {
      "additional": "field"
    },
    "data": {
      "was": "set"
    }
  },
  "_meta": {
    "created": "{{number, utc}}",
    "modified": "{{number, utc}}",
    "path": "/set/some/data",
    "type": "response",
    "status": "ok",
    "published": true,
    "eventId": "{{number, matches handler in client}}",
    "sessionId": "{{guid}}",
    "action": "/SET@/set/some/data"
  },
  "protocol": "1.1.0"
}
```
###tag some existing data

*tag an existing record, a clone of the record gets stored under /_TAGS/{{tagged record path}}*

###client -> server
```json
{
  "action": "set",
  "eventId": "{{number, matches handler in client}}",
  "path": "/set/some/data",
  "sessionId": "{{guid}}",
  "options": {
    "tag": "MYTAG",
    "timeout": 20000
  },
  "protocol": "1.1.0"
}
```
###server -> client
```json
{
  "data": {
    "data": {
      "an": {
        "additional": "field"
      },
      "data": {
        "was": "set"
      }
    },
    "_meta": {
      "path": "/set/some/data"
    },
    "created": "{{number, utc}}",
    "modified": "{{number, utc}}",
    "_id": "{{matches path if nedb, generated if mongo}}"
  },
  "_meta": {
    "created": "{{number, utc}}",
    "modified": "{{number, utc}}",
    "path": "{{/_TAGS/set/some/data/[unique generated id]}}",
    "tag": "MYTAG",
    "type": "response",
    "status": "ok",
    "published": true,
    "eventId": "{{number, matches handler in client}}",
    "sessionId": "{{guid}}",
    "action": "/SET@/set/some/data"
  },
  "protocol": "1.1.0"
}
```
###tag failure

*fail to tag data that doesnt exist*

###client -> server
```json
{
  "action": "set",
  "eventId": "{{number, matches handler in client}}",
  "path": "tag/non-existent",
  "sessionId": "{{guid}}",
  "options": {
    "tag": "MYTAG",
    "timeout": 20000
  },
  "protocol": "1.1.0"
}
```
###server -> client
```json
{
  "data": {
    "data": {},
    "_meta": {
      "path": "tag/non-existent"
    }
  },
  "_meta": {
    "created": "{{number, utc}}",
    "modified": "{{number, utc}}",
    "path": "/_TAGStag/non-existent/06abc42d65cd4db39c54e0919f5f862b",
    "tag": "MYTAG",
    "type": "response",
    "status": "ok",
    "published": true,
    "eventId": "{{number, matches handler in client}}",
    "sessionId": "{{guid}}",
    "action": "/SET@tag/non-existent"
  },
  "protocol": "1.1.0"
}
```
###setSibling

*create sibling records on a base path*

###client -> server
```json
{
  "action": "set",
  "eventId": "{{number, matches handler in client}}",
  "path": "set/sibling/data",
  "data": {
    "sibling": "data"
  },
  "sessionId": "{{guid}}",
  "options": {
    "set_type": "sibling",
    "timeout": 20000
  },
  "protocol": "1.1.0"
}
```
###server -> client
```json
{
  "data": {
    "sibling": "data"
  },
  "_meta": {
    "created": "{{number, utc}}",
    "modified": "{{number, utc}}",
    "path": "set/sibling/data/[unique generated id]",
    "type": "response",
    "status": "ok",
    "published": true,
    "eventId": "{{number, matches handler in client}}",
    "sessionId": "{{guid}}",
    "action": "/SET@set/sibling/data"
  },
  "protocol": "1.1.0"
}
```
###fails to do a set

###client -> server
```json
{
  "action": "set",
  "eventId": "{{number, matches handler in client}}",
  "path": "throw/an/error",
  "data": {
    "error": {
      "was": "thrown"
    }
  },
  "sessionId": "{{guid}}",
  "options": {
    "timeout": 20000
  },
  "protocol": "1.1.0"
}
```
###server -> client
```json
{
  "data": null,
  "_meta": {
    "type": "response",
    "status": "error",
    "published": false,
    "eventId": "{{number, matches handler in client}}",
    "sessionId": "{{guid}}",
    "action": "set",
    "error": {
      "name": "TestError",
      "message": "a fly in the ointment"
    }
  },
  "protocol": "1.1.0"
}
```
###fails to do a set, access denied, unauthorised

###client -> server
```json
{
  "action": "set",
  "eventId": "{{number, matches handler in client}}",
  "path": "try/and/set/no/permission",
  "data": {
    "access": {
      "was": "denied"
    }
  },
  "sessionId": "{{guid}}",
  "options": {
    "timeout": 20000
  },
  "protocol": "1.1.0"
}
```
###server -> client
```json
{
  "data": null,
  "_meta": {
    "type": "response",
    "status": "error",
    "published": false,
    "eventId": "{{number, matches handler in client}}",
    "sessionId": "{{guid}}",
    "action": "set",
    "error": {
      "name": "AccessDenied",
      "message": "unauthorized"
    }
  },
  "protocol": "1.1.0"
}
```
###removes one data point

###client -> server
```json
{
  "action": "remove",
  "eventId": "{{number, matches handler in client}}",
  "path": "remove/one",
  "sessionId": "{{guid}}",
  "options": {
    "timeout": 20000
  },
  "protocol": "1.1.0"
}
```
###server -> client
```json
{
  "data": {
    "removed": 1
  },
  "_meta": {
    "timestamp": "{{number, utc}}",
    "path": "remove/one",
    "type": "response",
    "status": "ok",
    "published": true,
    "eventId": "{{number, matches handler in client}}",
    "sessionId": "{{guid}}",
    "action": "/REMOVE@remove/one"
  },
  "protocol": "1.1.0"
}
```
###using a wildcard, we remove 2 items in the db keyed like so: remove/multiple/1 and remove/multiple/2 using a single request

###client -> server
```json
{
  "action": "remove",
  "eventId": "{{number, matches handler in client}}",
  "path": "remove/multiple/*",
  "sessionId": "{{guid}}",
  "options": {
    "timeout": 20000
  },
  "protocol": "1.1.0"
}
```
###server -> client
```json
{
  "data": {
    "removed": 2
  },
  "_meta": {
    "timestamp": "{{number, utc}}",
    "path": "remove/multiple/*",
    "type": "response",
    "status": "ok",
    "published": true,
    "eventId": "{{number, matches handler in client}}",
    "sessionId": "{{guid}}",
    "action": "/REMOVE@remove/multiple/*"
  },
  "protocol": "1.1.0"
}
```
###call sequence representing a request to remove something that is not there

###client -> server
```json
{
  "action": "remove",
  "eventId": "{{number, matches handler in client}}",
  "path": "remove/non_existant",
  "sessionId": "{{guid}}",
  "options": {
    "timeout": 20000
  },
  "protocol": "1.1.0"
}
```
###server -> client
```json
{
  "data": {
    "removed": 0
  },
  "_meta": {
    "timestamp": "{{number, utc}}",
    "path": "remove/non_existant",
    "type": "response",
    "status": "ok",
    "published": true,
    "eventId": "{{number, matches handler in client}}",
    "sessionId": "{{guid}}",
    "action": "/REMOVE@remove/non_existant"
  },
  "protocol": "1.1.0"
}
```
###an error happens when we try and remove an item

###client -> server
```json
{
  "action": "remove",
  "eventId": "{{number, matches handler in client}}",
  "path": "remove/failed",
  "sessionId": "{{guid}}",
  "options": {
    "timeout": 20000
  },
  "protocol": "1.1.0"
}
```
###server -> client
```json
{
  "data": null,
  "_meta": {
    "type": "response",
    "status": "error",
    "published": false,
    "eventId": "{{number, matches handler in client}}",
    "sessionId": "{{guid}}",
    "action": "remove",
    "error": {
      "name": "TestError",
      "message": "a fly in the ointment"
    }
  },
  "protocol": "1.1.0"
}
```
###an error happens when we try and remove an item, access denied

###client -> server
```json
{
  "action": "remove",
  "eventId": "{{number, matches handler in client}}",
  "path": "remove/no/permissions",
  "sessionId": "{{guid}}",
  "options": {
    "timeout": 20000
  },
  "protocol": "1.1.0"
}
```
###server -> client
```json
{
  "data": null,
  "_meta": {
    "type": "response",
    "status": "error",
    "published": false,
    "eventId": "{{number, matches handler in client}}",
    "sessionId": "{{guid}}",
    "action": "remove",
    "error": {
      "name": "AccessDenied",
      "message": "unauthorized"
    }
  },
  "protocol": "1.1.0"
}
```
#data subscriptions

###subscribe to all changes on all data points

###client -> server
```json
{
  "action": "on",
  "eventId": "{{number, matches handler in client}}",
  "path": "/ALL@*",
  "sessionId": "{{guid}}",
  "options": {
    "event_type": "all",
    "count": 0,
    "refCount": 0,
    "timeout": 20000
  },
  "protocol": "1.1.0"
}
```
###server -> client
```json
{
  "data": {},
  "_meta": {
    "status": "ok",
    "type": "response",
    "published": false,
    "eventId": "{{number, matches handler in client}}",
    "sessionId": "{{guid}}",
    "action": "on"
  },
  "protocol": "1.1.0"
}
```
###set a piece of data, and get the event back based on the subscription in the previous step

*the item from the server with the _meta.type 'data' is the emitted event - the other server -> client message with _meta.type 'response' is the response on the set action*

###client -> server
```json
{
  "action": "set",
  "eventId": "{{number, matches handler in client}}",
  "path": "/subscribe/on/all/events",
  "data": {
    "data": {
      "was": "set"
    }
  },
  "sessionId": "{{guid}}",
  "options": {
    "timeout": 20000
  },
  "protocol": "1.1.0"
}
```
###server -> client
```json
{
  "data": {
    "data": {
      "was": "set"
    }
  },
  "_meta": {
    "created": "{{number, utc}}",
    "modified": "{{number, utc}}",
    "path": "/subscribe/on/all/events",
    "type": "data",
    "sessionId": "{{guid}}",
    "action": "/SET@/subscribe/on/all/events",
    "channel": "/ALL@*"
  },
  "protocol": "1.1.0"
}
```
###server -> client
```json
{
  "data": {
    "data": {
      "was": "set"
    }
  },
  "_meta": {
    "created": "{{number, utc}}",
    "modified": "{{number, utc}}",
    "path": "/subscribe/on/all/events",
    "type": "response",
    "status": "ok",
    "published": true,
    "eventId": "{{number, matches handler in client}}",
    "sessionId": "{{guid}}",
    "action": "/SET@/subscribe/on/all/events"
  },
  "protocol": "1.1.0"
}
```
###unsubscribe from all changes on all data points, NB: will remove all subscriptions

###client -> server
```json
{
  "action": "off",
  "eventId": "{{number, matches handler in client}}",
  "path": "*",
  "sessionId": "{{guid}}",
  "options": {
    "refCount": 0,
    "timeout": 20000
  },
  "protocol": "1.1.0"
}
```
###server -> client
```json
{
  "data": {},
  "_meta": {
    "status": "ok",
    "type": "response",
    "published": false,
    "eventId": "{{number, matches handler in client}}",
    "sessionId": "{{guid}}",
    "action": "off"
  },
  "protocol": "1.1.0"
}
```
###subscribe to only set actions on a specific data point

###client -> server
```json
{
  "action": "on",
  "eventId": "{{number, matches handler in client}}",
  "path": "/SET@/subscribe/on/specific",
  "sessionId": "{{guid}}",
  "options": {
    "event_type": "set",
    "count": 0,
    "refCount": 1,
    "timeout": 20000
  },
  "protocol": "1.1.0"
}
```
###server -> client
```json
{
  "data": {},
  "_meta": {
    "status": "ok",
    "type": "response",
    "published": false,
    "eventId": "{{number, matches handler in client}}",
    "sessionId": "{{guid}}",
    "action": "on"
  },
  "protocol": "1.1.0"
}
```
###set a piece of data, and get the event back based on the subscription in the previous step

*the item from the server with the _meta.type 'data' is the emitted event - the other server -> client message with _meta.type 'response' is the response on the set action*

###client -> server
```json
{
  "action": "set",
  "eventId": "{{number, matches handler in client}}",
  "path": "/subscribe/on/specific",
  "data": {
    "data": {
      "was": "set"
    }
  },
  "sessionId": "{{guid}}",
  "options": {
    "timeout": 20000
  },
  "protocol": "1.1.0"
}
```
###server -> client
```json
{
  "data": {
    "data": {
      "was": "set"
    }
  },
  "_meta": {
    "created": "{{number, utc}}",
    "modified": "{{number, utc}}",
    "path": "/subscribe/on/specific",
    "type": "data",
    "sessionId": "{{guid}}",
    "action": "/SET@/subscribe/on/specific",
    "channel": "/SET@/subscribe/on/specific"
  },
  "protocol": "1.1.0"
}
```
###server -> client
```json
{
  "data": {
    "data": {
      "was": "set"
    }
  },
  "_meta": {
    "created": "{{number, utc}}",
    "modified": "{{number, utc}}",
    "path": "/subscribe/on/specific",
    "type": "response",
    "status": "ok",
    "published": true,
    "eventId": "{{number, matches handler in client}}",
    "sessionId": "{{guid}}",
    "action": "/SET@/subscribe/on/specific"
  },
  "protocol": "1.1.0"
}
```
###subscribe to the removal of data at a specified point

(an item with the path /subscribe/on/remove was previously added)
###client -> server
```json
{
  "action": "on",
  "eventId": "{{number, matches handler in client}}",
  "path": "/REMOVE@/subscribe/on/remove",
  "sessionId": "{{guid}}",
  "options": {
    "event_type": "remove",
    "count": 0,
    "refCount": 2,
    "timeout": 20000
  },
  "protocol": "1.1.0"
}
```
###server -> client
```json
{
  "data": {},
  "_meta": {
    "status": "ok",
    "type": "response",
    "published": false,
    "eventId": "{{number, matches handler in client}}",
    "sessionId": "{{guid}}",
    "action": "on"
  },
  "protocol": "1.1.0"
}
```
###remove a piece of data, and get the event back based on the subscription in the previous step

*the item from the server with the _meta.type 'data' is the emitted event - the other server -> client message with _meta.type 'response' is the response on the remove action*

###client -> server
```json
{
  "action": "remove",
  "eventId": "{{number, matches handler in client}}",
  "path": "/subscribe/on/remove",
  "sessionId": "{{guid}}",
  "options": {
    "timeout": 20000
  },
  "protocol": "1.1.0"
}
```
###server -> client
```json
{
  "data": {
    "removed": 1
  },
  "_meta": {
    "timestamp": "{{number, utc}}",
    "path": "/subscribe/on/remove",
    "type": "data",
    "sessionId": "{{guid}}",
    "action": "/REMOVE@/subscribe/on/remove",
    "channel": "/REMOVE@/subscribe/on/remove"
  },
  "protocol": "1.1.0"
}
```
###server -> client
```json
{
  "data": {
    "removed": 1
  },
  "_meta": {
    "timestamp": "{{number, utc}}",
    "path": "/subscribe/on/remove",
    "type": "response",
    "status": "ok",
    "published": true,
    "eventId": "{{number, matches handler in client}}",
    "sessionId": "{{guid}}",
    "action": "/REMOVE@/subscribe/on/remove"
  },
  "protocol": "1.1.0"
}
```
###subscribe to a change only once, on the native happn client this is done by specifying the 'count' option, but you can tell from the following sequence how to unsubscribe

###client -> server
```json
{
  "action": "on",
  "eventId": "{{number, matches handler in client}}",
  "path": "/ALL@/subscribe/once",
  "sessionId": "{{guid}}",
  "options": {
    "event_type": "all",
    "count": 1,
    "refCount": 3,
    "timeout": 20000
  },
  "protocol": "1.1.0"
}
```
###server -> client
```json
{
  "data": {},
  "_meta": {
    "status": "ok",
    "type": "response",
    "published": false,
    "eventId": "{{number, matches handler in client}}",
    "sessionId": "{{guid}}",
    "action": "on"
  },
  "protocol": "1.1.0"
}
```
###set a piece of data, and get the event back based on the subscription in the previous step

*the item from the server with the _meta.type 'data' is the emitted event - the other server -> client message with _meta.type 'response' is the response on the set action*

###client -> server
```json
{
  "action": "set",
  "eventId": "{{number, matches handler in client}}",
  "path": "/subscribe/once",
  "data": {
    "data": {
      "was": "set"
    }
  },
  "sessionId": "{{guid}}",
  "options": {
    "timeout": 20000
  },
  "protocol": "1.1.0"
}
```
###server -> client
```json
{
  "data": {
    "data": {
      "was": "set"
    }
  },
  "_meta": {
    "created": "{{number, utc}}",
    "modified": "{{number, utc}}",
    "path": "/subscribe/once",
    "type": "data",
    "sessionId": "{{guid}}",
    "action": "/SET@/subscribe/once",
    "channel": "/ALL@/subscribe/once"
  },
  "protocol": "1.1.0"
}
```
###server -> client
```json
{
  "data": {
    "data": {
      "was": "set"
    }
  },
  "_meta": {
    "created": "{{number, utc}}",
    "modified": "{{number, utc}}",
    "path": "/subscribe/once",
    "type": "response",
    "status": "ok",
    "published": true,
    "eventId": "{{number, matches handler in client}}",
    "sessionId": "{{guid}}",
    "action": "/SET@/subscribe/once"
  },
  "protocol": "1.1.0"
}
```
###perform an action without publishing using the noPublish flag

###client -> server
```json
{
  "action": "off",
  "eventId": "{{number, matches handler in client}}",
  "path": "/ALL@/subscribe/once",
  "sessionId": "{{guid}}",
  "options": {
    "refCount": 1,
    "timeout": 20000
  },
  "protocol": "1.1.0"
}
```
###server -> client
```json
{
  "data": {},
  "_meta": {
    "status": "ok",
    "type": "response",
    "published": false,
    "eventId": "{{number, matches handler in client}}",
    "sessionId": "{{guid}}",
    "action": "off"
  },
  "protocol": "1.1.0"
}
```
###client -> server
```json
{
  "action": "on",
  "eventId": "{{number, matches handler in client}}",
  "path": "/ALL@/subscribe/noPublish",
  "sessionId": "{{guid}}",
  "options": {
    "event_type": "all",
    "count": 0,
    "refCount": 4,
    "timeout": 20000
  },
  "protocol": "1.1.0"
}
```
###server -> client
```json
{
  "data": {},
  "_meta": {
    "status": "ok",
    "type": "response",
    "published": false,
    "eventId": "{{number, matches handler in client}}",
    "sessionId": "{{guid}}",
    "action": "on"
  },
  "protocol": "1.1.0"
}
```
###set a piece of data, and get a response from the server, but no publication because noPublish was set to true

*the item from the server with the _meta.type 'data' is the emitted event - the other server -> client message with _meta.type 'response' is the response on the set action*

###client -> server
```json
{
  "action": "set",
  "eventId": "{{number, matches handler in client}}",
  "path": "/subscribe/noPublish",
  "data": {
    "data": {
      "was": "set"
    }
  },
  "sessionId": "{{guid}}",
  "options": {
    "noPublish": true,
    "timeout": 20000
  },
  "protocol": "1.1.0"
}
```
###server -> client
```json
{
  "data": {
    "data": {
      "was": "set"
    }
  },
  "_meta": {
    "created": "{{number, utc}}",
    "modified": "{{number, utc}}",
    "path": "/subscribe/noPublish",
    "type": "response",
    "status": "ok",
    "published": false,
    "eventId": "{{number, matches handler in client}}",
    "sessionId": "{{guid}}",
    "action": "set"
  },
  "protocol": "1.1.0"
}
```
###failure to subscribe

###client -> server
```json
{
  "action": "on",
  "eventId": "{{number, matches handler in client}}",
  "path": "/ALL@/subscription/error",
  "sessionId": "{{guid}}",
  "options": {
    "event_type": "all",
    "count": 0,
    "refCount": 5,
    "timeout": 20000
  },
  "protocol": "1.1.0"
}
```
###server -> client
```json
{
  "data": null,
  "_meta": {
    "type": "response",
    "status": "error",
    "published": false,
    "eventId": "{{number, matches handler in client}}",
    "sessionId": "{{guid}}",
    "action": "on",
    "error": {
      "name": "TestError",
      "message": "a fly in the ointment"
    }
  },
  "protocol": "1.1.0"
}
```
###failure to subscribe - access denied

###client -> server
```json
{
  "action": "on",
  "eventId": "{{number, matches handler in client}}",
  "path": "/ALL@/subscription/access/denied",
  "sessionId": "{{guid}}",
  "options": {
    "event_type": "all",
    "count": 0,
    "refCount": 0,
    "timeout": 20000
  },
  "protocol": "1.1.0"
}
```
###server -> client
```json
{
  "data": null,
  "_meta": {
    "type": "response",
    "status": "error",
    "published": false,
    "eventId": "{{number, matches handler in client}}",
    "sessionId": "{{guid}}",
    "action": "on",
    "error": {
      "name": "AccessDenied",
      "message": "unauthorized"
    }
  },
  "protocol": "1.1.0"
}
```
#Disconnection

###the client sends out a disconnect request, which the server receives - the server then queues the disconnection request, the client the ends the websocket session, and the server cleans up on the other side without sending a disconnection warning

###client -> server
```json
{
  "action": "off",
  "eventId": "{{number, matches handler in client}}",
  "path": "*",
  "sessionId": "{{guid}}",
  "options": {
    "refCount": 0,
    "timeout": 20000
  },
  "protocol": "1.1.0"
}
```
###server -> client
```json
{
  "data": {},
  "_meta": {
    "status": "ok",
    "type": "response",
    "published": false,
    "eventId": "{{number, matches handler in client}}",
    "sessionId": "{{guid}}",
    "action": "off"
  },
  "protocol": "1.1.0"
}
```
###when a client is forcefully diconnected from the server side, or when a service shutdown happens, all clients are notified a disconnection is imminent

*the disconnectAllClients method is called - this method is called on the happn instance shutdown, causing the server to push out a disconnection message to all connected clients*

