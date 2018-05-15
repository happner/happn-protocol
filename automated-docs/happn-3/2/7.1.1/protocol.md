# happn protocol specification

## PROTOCOL VERSION: 2
### HAPPN VERSION: 7.1.1
#### RUN: 2018 May 15 05:18
# connect a client

### create a client session and login

(existing client with session id: 04282db9-aea4-4868-a26e-289c2d9b419c was already created) ##DIFF_IGNORE
### client -> server
```json
{
  "action": "configure-session",
  "eventId": "{{number, matches handler in client}}",
  "data": {
    "protocol": "happn_2"
  }
}
```
### server -> client
```json
{
  "data": null,
  "_meta": {
    "type": "response",
    "status": "ok",
    "published": false,
    "eventId": "{{number, matches handler in client}}",
    "action": "configure-session"
  },
  "protocol": "happn_2"
}
```
### client -> server
```json
{
  "action": "describe",
  "eventId": "{{number, matches handler in client}}"
}
```
### server -> client
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
  "protocol": "happn_2"
}
```
### client -> server
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
    "protocol": "happn_2",
    "password": "happn"
  },
  "options": {
    "timeout": 60000
  }
}
```
### server -> client
```json
{
  "data": {
    "id": "{{guid}}",
    "protocol": "happn_2",
    "happn": {
      "name": "{{string}}",
      "secure": true,
      "encryptPayloads": false,
      "publicKey": "{{ECDSA public key}}"
    },
    "info": {
      "_browser": false,
      "_local": false
    },
    "type": 1,
    "user": {
      "custom_data": {},
      "username": "_ADMIN",
      "_meta": {
        "created": "{{number, utc}}",
        "modified": "{{number, utc}}",
        "path": "/_SYSTEM/_SECURITY/_USER/_ADMIN",
        "_id": "{{matches path if nedb, generated if mongo}}"
      }
    },
    "timestamp": "{{number, utc}}",
    "isEncrypted": false,
    "origin": "{{sessionId}}",
    "policy": {
      "0": {
        "ttl": 0,
        "inactivity_threshold": null
      },
      "1": {
        "ttl": 0,
        "inactivity_threshold": null
      }
    },
    "permissionSetKey": "FIgtui0QhsDlIrZYrku+TgJn7oY=",
    "token": "{{string, jwt token}}"
  },
  "_meta": {
    "type": "response",
    "status": "ok",
    "published": false,
    "eventId": "{{number, matches handler in client}}",
    "action": "login"
  },
  "protocol": "happn_2"
}
```
# set

### set a piece of data using a key value pair

### client -> server
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
### server -> client
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
    "modifiedBy": "_ADMIN",
    "path": "/set/some/data",
    "published": true,
    "type": "response",
    "status": "ok",
    "eventId": "{{number, matches handler in client}}",
    "sessionId": "{{guid}}",
    "action": "set"
  },
  "protocol": "happn_2"
}
```
### merge some new values with an existing record, NB: the merge only goes 1 property level deep

### client -> server
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
### server -> client
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
    "published": true,
    "type": "response",
    "status": "ok",
    "eventId": "{{number, matches handler in client}}",
    "sessionId": "{{guid}}",
    "action": "set"
  },
  "protocol": "happn_2"
}
```
### tag some existing data

*tag an existing record, a clone of the record gets stored under /_TAGS/{{tagged record path}}*

### client -> server
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
### server -> client
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
    "published": true,
    "type": "response",
    "status": "ok",
    "eventId": "{{number, matches handler in client}}",
    "sessionId": "{{guid}}",
    "action": "set"
  },
  "protocol": "happn_2"
}
```
### tag failure

*fail to tag data that doesnt exist*

### client -> server
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
### server -> client
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
    "path": "{{/_TAGS/tag/non-existent/[unique generated id]}}",
    "tag": "MYTAG",
    "published": true,
    "type": "response",
    "status": "ok",
    "eventId": "{{number, matches handler in client}}",
    "sessionId": "{{guid}}",
    "action": "set"
  },
  "protocol": "happn_2"
}
```
### setSibling

*create sibling records on a base path*

### client -> server
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
### server -> client
```json
{
  "data": {
    "sibling": "data"
  },
  "_meta": {
    "created": "{{number, utc}}",
    "modified": "{{number, utc}}",
    "modifiedBy": "_ADMIN",
    "path": "set/sibling/data/[unique generated id]",
    "published": true,
    "type": "response",
    "status": "ok",
    "eventId": "{{number, matches handler in client}}",
    "sessionId": "{{guid}}",
    "action": "set"
  },
  "protocol": "happn_2"
}
```
### fails to do a set

### client -> server
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
### server -> client
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
  "protocol": "happn_2"
}
```
### fails to do a set, access denied, unauthorised

### client -> server
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
### server -> client
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
      "code": 403,
      "message": "unauthorized"
    }
  },
  "protocol": "happn_2"
}
```
### removes one data point

### client -> server
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
### server -> client
```json
{
  "data": {
    "removed": 1
  },
  "_meta": {
    "timestamp": "{{number, utc}}",
    "path": "remove/one",
    "published": true,
    "type": "response",
    "status": "ok",
    "eventId": "{{number, matches handler in client}}",
    "sessionId": "{{guid}}",
    "action": "remove"
  },
  "protocol": "happn_2"
}
```
### call sequence representing a request to remove something that is not there

### client -> server
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
### server -> client
```json
{
  "data": {
    "removed": 0
  },
  "_meta": {
    "timestamp": "{{number, utc}}",
    "path": "remove/non_existant",
    "published": true,
    "type": "response",
    "status": "ok",
    "eventId": "{{number, matches handler in client}}",
    "sessionId": "{{guid}}",
    "action": "remove"
  },
  "protocol": "happn_2"
}
```
### an error happens when we try and remove an item

### client -> server
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
### server -> client
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
  "protocol": "happn_2"
}
```
### an error happens when we try and remove an item, access denied

### client -> server
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
### server -> client
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
      "code": 403,
      "message": "unauthorized"
    }
  },
  "protocol": "happn_2"
}
```
# data subscriptions

### subscribe to all changes on all data points

### client -> server
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
    "timeout": 60000
  }
}
```
### server -> client
```json
{
  "data": {
    "id": "{{guid}}"
  },
  "_meta": {
    "status": "ok",
    "type": "response",
    "published": false,
    "eventId": "{{number, matches handler in client}}",
    "sessionId": "{{guid}}",
    "action": "on"
  },
  "protocol": "happn_2"
}
```
### set a piece of data, and get the event back based on the subscription in the previous step

*the item from the server with the _meta.type 'data' is the emitted event - the other server -> client message with _meta.type 'response' is the response on the set action*

### client -> server
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
### server -> client
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
    "modifiedBy": "_ADMIN",
    "path": "/subscribe/on/all/events",
    "channel": "/ALL@*",
    "action": "/SET@/subscribe/on/all/events",
    "type": "data",
    "sessionId": "{{guid}}",
    "consistency": 2,
    "publicationId": "7df63e17-7df4-4be0-923d-59ab06413a8d-15"
  },
  "__outbound": true
}
```
### server -> client
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
    "modifiedBy": "_ADMIN",
    "path": "/subscribe/on/all/events",
    "published": true,
    "type": "response",
    "status": "ok",
    "eventId": "{{number, matches handler in client}}",
    "sessionId": "{{guid}}",
    "action": "set"
  },
  "protocol": "happn_2"
}
```
### unsubscribe from all changes on all data points, NB: will remove all subscriptions

### client -> server
```json
{
  "action": "off",
  "eventId": "{{number, matches handler in client}}",
  "path": "*",
  "data": null,
  "sessionId": "{{guid}}",
  "options": {
    "referenceId": 0,
    "timeout": 60000
  }
}
```
### server -> client
```json
{
  "data": {
    "id": false,
    "removed": [
      {
        "key": "7df63e17-7df4-4be0-923d-59ab06413a8d",
        "data": {
          "options": {
            "event_type": "all",
            "count": 0,
            "listenerId": 0,
            "timeout": 60000
          },
          "session": {
            "id": "{{guid}}",
            "protocol": "happn_2",
            "info": {
              "_browser": false,
              "_local": false
            }
          },
          "action": "ALL",
          "path": "*"
        },
        "id": "{{guid}}",
        "path": "*"
      }
    ]
  },
  "_meta": {
    "status": "ok",
    "type": "response",
    "published": false,
    "eventId": "{{number, matches handler in client}}",
    "sessionId": "{{guid}}",
    "action": "off"
  },
  "protocol": "happn_2"
}
```
### subscribe to only set actions on a specific data point

### client -> server
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
    "timeout": 60000
  }
}
```
### server -> client
```json
{
  "data": {
    "id": "{{guid}}"
  },
  "_meta": {
    "status": "ok",
    "type": "response",
    "published": false,
    "eventId": "{{number, matches handler in client}}",
    "sessionId": "{{guid}}",
    "action": "on"
  },
  "protocol": "happn_2"
}
```
### set a piece of data, and get the event back based on the subscription in the previous step

*the item from the server with the _meta.type 'data' is the emitted event - the other server -> client message with _meta.type 'response' is the response on the set action*

### client -> server
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
### server -> client
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
    "modifiedBy": "_ADMIN",
    "path": "/subscribe/on/specific",
    "channel": "/SET@/subscribe/on/specific",
    "action": "/SET@/subscribe/on/specific",
    "type": "data",
    "sessionId": "{{guid}}",
    "consistency": 2,
    "publicationId": "7df63e17-7df4-4be0-923d-59ab06413a8d-18"
  },
  "__outbound": true
}
```
### server -> client
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
    "modifiedBy": "_ADMIN",
    "path": "/subscribe/on/specific",
    "published": true,
    "type": "response",
    "status": "ok",
    "eventId": "{{number, matches handler in client}}",
    "sessionId": "{{guid}}",
    "action": "set"
  },
  "protocol": "happn_2"
}
```
### subscribe to the removal of data at a specified point

(an item with the path /subscribe/on/remove was previously added)
### client -> server
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
    "timeout": 60000
  }
}
```
### server -> client
```json
{
  "data": {
    "id": "{{guid}}"
  },
  "_meta": {
    "status": "ok",
    "type": "response",
    "published": false,
    "eventId": "{{number, matches handler in client}}",
    "sessionId": "{{guid}}",
    "action": "on"
  },
  "protocol": "happn_2"
}
```
### remove a piece of data, and get the event back based on the subscription in the previous step

*the item from the server with the _meta.type 'data' is the emitted event - the other server -> client message with _meta.type 'response' is the response on the remove action*

### client -> server
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
### server -> client
```json
{
  "data": {
    "removed": 1
  },
  "_meta": {
    "timestamp": "{{number, utc}}",
    "path": "/subscribe/on/remove",
    "channel": "/REMOVE@/subscribe/on/remove",
    "action": "/REMOVE@/subscribe/on/remove",
    "type": "data",
    "sessionId": "{{guid}}",
    "consistency": 2,
    "publicationId": "7df63e17-7df4-4be0-923d-59ab06413a8d-21"
  },
  "__outbound": true
}
```
### server -> client
```json
{
  "data": {
    "removed": 1
  },
  "_meta": {
    "timestamp": "{{number, utc}}",
    "path": "/subscribe/on/remove",
    "published": true,
    "type": "response",
    "status": "ok",
    "eventId": "{{number, matches handler in client}}",
    "sessionId": "{{guid}}",
    "action": "remove"
  },
  "protocol": "happn_2"
}
```
### subscribe to a change only once, on the native happn client this is done by specifying the 'count' option, but you can tell from the following sequence how to unsubscribe

### client -> server
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
    "timeout": 60000
  }
}
```
### server -> client
```json
{
  "data": {
    "id": "{{guid}}"
  },
  "_meta": {
    "status": "ok",
    "type": "response",
    "published": false,
    "eventId": "{{number, matches handler in client}}",
    "sessionId": "{{guid}}",
    "action": "on"
  },
  "protocol": "happn_2"
}
```
### set a piece of data, and get the event back based on the subscription in the previous step

*the item from the server with the _meta.type 'data' is the emitted event - the other server -> client message with _meta.type 'response' is the response on the set action*

### client -> server
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
### server -> client
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
    "modifiedBy": "_ADMIN",
    "path": "/subscribe/once",
    "channel": "/ALL@/subscribe/once",
    "action": "/SET@/subscribe/once",
    "type": "data",
    "sessionId": "{{guid}}",
    "consistency": 2,
    "publicationId": "7df63e17-7df4-4be0-923d-59ab06413a8d-23"
  },
  "__outbound": true
}
```
### server -> client
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
    "modifiedBy": "_ADMIN",
    "path": "/subscribe/once",
    "published": true,
    "type": "response",
    "status": "ok",
    "eventId": "{{number, matches handler in client}}",
    "sessionId": "{{guid}}",
    "action": "set"
  },
  "protocol": "happn_2"
}
```
### client -> server
```json
{
  "action": "off",
  "eventId": "{{number, matches handler in client}}",
  "path": "/ALL@/subscribe/once",
  "data": null,
  "sessionId": "{{guid}}",
  "options": {
    "referenceId": "{{unique id (hyperid)}}",
    "timeout": 60000
  }
}
```
### perform an action without publishing using the noPublish flag

### client -> server
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
    "timeout": 60000
  }
}
```
### server -> client
```json
{
  "data": {
    "id": "{{guid}}",
    "removed": [
      {
        "id": "{{guid}}",
        "data": {
          "options": {
            "event_type": "all",
            "count": 1,
            "listenerId": 3,
            "timeout": 60000
          },
          "session": {
            "id": "{{guid}}",
            "protocol": "happn_2",
            "info": {
              "_browser": false,
              "_local": false
            }
          },
          "action": "ALL",
          "path": "/subscribe/once"
        },
        "key": "7df63e17-7df4-4be0-923d-59ab06413a8d",
        "path": "/subscribe/once",
        "segment": "/subscribe/once",
        "branch": 0
      }
    ]
  },
  "_meta": {
    "status": "ok",
    "type": "response",
    "published": false,
    "eventId": "{{number, matches handler in client}}",
    "sessionId": "{{guid}}",
    "action": "off"
  },
  "protocol": "happn_2"
}
```
### server -> client
```json
{
  "data": {
    "id": "{{guid}}"
  },
  "_meta": {
    "status": "ok",
    "type": "response",
    "published": false,
    "eventId": "{{number, matches handler in client}}",
    "sessionId": "{{guid}}",
    "action": "on"
  },
  "protocol": "happn_2"
}
```
### set a piece of data, and get a response from the server, but no publication because noPublish was set to true

*the item from the server with the _meta.type 'data' is the emitted event - the other server -> client message with _meta.type 'response' is the response on the set action*

### client -> server
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
### server -> client
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
    "modifiedBy": "_ADMIN",
    "path": "/subscribe/noPublish",
    "type": "response",
    "status": "ok",
    "published": false,
    "eventId": "{{number, matches handler in client}}",
    "sessionId": "{{guid}}",
    "action": "set"
  },
  "protocol": "happn_2"
}
```
### failure to subscribe

### client -> server
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
    "timeout": 60000
  }
}
```
### server -> client
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
  "protocol": "happn_2"
}
```
### failure to subscribe - access denied

### client -> server
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
    "timeout": 60000
  }
}
```
### server -> client
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
      "code": 403,
      "message": "unauthorized"
    }
  },
  "protocol": "happn_2"
}
```
# Disconnection

### the client sends out a disconnect request, which the server receives - the server then queues the disconnection request, the client the ends the websocket session, and the server cleans up on the other side without sending a disconnection warning

### client -> server
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
### server -> client
```json
{
  "data": null,
  "_meta": {
    "type": "response",
    "status": "ok",
    "published": false,
    "eventId": "{{number, matches handler in client}}",
    "sessionId": "{{guid}}",
    "action": "disconnect"
  },
  "protocol": "happn_2"
}
```
### when a client is forcefully diconnected from the server side, or when a service shutdown happens, all clients are notified a disconnection is imminent

*the disconnectAllClients method is called - this method is called on the happn instance shutdown, causing the server to push out a disconnection message to all connected clients*

one connected client remaining, so disconnect warning is sent to it, session id (matches the one stipulated in section 1_1) is:04282db9-aea4-4868-a26e-289c2d9b419c  ##DIFF_IGNORE
### server -> client
```json
{
  "_meta": {
    "type": "system"
  },
  "eventKey": "server-side-disconnect",
  "data": "server-side-disconnect"
}
```
