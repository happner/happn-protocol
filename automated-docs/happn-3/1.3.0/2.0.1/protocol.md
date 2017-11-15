#happn protocol specification

##PROTOCOL VERSION: 1.3.0
###HAPPN VERSION: 2.0.1
####RUN: 2017 November 15 09:56
#connect a client

###create a client session and login

(existing client with session id: 961d5c76-fb2f-4823-85e2-73a2a6b16f4d was already created) ##DIFF_IGNORE
###client -> server
```json
{
  "action": "configure-session",
  "eventId": "{{number, matches handler in client}}",
  "data": {
    "protocol": "{{happn protocol}}"
  }
}
```
###server -> client
```json
"{\n  \"data\": null,\n  \"_meta\": {\n    \"type\": \"response\",\n    \"status\": \"ok\",\n    \"published\": false,\n    \"eventId\": \"{{number, matches handler in client}}\",\n    \"action\": \"configure-session\"\n  },\n  \"protocol\": \"{{happn protocol}}\"\n}"
```
###client -> server
```json
{
  "action": "describe",
  "eventId": "{{number, matches handler in client}}"
}
```
###server -> client
```json
"{\n  \"data\": {\n    \"name\": \"{{string, server name - silly if not configured}}\",\n    \"secure\": true,\n    \"encryptPayloads\": false,\n    \"publicKey\": \"{{ECDSA public key}}\"\n  },\n  \"_meta\": {\n    \"type\": \"response\",\n    \"status\": \"ok\",\n    \"published\": false,\n    \"eventId\": \"{{number, matches handler in client}}\",\n    \"action\": \"describe\"\n  },\n  \"protocol\": \"{{happn protocol}}\"\n}"
```
###client -> server
```json
{
  "action": "login",
  "eventId": "{{number, matches handler in client}}",
  "data": {
    "username": "_ADMIN",
    "info": {
      "_browser": false,
      "_local": false
    },
    "protocol": "{{happn protocol}}",
    "password": "happn"
  },
  "options": {
    "timeout": 60000
  }
}
```
###server -> client
```json
"{\n  \"data\": {\n    \"id\": \"{{guid}}\",\n    \"protocol\": \"{{happn protocol}}\",\n    \"happn\": {\n      \"name\": \"{{string}}\",\n      \"secure\": true,\n      \"encryptPayloads\": false,\n      \"publicKey\": \"{{ECDSA public key}}\"\n    },\n    \"info\": {\n      \"_browser\": false,\n      \"_local\": false\n    },\n    \"type\": 1,\n    \"user\": {\n      \"custom_data\": {},\n      \"username\": \"_ADMIN\",\n      \"_meta\": {\n        \"created\": \"{{number, utc}}\",\n        \"modified\": \"{{number, utc}}\",\n        \"path\": \"/_SYSTEM/_SECURITY/_USER/_ADMIN\",\n        \"_id\": \"{{matches path if nedb, generated if mongo}}\"\n      },\n      \"groups\": {\n        \"_ADMIN\": {\n          \"data\": {},\n          \"_meta\": {\n            \"created\": \"{{number, utc}}\",\n            \"modified\": \"{{number, utc}}\",\n            \"path\": \"/_SYSTEM/_SECURITY/_USER/_ADMIN/_USER_GROUP/_ADMIN\",\n            \"_id\": \"{{matches path if nedb, generated if mongo}}\"\n          }\n        }\n      }\n    },\n    \"timestamp\": \"{{number, utc}}\",\n    \"isEncrypted\": false,\n    \"origin\": \"{{sessionId}}\",\n    \"policy\": {\n      \"0\": {\n        \"ttl\": 0,\n        \"inactivity_threshold\": null\n      },\n      \"1\": {\n        \"ttl\": 0,\n        \"inactivity_threshold\": null\n      }\n    },\n    \"permissionSetKey\": \"/_ADMIN/\",\n    \"token\": \"{{string, jwt token}}\"\n  },\n  \"_meta\": {\n    \"type\": \"response\",\n    \"status\": \"ok\",\n    \"published\": false,\n    \"eventId\": \"{{number, matches handler in client}}\",\n    \"action\": \"login\"\n  },\n  \"protocol\": \"{{happn protocol}}\"\n}"
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
    "timeout": 60000
  }
}
```
###server -> client
```json
"{\n  \"data\": {\n    \"data\": {\n      \"was\": \"set\"\n    }\n  },\n  \"_meta\": {\n    \"created\": \"{{number, utc}}\",\n    \"modified\": \"{{number, utc}}\",\n    \"modifiedBy\": \"_ADMIN\",\n    \"path\": \"/set/some/data\",\n    \"published\": true,\n    \"type\": \"response\",\n    \"status\": \"ok\",\n    \"eventId\": \"{{number, matches handler in client}}\",\n    \"sessionId\": \"{{guid}}\",\n    \"action\": \"set\"\n  },\n  \"protocol\": \"{{happn protocol}}\"\n}"
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
    "timeout": 60000
  }
}
```
###server -> client
```json
"{\n  \"data\": {\n    \"an\": {\n      \"additional\": \"field\"\n    },\n    \"data\": {\n      \"was\": \"set\"\n    }\n  },\n  \"_meta\": {\n    \"created\": \"{{number, utc}}\",\n    \"modified\": \"{{number, utc}}\",\n    \"path\": \"/set/some/data\",\n    \"published\": true,\n    \"type\": \"response\",\n    \"status\": \"ok\",\n    \"eventId\": \"{{number, matches handler in client}}\",\n    \"sessionId\": \"{{guid}}\",\n    \"action\": \"set\"\n  },\n  \"protocol\": \"{{happn protocol}}\"\n}"
```
###tag some existing data

*tag an existing record, a clone of the record gets stored under /_TAGS/{{tagged record path}}*

###client -> server
```json
{
  "action": "set",
  "eventId": "{{number, matches handler in client}}",
  "path": "/set/some/data",
  "data": null,
  "sessionId": "{{guid}}",
  "options": {
    "tag": "MYTAG",
    "nullValue": true,
    "timeout": 60000
  }
}
```
###server -> client
```json
"{\n  \"data\": {\n    \"data\": {\n      \"an\": {\n        \"additional\": \"field\"\n      },\n      \"data\": {\n        \"was\": \"set\"\n      }\n    },\n    \"_meta\": {\n      \"path\": \"/set/some/data\"\n    },\n    \"created\": \"{{number, utc}}\",\n    \"modified\": \"{{number, utc}}\",\n    \"_id\": \"{{matches path if nedb, generated if mongo}}\"\n  },\n  \"_meta\": {\n    \"created\": \"{{number, utc}}\",\n    \"modified\": \"{{number, utc}}\",\n    \"path\": \"{{/_TAGS/set/some/data/[unique generated id]}}\",\n    \"tag\": \"MYTAG\",\n    \"published\": true,\n    \"type\": \"response\",\n    \"status\": \"ok\",\n    \"eventId\": \"{{number, matches handler in client}}\",\n    \"sessionId\": \"{{guid}}\",\n    \"action\": \"set\"\n  },\n  \"protocol\": \"{{happn protocol}}\"\n}"
```
###tag failure

*fail to tag data that doesnt exist*

###client -> server
```json
{
  "action": "set",
  "eventId": "{{number, matches handler in client}}",
  "path": "tag/non-existent",
  "data": null,
  "sessionId": "{{guid}}",
  "options": {
    "tag": "MYTAG",
    "nullValue": true,
    "timeout": 60000
  }
}
```
###server -> client
```json
"{\n  \"data\": {\n    \"data\": {},\n    \"_meta\": {\n      \"path\": \"tag/non-existent\"\n    }\n  },\n  \"_meta\": {\n    \"created\": \"{{number, utc}}\",\n    \"modified\": \"{{number, utc}}\",\n    \"path\": \"{{/_TAGS/tag/non-existent/[unique generated id]}}\",\n    \"tag\": \"MYTAG\",\n    \"published\": true,\n    \"type\": \"response\",\n    \"status\": \"ok\",\n    \"eventId\": \"{{number, matches handler in client}}\",\n    \"sessionId\": \"{{guid}}\",\n    \"action\": \"set\"\n  },\n  \"protocol\": \"{{happn protocol}}\"\n}"
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
    "timeout": 60000
  }
}
```
###server -> client
```json
"{\n  \"data\": {\n    \"sibling\": \"data\"\n  },\n  \"_meta\": {\n    \"created\": \"{{number, utc}}\",\n    \"modified\": \"{{number, utc}}\",\n    \"modifiedBy\": \"_ADMIN\",\n    \"path\": \"set/sibling/data/[unique generated id]\",\n    \"published\": true,\n    \"type\": \"response\",\n    \"status\": \"ok\",\n    \"eventId\": \"{{number, matches handler in client}}\",\n    \"sessionId\": \"{{guid}}\",\n    \"action\": \"set\"\n  },\n  \"protocol\": \"{{happn protocol}}\"\n}"
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
    "timeout": 60000
  }
}
```
###server -> client
```json
"{\n  \"data\": null,\n  \"_meta\": {\n    \"type\": \"response\",\n    \"status\": \"error\",\n    \"published\": false,\n    \"eventId\": \"{{number, matches handler in client}}\",\n    \"sessionId\": \"{{guid}}\",\n    \"action\": \"set\",\n    \"error\": {\n      \"name\": \"TestError\",\n      \"message\": \"a fly in the ointment\"\n    }\n  },\n  \"protocol\": \"{{happn protocol}}\"\n}"
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
    "timeout": 60000
  }
}
```
###server -> client
```json
"{\n  \"data\": null,\n  \"_meta\": {\n    \"type\": \"response\",\n    \"status\": \"error\",\n    \"published\": false,\n    \"eventId\": \"{{number, matches handler in client}}\",\n    \"sessionId\": \"{{guid}}\",\n    \"action\": \"set\",\n    \"error\": {\n      \"name\": \"AccessDenied\",\n      \"code\": 403,\n      \"message\": \"unauthorized\"\n    }\n  },\n  \"protocol\": \"{{happn protocol}}\"\n}"
```
###removes one data point

###client -> server
```json
{
  "action": "remove",
  "eventId": "{{number, matches handler in client}}",
  "path": "remove/one",
  "data": null,
  "sessionId": "{{guid}}",
  "options": {
    "timeout": 60000
  }
}
```
###server -> client
```json
"{\n  \"data\": {\n    \"removed\": 1\n  },\n  \"_meta\": {\n    \"timestamp\": \"{{number, utc}}\",\n    \"path\": \"remove/one\",\n    \"published\": true,\n    \"type\": \"response\",\n    \"status\": \"ok\",\n    \"eventId\": \"{{number, matches handler in client}}\",\n    \"sessionId\": \"{{guid}}\",\n    \"action\": \"remove\"\n  },\n  \"protocol\": \"{{happn protocol}}\"\n}"
```
###call sequence representing a request to remove something that is not there

###client -> server
```json
{
  "action": "remove",
  "eventId": "{{number, matches handler in client}}",
  "path": "remove/non_existant",
  "data": null,
  "sessionId": "{{guid}}",
  "options": {
    "timeout": 60000
  }
}
```
###server -> client
```json
"{\n  \"data\": {\n    \"removed\": 0\n  },\n  \"_meta\": {\n    \"timestamp\": \"{{number, utc}}\",\n    \"path\": \"remove/non_existant\",\n    \"published\": true,\n    \"type\": \"response\",\n    \"status\": \"ok\",\n    \"eventId\": \"{{number, matches handler in client}}\",\n    \"sessionId\": \"{{guid}}\",\n    \"action\": \"remove\"\n  },\n  \"protocol\": \"{{happn protocol}}\"\n}"
```
###an error happens when we try and remove an item

###client -> server
```json
{
  "action": "remove",
  "eventId": "{{number, matches handler in client}}",
  "path": "remove/failed",
  "data": null,
  "sessionId": "{{guid}}",
  "options": {
    "timeout": 60000
  }
}
```
###server -> client
```json
"{\n  \"data\": null,\n  \"_meta\": {\n    \"type\": \"response\",\n    \"status\": \"error\",\n    \"published\": false,\n    \"eventId\": \"{{number, matches handler in client}}\",\n    \"sessionId\": \"{{guid}}\",\n    \"action\": \"remove\",\n    \"error\": {\n      \"name\": \"TestError\",\n      \"message\": \"a fly in the ointment\"\n    }\n  },\n  \"protocol\": \"{{happn protocol}}\"\n}"
```
###an error happens when we try and remove an item, access denied

###client -> server
```json
{
  "action": "remove",
  "eventId": "{{number, matches handler in client}}",
  "path": "remove/no/permissions",
  "data": null,
  "sessionId": "{{guid}}",
  "options": {
    "timeout": 60000
  }
}
```
###server -> client
```json
"{\n  \"data\": null,\n  \"_meta\": {\n    \"type\": \"response\",\n    \"status\": \"error\",\n    \"published\": false,\n    \"eventId\": \"{{number, matches handler in client}}\",\n    \"sessionId\": \"{{guid}}\",\n    \"action\": \"remove\",\n    \"error\": {\n      \"name\": \"AccessDenied\",\n      \"code\": 403,\n      \"message\": \"unauthorized\"\n    }\n  },\n  \"protocol\": \"{{happn protocol}}\"\n}"
```
#data subscriptions

###subscribe to all changes on all data points

###client -> server
```json
{
  "action": "on",
  "eventId": "{{number, matches handler in client}}",
  "path": "/ALL@*",
  "data": null,
  "sessionId": "{{guid}}",
  "options": {
    "event_type": "all",
    "count": 0,
    "listenerId": 0,
    "refCount": 1,
    "timeout": 60000
  }
}
```
###server -> client
```json
"{\n  \"data\": {},\n  \"_meta\": {\n    \"status\": \"ok\",\n    \"type\": \"response\",\n    \"published\": false,\n    \"eventId\": \"{{number, matches handler in client}}\",\n    \"sessionId\": \"{{guid}}\",\n    \"action\": \"on\"\n  },\n  \"protocol\": \"{{happn protocol}}\"\n}"
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
    "timeout": 60000
  }
}
```
###server -> client
```json
"{\n  \"data\": {\n    \"data\": {\n      \"was\": \"set\"\n    }\n  },\n  \"_meta\": {\n    \"created\": \"{{number, utc}}\",\n    \"modified\": \"{{number, utc}}\",\n    \"modifiedBy\": \"_ADMIN\",\n    \"path\": \"/subscribe/on/all/events\",\n    \"channel\": \"/ALL@*\",\n    \"action\": \"/SET@/subscribe/on/all/events\",\n    \"type\": \"data\",\n    \"sessionId\": \"{{guid}}\",\n    \"consistency\": 2,\n    \"publicationId\": \"fd392dff-b097-4850-992e-c4ff15bbf851-15\"\n  },\n  \"__outbound\": true\n}"
```
###server -> client
```json
"{\n  \"data\": {\n    \"data\": {\n      \"was\": \"set\"\n    }\n  },\n  \"_meta\": {\n    \"created\": \"{{number, utc}}\",\n    \"modified\": \"{{number, utc}}\",\n    \"modifiedBy\": \"_ADMIN\",\n    \"path\": \"/subscribe/on/all/events\",\n    \"published\": true,\n    \"type\": \"response\",\n    \"status\": \"ok\",\n    \"eventId\": \"{{number, matches handler in client}}\",\n    \"sessionId\": \"{{guid}}\",\n    \"action\": \"set\"\n  },\n  \"protocol\": \"{{happn protocol}}\"\n}"
```
###unsubscribe from all changes on all data points, NB: will remove all subscriptions

###client -> server
```json
{
  "action": "off",
  "eventId": "{{number, matches handler in client}}",
  "path": "*",
  "data": null,
  "sessionId": "{{guid}}",
  "options": {
    "refCount": 0,
    "listenerId": -1,
    "timeout": 60000
  }
}
```
###server -> client
```json
"{\n  \"data\": {},\n  \"_meta\": {\n    \"status\": \"ok\",\n    \"type\": \"response\",\n    \"published\": false,\n    \"eventId\": \"{{number, matches handler in client}}\",\n    \"sessionId\": \"{{guid}}\",\n    \"action\": \"off\"\n  },\n  \"protocol\": \"{{happn protocol}}\"\n}"
```
###subscribe to only set actions on a specific data point

###client -> server
```json
{
  "action": "on",
  "eventId": "{{number, matches handler in client}}",
  "path": "/SET@/subscribe/on/specific",
  "data": null,
  "sessionId": "{{guid}}",
  "options": {
    "event_type": "set",
    "count": 0,
    "listenerId": 1,
    "refCount": 1,
    "timeout": 60000
  }
}
```
###server -> client
```json
"{\n  \"data\": {},\n  \"_meta\": {\n    \"status\": \"ok\",\n    \"type\": \"response\",\n    \"published\": false,\n    \"eventId\": \"{{number, matches handler in client}}\",\n    \"sessionId\": \"{{guid}}\",\n    \"action\": \"on\"\n  },\n  \"protocol\": \"{{happn protocol}}\"\n}"
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
    "timeout": 60000
  }
}
```
###server -> client
```json
"{\n  \"data\": {\n    \"data\": {\n      \"was\": \"set\"\n    }\n  },\n  \"_meta\": {\n    \"created\": \"{{number, utc}}\",\n    \"modified\": \"{{number, utc}}\",\n    \"modifiedBy\": \"_ADMIN\",\n    \"path\": \"/subscribe/on/specific\",\n    \"channel\": \"/SET@/subscribe/on/specific\",\n    \"action\": \"/SET@/subscribe/on/specific\",\n    \"type\": \"data\",\n    \"sessionId\": \"{{guid}}\",\n    \"consistency\": 2,\n    \"publicationId\": \"fd392dff-b097-4850-992e-c4ff15bbf851-18\"\n  },\n  \"__outbound\": true\n}"
```
###server -> client
```json
"{\n  \"data\": {\n    \"data\": {\n      \"was\": \"set\"\n    }\n  },\n  \"_meta\": {\n    \"created\": \"{{number, utc}}\",\n    \"modified\": \"{{number, utc}}\",\n    \"modifiedBy\": \"_ADMIN\",\n    \"path\": \"/subscribe/on/specific\",\n    \"published\": true,\n    \"type\": \"response\",\n    \"status\": \"ok\",\n    \"eventId\": \"{{number, matches handler in client}}\",\n    \"sessionId\": \"{{guid}}\",\n    \"action\": \"set\"\n  },\n  \"protocol\": \"{{happn protocol}}\"\n}"
```
###subscribe to the removal of data at a specified point

(an item with the path /subscribe/on/remove was previously added)
###client -> server
```json
{
  "action": "on",
  "eventId": "{{number, matches handler in client}}",
  "path": "/REMOVE@/subscribe/on/remove",
  "data": null,
  "sessionId": "{{guid}}",
  "options": {
    "event_type": "remove",
    "count": 0,
    "listenerId": 2,
    "refCount": 1,
    "timeout": 60000
  }
}
```
###server -> client
```json
"{\n  \"data\": {},\n  \"_meta\": {\n    \"status\": \"ok\",\n    \"type\": \"response\",\n    \"published\": false,\n    \"eventId\": \"{{number, matches handler in client}}\",\n    \"sessionId\": \"{{guid}}\",\n    \"action\": \"on\"\n  },\n  \"protocol\": \"{{happn protocol}}\"\n}"
```
###remove a piece of data, and get the event back based on the subscription in the previous step

*the item from the server with the _meta.type 'data' is the emitted event - the other server -> client message with _meta.type 'response' is the response on the remove action*

###client -> server
```json
{
  "action": "remove",
  "eventId": "{{number, matches handler in client}}",
  "path": "/subscribe/on/remove",
  "data": null,
  "sessionId": "{{guid}}",
  "options": {
    "timeout": 60000
  }
}
```
###server -> client
```json
"{\n  \"data\": {\n    \"removed\": 1\n  },\n  \"_meta\": {\n    \"timestamp\": \"{{number, utc}}\",\n    \"path\": \"/subscribe/on/remove\",\n    \"channel\": \"/REMOVE@/subscribe/on/remove\",\n    \"action\": \"/REMOVE@/subscribe/on/remove\",\n    \"type\": \"data\",\n    \"sessionId\": \"{{guid}}\",\n    \"consistency\": 2,\n    \"publicationId\": \"fd392dff-b097-4850-992e-c4ff15bbf851-21\"\n  },\n  \"__outbound\": true\n}"
```
###server -> client
```json
"{\n  \"data\": {\n    \"removed\": 1\n  },\n  \"_meta\": {\n    \"timestamp\": \"{{number, utc}}\",\n    \"path\": \"/subscribe/on/remove\",\n    \"published\": true,\n    \"type\": \"response\",\n    \"status\": \"ok\",\n    \"eventId\": \"{{number, matches handler in client}}\",\n    \"sessionId\": \"{{guid}}\",\n    \"action\": \"remove\"\n  },\n  \"protocol\": \"{{happn protocol}}\"\n}"
```
###subscribe to a change only once, on the native happn client this is done by specifying the 'count' option, but you can tell from the following sequence how to unsubscribe

###client -> server
```json
{
  "action": "on",
  "eventId": "{{number, matches handler in client}}",
  "path": "/ALL@/subscribe/once",
  "data": null,
  "sessionId": "{{guid}}",
  "options": {
    "event_type": "all",
    "count": 1,
    "listenerId": 3,
    "refCount": 1,
    "timeout": 60000
  }
}
```
###server -> client
```json
"{\n  \"data\": {},\n  \"_meta\": {\n    \"status\": \"ok\",\n    \"type\": \"response\",\n    \"published\": false,\n    \"eventId\": \"{{number, matches handler in client}}\",\n    \"sessionId\": \"{{guid}}\",\n    \"action\": \"on\"\n  },\n  \"protocol\": \"{{happn protocol}}\"\n}"
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
    "timeout": 60000
  }
}
```
###server -> client
```json
"{\n  \"data\": {\n    \"data\": {\n      \"was\": \"set\"\n    }\n  },\n  \"_meta\": {\n    \"created\": \"{{number, utc}}\",\n    \"modified\": \"{{number, utc}}\",\n    \"modifiedBy\": \"_ADMIN\",\n    \"path\": \"/subscribe/once\",\n    \"channel\": \"/ALL@/subscribe/once\",\n    \"action\": \"/SET@/subscribe/once\",\n    \"type\": \"data\",\n    \"sessionId\": \"{{guid}}\",\n    \"consistency\": 2,\n    \"publicationId\": \"fd392dff-b097-4850-992e-c4ff15bbf851-23\"\n  },\n  \"__outbound\": true\n}"
```
###server -> client
```json
"{\n  \"data\": {\n    \"data\": {\n      \"was\": \"set\"\n    }\n  },\n  \"_meta\": {\n    \"created\": \"{{number, utc}}\",\n    \"modified\": \"{{number, utc}}\",\n    \"modifiedBy\": \"_ADMIN\",\n    \"path\": \"/subscribe/once\",\n    \"published\": true,\n    \"type\": \"response\",\n    \"status\": \"ok\",\n    \"eventId\": \"{{number, matches handler in client}}\",\n    \"sessionId\": \"{{guid}}\",\n    \"action\": \"set\"\n  },\n  \"protocol\": \"{{happn protocol}}\"\n}"
```
###client -> server
```json
{
  "action": "off",
  "eventId": "{{number, matches handler in client}}",
  "path": "/ALL@/subscribe/once",
  "data": null,
  "sessionId": "{{guid}}",
  "options": {
    "refCount": 1,
    "listenerId": 3,
    "timeout": 60000
  }
}
```
###perform an action without publishing using the noPublish flag

###client -> server
```json
{
  "action": "on",
  "eventId": "{{number, matches handler in client}}",
  "path": "/ALL@/subscribe/noPublish",
  "data": null,
  "sessionId": "{{guid}}",
  "options": {
    "event_type": "all",
    "count": 0,
    "listenerId": 4,
    "refCount": 1,
    "timeout": 60000
  }
}
```
###server -> client
```json
"{\n  \"data\": {},\n  \"_meta\": {\n    \"status\": \"ok\",\n    \"type\": \"response\",\n    \"published\": false,\n    \"eventId\": \"{{number, matches handler in client}}\",\n    \"sessionId\": \"{{guid}}\",\n    \"action\": \"off\"\n  },\n  \"protocol\": \"{{happn protocol}}\"\n}"
```
###server -> client
```json
"{\n  \"data\": {},\n  \"_meta\": {\n    \"status\": \"ok\",\n    \"type\": \"response\",\n    \"published\": false,\n    \"eventId\": \"{{number, matches handler in client}}\",\n    \"sessionId\": \"{{guid}}\",\n    \"action\": \"on\"\n  },\n  \"protocol\": \"{{happn protocol}}\"\n}"
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
    "timeout": 60000
  }
}
```
###server -> client
```json
"{\n  \"data\": {\n    \"data\": {\n      \"was\": \"set\"\n    }\n  },\n  \"_meta\": {\n    \"created\": \"{{number, utc}}\",\n    \"modified\": \"{{number, utc}}\",\n    \"modifiedBy\": \"_ADMIN\",\n    \"path\": \"/subscribe/noPublish\",\n    \"type\": \"response\",\n    \"status\": \"ok\",\n    \"published\": false,\n    \"eventId\": \"{{number, matches handler in client}}\",\n    \"sessionId\": \"{{guid}}\",\n    \"action\": \"set\"\n  },\n  \"protocol\": \"{{happn protocol}}\"\n}"
```
###failure to subscribe

###client -> server
```json
{
  "action": "on",
  "eventId": "{{number, matches handler in client}}",
  "path": "/ALL@/subscription/error",
  "data": null,
  "sessionId": "{{guid}}",
  "options": {
    "event_type": "all",
    "count": 0,
    "listenerId": 5,
    "refCount": 1,
    "timeout": 60000
  }
}
```
###server -> client
```json
"{\n  \"data\": null,\n  \"_meta\": {\n    \"type\": \"response\",\n    \"status\": \"error\",\n    \"published\": false,\n    \"eventId\": \"{{number, matches handler in client}}\",\n    \"sessionId\": \"{{guid}}\",\n    \"action\": \"on\",\n    \"error\": {\n      \"name\": \"TestError\",\n      \"message\": \"a fly in the ointment\"\n    }\n  },\n  \"protocol\": \"{{happn protocol}}\"\n}"
```
###failure to subscribe - access denied

###client -> server
```json
{
  "action": "on",
  "eventId": "{{number, matches handler in client}}",
  "path": "/ALL@/subscription/access/denied",
  "data": null,
  "sessionId": "{{guid}}",
  "options": {
    "event_type": "all",
    "count": 0,
    "listenerId": 0,
    "refCount": 1,
    "timeout": 60000
  }
}
```
###server -> client
```json
"{\n  \"data\": null,\n  \"_meta\": {\n    \"type\": \"response\",\n    \"status\": \"error\",\n    \"published\": false,\n    \"eventId\": \"{{number, matches handler in client}}\",\n    \"sessionId\": \"{{guid}}\",\n    \"action\": \"on\",\n    \"error\": {\n      \"name\": \"AccessDenied\",\n      \"code\": 403,\n      \"message\": \"unauthorized\"\n    }\n  },\n  \"protocol\": \"{{happn protocol}}\"\n}"
```
#Disconnection

###the client sends out a disconnect request, which the server receives - the server then queues the disconnection request, the client the ends the websocket session, and the server cleans up on the other side without sending a disconnection warning

###client -> server
```json
{
  "action": "disconnect",
  "eventId": "{{number, matches handler in client}}",
  "sessionId": "{{guid}}",
  "options": {
    "timeout": 60000
  }
}
```
###server -> client
```json
"{\n  \"data\": null,\n  \"_meta\": {\n    \"type\": \"response\",\n    \"status\": \"ok\",\n    \"published\": false,\n    \"eventId\": \"{{number, matches handler in client}}\",\n    \"sessionId\": \"{{guid}}\",\n    \"action\": \"disconnect\"\n  },\n  \"protocol\": \"{{happn protocol}}\"\n}"
```
###when a client is forcefully diconnected from the server side, or when a service shutdown happens, all clients are notified a disconnection is imminent

*the disconnectAllClients method is called - this method is called on the happn instance shutdown, causing the server to push out a disconnection message to all connected clients*

one connected client remaining, so disconnect warning is sent to it, session id (matches the one stipulated in section 1_1) is:961d5c76-fb2f-4823-85e2-73a2a6b16f4d  ##DIFF_IGNORE
###server -> client
```json
"{\n  \"_meta\": {\n    \"type\": \"system\"\n  },\n  \"eventKey\": \"server-side-disconnect\",\n  \"data\": \"server-side-disconnect\"\n}"
```
