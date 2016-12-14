#HAPPN PROTOCOL VERSION: 1.1.0

##HAPPN VERSION: 1.0.1
#connect a client

##create a client session and login

###client -> server
```json
{
  "action": "configure-session",
  "eventId": 1,
  "data": {
    "protocol": "happn_1.1.0"
  }
}
```
###server -> client
```json
{
  "data": null,
  "_meta": {
    "type": "response",
    "status": "ok",
    "published": false,
    "eventId": 1,
    "action": "configure-session"
  }
}
```
###client -> server
```json
{
  "action": "describe",
  "eventId": 2
}
```
###server -> client
```json
{
  "data": {
    "name": "kiwibite_VyVAPP9XG",
    "secure": true,
    "encryptPayloads": false,
    "publicKey": "AijZQbFDsJi7JVQnDuMfR3lH03k+P5p+r+Mz872tplOa"
  },
  "_meta": {
    "type": "response",
    "status": "ok",
    "published": false,
    "eventId": 2,
    "action": "describe"
  }
}
```
###client -> server
```json
{
  "action": "login",
  "eventId": 3,
  "data": {
    "username": "_ADMIN",
    "info": {
      "_browser": false,
      "_local": false
    },
    "protocol": "happn_1.1.0",
    "password": "happn",
    "publicKey": "A3YxyoKoAbPr+3cQrSm9YywdVef8DtszOW8rYmW1od+l"
  }
}
```
###server -> client
```json
{
  "data": {
    "id": "d530df58-ba7a-4e3f-994c-935fb07df075",
    "protocol": "happn_1.1.0",
    "happn": {
      "name": "kiwibite_VyVAPP9XG",
      "secure": true,
      "encryptPayloads": false,
      "publicKey": "AijZQbFDsJi7JVQnDuMfR3lH03k+P5p+r+Mz872tplOa"
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
        "created": 1481734324578,
        "modified": 1481734324578,
        "path": "/_SYSTEM/_SECURITY/_USER/_ADMIN",
        "_id": "/_SYSTEM/_SECURITY/_USER/_ADMIN"
      },
      "groups": {
        "_ADMIN": {
          "data": {},
          "_meta": {
            "created": 1481734324581,
            "modified": 1481734324581,
            "path": "/_SYSTEM/_SECURITY/_USER/_ADMIN/_USER_GROUP/_ADMIN",
            "_id": "/_SYSTEM/_SECURITY/_USER/_ADMIN/_USER_GROUP/_ADMIN"
          }
        }
      }
    },
    "timestamp": 1481734324734,
    "isEncrypted": false,
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
    "permissionSetKey": "/_ADMIN/",
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImlkfGQ1MzBkZjU4LWJhN2EtNGUzZi05OTRjLTkzNWZiMDdkZjA3NXxpbmZvfF9icm93c2VyfF9sb2NhbHx0eXBlfHRpbWVzdGFtcHxpc0VuY3J5cHRlZHxwb2xpY3l8MHx0dGx8aW5hY3Rpdml0eV90aHJlc2hvbGR8MXxwZXJtaXNzaW9uU2V0S2V5fC9fQURNSU4vfGlzVG9rZW58dXNlcm5hbWV8X0FETUlOXjB8SVdQNkNZNjZ8MHwwXl4kMHwxfDJ8JDN8LTJ8NHwtMl18NXxJfDZ8Snw3fC0yfDh8JDl8JEF8S3xCfC0zXXxDfCRBfEx8QnwtM11dfER8RXxGfC0xfEd8SF0i.C7Dp-50nnNkplhXtfWntgHu2s2kd2ZXw9lSdFWJmZYY"
  },
  "_meta": {
    "type": "response",
    "status": "ok",
    "published": false,
    "eventId": 3,
    "action": "login"
  }
}
```
###client -> server
```json
{
  "action": "configure-session",
  "eventId": 1,
  "data": {
    "protocol": "happn_1.1.0"
  }
}
```
###server -> client
```json
{
  "data": null,
  "_meta": {
    "type": "response",
    "status": "ok",
    "published": false,
    "eventId": 1,
    "action": "configure-session"
  }
}
```
###client -> server
```json
{
  "action": "describe",
  "eventId": 2
}
```
###server -> client
```json
{
  "data": {
    "name": "kiwibite_VyVAPP9XG",
    "secure": true,
    "encryptPayloads": false,
    "publicKey": "AijZQbFDsJi7JVQnDuMfR3lH03k+P5p+r+Mz872tplOa"
  },
  "_meta": {
    "type": "response",
    "status": "ok",
    "published": false,
    "eventId": 2,
    "action": "describe"
  }
}
```
###client -> server
```json
{
  "action": "login",
  "eventId": 3,
  "data": {
    "username": "_ADMIN",
    "info": {
      "_browser": false,
      "_local": false
    },
    "protocol": "happn_1.1.0",
    "password": "happn",
    "publicKey": "A3YxyoKoAbPr+3cQrSm9YywdVef8DtszOW8rYmW1od+l"
  }
}
```
###server -> client
```json
{
  "data": {
    "id": "504a1a0d-d093-4357-bb79-2862e83d5138",
    "protocol": "happn_1.1.0",
    "happn": {
      "name": "kiwibite_VyVAPP9XG",
      "secure": true,
      "encryptPayloads": false,
      "publicKey": "AijZQbFDsJi7JVQnDuMfR3lH03k+P5p+r+Mz872tplOa"
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
        "created": 1481734324578,
        "modified": 1481734324578,
        "path": "/_SYSTEM/_SECURITY/_USER/_ADMIN",
        "_id": "/_SYSTEM/_SECURITY/_USER/_ADMIN"
      },
      "groups": {
        "_ADMIN": {
          "data": {},
          "_meta": {
            "created": 1481734324581,
            "modified": 1481734324581,
            "path": "/_SYSTEM/_SECURITY/_USER/_ADMIN/_USER_GROUP/_ADMIN",
            "_id": "/_SYSTEM/_SECURITY/_USER/_ADMIN/_USER_GROUP/_ADMIN"
          }
        }
      }
    },
    "timestamp": 1481734324821,
    "isEncrypted": false,
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
    "permissionSetKey": "/_ADMIN/",
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImlkfDUwNGExYTBkLWQwOTMtNDM1Ny1iYjc5LTI4NjJlODNkNTEzOHxpbmZvfF9icm93c2VyfF9sb2NhbHx0eXBlfHRpbWVzdGFtcHxpc0VuY3J5cHRlZHxwb2xpY3l8MHx0dGx8aW5hY3Rpdml0eV90aHJlc2hvbGR8MXxwZXJtaXNzaW9uU2V0S2V5fC9fQURNSU4vfGlzVG9rZW58dXNlcm5hbWV8X0FETUlOXjB8SVdQNkNZOEx8MHwwXl4kMHwxfDJ8JDN8LTJ8NHwtMl18NXxJfDZ8Snw3fC0yfDh8JDl8JEF8S3xCfC0zXXxDfCRBfEx8QnwtM11dfER8RXxGfC0xfEd8SF0i.f1n915ZrFeEdb63BDnVwYC5iZIBvcUWKI3ei-8zmr6g"
  },
  "_meta": {
    "type": "response",
    "status": "ok",
    "published": false,
    "eventId": 3,
    "action": "login"
  }
}
```
#set

##set a piece of data using a key value pair

###client -> server
```json
{
  "action": "set",
  "eventId": 4,
  "path": "set/some/data",
  "data": {
    "data": {
      "was": "set"
    }
  },
  "sessionId": "d530df58-ba7a-4e3f-994c-935fb07df075",
  "options": {
    "timeout": 30000
  }
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
    "created": 1481734324828,
    "modified": 1481734324828,
    "modifiedBy": "_ADMIN",
    "path": "set/some/data",
    "action": "set",
    "type": "response",
    "published": false,
    "status": "ok",
    "eventId": 4,
    "sessionId": "d530df58-ba7a-4e3f-994c-935fb07df075"
  }
}
```
##merge some new values with an existing record

###client -> server
```json
{
  "action": "set",
  "eventId": 5,
  "path": "set/some/data",
  "data": {
    "data": {
      "was": {
        "set": "again"
      }
    }
  },
  "sessionId": "d530df58-ba7a-4e3f-994c-935fb07df075",
  "options": {
    "merge": true,
    "timeout": 30000
  }
}
```
###server -> client
```json
{
  "data": {
    "data": {
      "was": {
        "set": "again"
      }
    }
  },
  "_meta": {
    "created": 1481734324828,
    "modified": 1481734324831,
    "path": "set/some/data",
    "action": "set",
    "type": "response",
    "published": false,
    "status": "ok",
    "eventId": 5,
    "sessionId": "d530df58-ba7a-4e3f-994c-935fb07df075"
  }
}
```
##tag some existing data

###client -> server
```json
{
  "action": "set",
  "eventId": 6,
  "path": "set/some/data",
  "data": null,
  "sessionId": "d530df58-ba7a-4e3f-994c-935fb07df075",
  "options": {
    "tag": "MYTAG",
    "nullValue": true,
    "timeout": 30000
  }
}
```
###server -> client
```json
{
  "data": {
    "data": {
      "data": {
        "was": {
          "set": "again"
        }
      }
    },
    "_meta": {
      "path": "set/some/data",
      "modifiedBy": "_ADMIN"
    },
    "created": 1481734324828,
    "modified": 1481734324834,
    "_id": "set/some/data"
  },
  "_meta": {
    "created": 1481734324835,
    "modified": 1481734324835,
    "path": "/_TAGSset/some/data/1481734324835_733b5f9e342c4490aff75a1b4cbd962e",
    "tag": "MYTAG",
    "action": "set",
    "type": "response",
    "published": false,
    "status": "ok",
    "eventId": 6,
    "sessionId": "d530df58-ba7a-4e3f-994c-935fb07df075"
  }
}
```
##create sibling records on a base path

###client -> server
```json
{
  "action": "set",
  "eventId": 7,
  "path": "set/sibling/data",
  "data": {
    "sibling": "data"
  },
  "sessionId": "d530df58-ba7a-4e3f-994c-935fb07df075",
  "options": {
    "set_type": "sibling",
    "timeout": 30000
  }
}
```
###server -> client
```json
{
  "data": {
    "sibling": "data"
  },
  "_meta": {
    "created": 1481734324838,
    "modified": 1481734324838,
    "modifiedBy": "_ADMIN",
    "path": "set/sibling/data/1481734324838_b70965a2c8784b3d9a13c3855e0b7188",
    "action": "set",
    "type": "response",
    "published": false,
    "status": "ok",
    "eventId": 7,
    "sessionId": "d530df58-ba7a-4e3f-994c-935fb07df075"
  }
}
```
##fails to do a set

###server -> client
```json
{
  "data": null,
  "_meta": {
    "type": "response",
    "status": "error",
    "published": false,
    "eventId": 8,
    "sessionId": "d530df58-ba7a-4e3f-994c-935fb07df075",
    "action": "set",
    "error": {
      "name": "Error",
      "cause": {},
      "isOperational": true,
      "message": "a fly in the ointment"
    }
  }
}
```
#data subscriptions

##subscribe to all changes on a data point

###client -> server
```json
{
  "action": "on",
  "eventId": 9,
  "path": "/ALL@*",
  "data": null,
  "sessionId": "d530df58-ba7a-4e3f-994c-935fb07df075",
  "options": {
    "event_type": "all",
    "count": 0,
    "refCount": 0,
    "timeout": 30000
  }
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
    "eventId": 9,
    "sessionId": "d530df58-ba7a-4e3f-994c-935fb07df075",
    "action": "on"
  }
}
```
##set a piece of data, and get the event back based on the subscription in the previous step

###client -> server
```json
{
  "action": "set",
  "eventId": 10,
  "path": "/subscribe/on/all/events",
  "data": {
    "data": {
      "was": "set"
    }
  },
  "sessionId": "d530df58-ba7a-4e3f-994c-935fb07df075",
  "options": {
    "timeout": 30000
  }
}
```
###server -> client
```json
{
  "publication": {
    "data": {
      "data": {
        "was": "set"
      }
    },
    "_meta": {
      "created": 1481734324851,
      "modified": 1481734324851,
      "modifiedBy": "_ADMIN",
      "path": "/subscribe/on/all/events",
      "action": "/SET@/subscribe/on/all/events",
      "type": "data",
      "channel": "/ALL@*",
      "sessionId": "d530df58-ba7a-4e3f-994c-935fb07df075"
    },
    "__outbound": true
  },
  "channel": "/ALL@*",
  "opts": {
    "clone": false
  },
  "action": "emit"
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
    "created": 1481734324851,
    "modified": 1481734324851,
    "modifiedBy": "_ADMIN",
    "path": "/subscribe/on/all/events",
    "action": "set",
    "type": "response",
    "published": false,
    "status": "ok",
    "eventId": 10,
    "sessionId": "d530df58-ba7a-4e3f-994c-935fb07df075"
  }
}
```
##subscribe to all changes on a data point

###client -> server
```json
{
  "action": "on",
  "eventId": 11,
  "path": "/SET@/subscribe/on/specific",
  "data": null,
  "sessionId": "d530df58-ba7a-4e3f-994c-935fb07df075",
  "options": {
    "event_type": "set",
    "count": 0,
    "refCount": 1,
    "timeout": 30000
  }
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
    "eventId": 11,
    "sessionId": "d530df58-ba7a-4e3f-994c-935fb07df075",
    "action": "on"
  }
}
```
##set a piece of data, and get the event back based on the subscription in the previous step

###client -> server
```json
{
  "action": "set",
  "eventId": 12,
  "path": "/subscribe/on/specific",
  "data": {
    "data": {
      "was": "set"
    }
  },
  "sessionId": "d530df58-ba7a-4e3f-994c-935fb07df075",
  "options": {
    "timeout": 30000
  }
}
```
###server -> client
```json
{
  "publication": {
    "data": {
      "data": {
        "was": "set"
      }
    },
    "_meta": {
      "created": 1481734324855,
      "modified": 1481734324855,
      "modifiedBy": "_ADMIN",
      "path": "/subscribe/on/specific",
      "action": "/SET@/subscribe/on/specific",
      "type": "data",
      "channel": "/SET@/subscribe/on/specific",
      "sessionId": "d530df58-ba7a-4e3f-994c-935fb07df075"
    },
    "__outbound": true
  },
  "channel": "/SET@/subscribe/on/specific",
  "opts": {
    "clone": false
  },
  "action": "emit"
}
```
###server -> client
```json
{
  "publication": {
    "data": {
      "data": {
        "was": "set"
      }
    },
    "_meta": {
      "created": 1481734324855,
      "modified": 1481734324855,
      "modifiedBy": "_ADMIN",
      "path": "/subscribe/on/specific",
      "action": "/SET@/subscribe/on/specific",
      "type": "data",
      "channel": "/ALL@*",
      "sessionId": "d530df58-ba7a-4e3f-994c-935fb07df075"
    },
    "__outbound": true
  },
  "channel": "/ALL@*",
  "opts": {
    "clone": false
  },
  "action": "emit"
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
    "created": 1481734324855,
    "modified": 1481734324855,
    "modifiedBy": "_ADMIN",
    "path": "/subscribe/on/specific",
    "action": "set",
    "type": "response",
    "published": false,
    "status": "ok",
    "eventId": 12,
    "sessionId": "d530df58-ba7a-4e3f-994c-935fb07df075"
  }
}
```
##subscribe to a change only once

###client -> server
```json
{
  "action": "on",
  "eventId": 13,
  "path": "/ALL@/subscribe/once",
  "data": null,
  "sessionId": "d530df58-ba7a-4e3f-994c-935fb07df075",
  "options": {
    "event_type": "all",
    "count": 1,
    "refCount": 2,
    "timeout": 30000
  }
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
    "eventId": 13,
    "sessionId": "d530df58-ba7a-4e3f-994c-935fb07df075",
    "action": "on"
  }
}
```
##set a piece of data, and get the event back based on the subscription in the previous step

###client -> server
```json
{
  "action": "set",
  "eventId": 14,
  "path": "/subscribe/once",
  "data": {
    "data": {
      "was": "set"
    }
  },
  "sessionId": "d530df58-ba7a-4e3f-994c-935fb07df075",
  "options": {
    "timeout": 30000
  }
}
```
###server -> client
```json
{
  "publication": {
    "data": {
      "data": {
        "was": "set"
      }
    },
    "_meta": {
      "created": 1481734324861,
      "modified": 1481734324861,
      "modifiedBy": "_ADMIN",
      "path": "/subscribe/once",
      "action": "/SET@/subscribe/once",
      "type": "data",
      "channel": "/ALL@/subscribe/once",
      "sessionId": "d530df58-ba7a-4e3f-994c-935fb07df075"
    },
    "__outbound": true
  },
  "channel": "/ALL@/subscribe/once",
  "opts": {
    "clone": false
  },
  "action": "emit"
}
```
###server -> client
```json
{
  "publication": {
    "data": {
      "data": {
        "was": "set"
      }
    },
    "_meta": {
      "created": 1481734324861,
      "modified": 1481734324861,
      "modifiedBy": "_ADMIN",
      "path": "/subscribe/once",
      "action": "/SET@/subscribe/once",
      "type": "data",
      "channel": "/ALL@*",
      "sessionId": "d530df58-ba7a-4e3f-994c-935fb07df075"
    },
    "__outbound": true
  },
  "channel": "/ALL@*",
  "opts": {
    "clone": false
  },
  "action": "emit"
}
```
###client -> server
```json
{
  "action": "off",
  "eventId": 15,
  "path": "/ALL@/subscribe/once",
  "data": null,
  "sessionId": "d530df58-ba7a-4e3f-994c-935fb07df075",
  "options": {
    "refCount": 1,
    "timeout": 30000
  }
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
    "created": 1481734324861,
    "modified": 1481734324861,
    "modifiedBy": "_ADMIN",
    "path": "/subscribe/once",
    "action": "set",
    "type": "response",
    "published": false,
    "status": "ok",
    "eventId": 14,
    "sessionId": "d530df58-ba7a-4e3f-994c-935fb07df075"
  }
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
    "eventId": 15,
    "sessionId": "d530df58-ba7a-4e3f-994c-935fb07df075",
    "action": "off"
  }
}
```
##failure to subscribe

###server -> client
```json
{
  "data": null,
  "_meta": {
    "type": "response",
    "status": "error",
    "published": false,
    "eventId": 16,
    "sessionId": "d530df58-ba7a-4e3f-994c-935fb07df075",
    "action": "on",
    "error": {
      "name": "Error",
      "cause": {},
      "isOperational": true,
      "message": "a fly in the ointment"
    }
  }
}
```
#Disconnection

##the client sends out a disconnect request, which the server receives - the server then queues the disconnection request, the client the ends the websocket session, and the server cleans up on the other side without sending a disconnection warning

###client -> server
```json
{
  "action": "disconnect",
  "eventId": 17,
  "sessionId": "d530df58-ba7a-4e3f-994c-935fb07df075"
}
```
###server -> client
```json
{
  "data": null,
  "_meta": {
    "type": "response",
    "status": "ok",
    "published": false,
    "eventId": 17,
    "sessionId": "d530df58-ba7a-4e3f-994c-935fb07df075",
    "action": "disconnect"
  }
}
```
##server pushed out a disconnection message to the client

