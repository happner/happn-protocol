HAPPN PROTOCOL 1.0.0
--------------------

login sequence:
---------------

client:
```json
{
  "data": {
    "path": null,
    "action": "describe",
    "eventId": 1,
    "options": {
      "timeout": 20000
    },
    "data": null
  }
}
```

server:
```json
{
  "data": {
    "data": {
      "name": "lavendercentaur_VJHEa_uh-",
      "secure": true,
      "encryptPayloads": false,
      "publicKey": "A9XzalS110ZA0Gp+LlTD76BYluHM84WBwRpqBPW9THLh"
    },
    "_meta": {
      "type": "response",
      "status": "ok",
      "published": false,
      "eventId": 1,
      "action": "describe"
    },
    "headers": {
      "protocol": "1.0.0"
    }
  }
}
```

client:
```json
{
  "data": {
    "path": null,
    "action": "login",
    "eventId": 2,
    "options": {
      "timeout": 20000
    },
    "data": {
      "username": "_ADMIN",
      "info": {
        "from": "startup",
        "_browser": false
      },
      "password": "happn"
    }
  }
}
```

server:
```json
{
  "data": {
    "data": {
      "id": "afcf5ae1-8581-4c72-8169-b3eb715c58e3",
      "type": 1,
      "user": {
        "custom_data": {},
        "username": "_ADMIN",
        "_meta": {
          "created": 1474268692684,
          "modified": 1474268692684,
          "path": "/_SYSTEM/_SECURITY/_USER/_ADMIN",
          "_id": "/_SYSTEM/_SECURITY/_USER/_ADMIN"
        },
        "groups": {
          "_ADMIN": {
            "data": {},
            "_meta": {
              "created": 1474268692686,
              "modified": 1474268692686,
              "path": "/_SYSTEM/_SECURITY/_USER/_ADMIN/_USER_GROUP/_ADMIN",
              "_id": "/_SYSTEM/_SECURITY/_USER/_ADMIN/_USER_GROUP/_ADMIN"
            }
          }
        }
      },
      "timestamp": 1474268692933,
      "policy": {
        "0": {
          "ttl": 2592000000,
          "inactivity_threshold": null
        },
        "1": {
          "ttl": 2592000000,
          "inactivity_threshold": null
        }
      },
      "permissionSetKey": "/_ADMIN/",
      "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImlkfGFmY2Y1YWUxLTg1ODEtNGM3Mi04MTY5LWIzZWI3MTVjNThlM3x0eXBlfHRpbWVzdGFtcHxwb2xpY3l8MHx0dGx8aW5hY3Rpdml0eV90aHJlc2hvbGR8MXxwZXJtaXNzaW9uU2V0S2V5fC9fQURNSU4vfGlzVG9rZW58dXNlcm5hbWV8X0FETUlOXjB8SVQ5UElKVDF8MTZWN0swMHwxNlY3SzAwXl4kMHwxfDJ8RXwzfEZ8NHwkNXwkNnxHfDd8LTNdfDh8JDZ8SHw3fC0zXV18OXxBfEJ8LTF8Q3xEXSI.2vf-U0NTOXRkDi_wVxXOqelBSJpPpOhBlgiVaQ2WUmE",
      "info": {
        "from": "startup",
        "_browser": false,
        "_local": false,
        "happn": {
          "name": "lavendercentaur_VJHEa_uh-"
        }
      },
      "index": 0
    },
    "_meta": {
      "type": "response",
      "status": "ok",
      "published": false,
      "eventId": 2,
      "action": "login"
    },
    "headers": {
      "protocol": "1.0.0"
    }
  }
}
```

subscribe to SET event
----------------------

client:
```json
{
  "data": {
    "path": "/SET@/2_websockets_embedded_sanity/1474268692381_rynMR-6n/testsubscribe/data/event/*",
    "action": "on",
    "eventId": 3,
    "options": {
      "event_type": "set",
      "count": 1,
      "refCount": 0,
      "timeout": 20000
    },
    "data": {
      "id": "6db5fcb2-d987-43fd-ab0c-ad9da90f4fed",
      "type": 1,
      "user": {
        "custom_data": {},
        "username": "_ADMIN",
        "_meta": {
          "created": 1474268692684,
          "modified": 1474268692684,
          "path": "/_SYSTEM/_SECURITY/_USER/_ADMIN",
          "_id": "/_SYSTEM/_SECURITY/_USER/_ADMIN"
        },
        "groups": {
          "_ADMIN": {
            "data": {},
            "_meta": {
              "created": 1474268692686,
              "modified": 1474268692686,
              "path": "/_SYSTEM/_SECURITY/_USER/_ADMIN/_USER_GROUP/_ADMIN",
              "_id": "/_SYSTEM/_SECURITY/_USER/_ADMIN/_USER_GROUP/_ADMIN"
            }
          }
        }
      },
      "timestamp": 1474268693026,
      "policy": {
        "0": {
          "ttl": 2592000000,
          "inactivity_threshold": null
        },
        "1": {
          "ttl": 2592000000,
          "inactivity_threshold": null
        }
      },
      "permissionSetKey": "/_ADMIN/",
      "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImlkfDZkYjVmY2IyLWQ5ODctNDNmZC1hYjBjLWFkOWRhOTBmNGZlZHx0eXBlfHRpbWVzdGFtcHxwb2xpY3l8MHx0dGx8aW5hY3Rpdml0eV90aHJlc2hvbGR8MXxwZXJtaXNzaW9uU2V0S2V5fC9fQURNSU4vfGlzVG9rZW58dXNlcm5hbWV8X0FETUlOXjB8SVQ5UElKVk18MTZWN0swMHwxNlY3SzAwXl4kMHwxfDJ8RXwzfEZ8NHwkNXwkNnxHfDd8LTNdfDh8JDZ8SHw3fC0zXV18OXxBfEJ8LTF8Q3xEXSI.3-sR0Tw_fJQlOa2SKO68N_Fo-VIt8wP97g0DCrNddtM",
      "info": {
        "from": "startup",
        "_browser": false,
        "_local": false,
        "happn": {
          "name": "lavendercentaur_VJHEa_uh-"
        }
      },
      "index": 1
    },
    "sessionId": "6db5fcb2-d987-43fd-ab0c-ad9da90f4fed"
  }
 }
```
server:
```json
{
  "data": {
    "data": {},
    "_meta": {
      "status": "ok",
      "type": "response",
      "published": false,
      "eventId": 3,
      "sessionId": "6db5fcb2-d987-43fd-ab0c-ad9da90f4fed",
      "action": "on"
    },
    "headers": {
      "protocol": "1.0.0"
    }
  }
}
```

perform set:
-------------

client:
```json
{
  "data": {
    "path": "/2_websockets_embedded_sanity/1474268692381_rynMR-6n/testsubscribe/data/event/blah",
    "action": "set",
    "eventId": 3,
    "options": {
      "timeout": 20000
    },
    "data": {
      "property1": "property1",
      "property2": "property2",
      "property3": "property3"
    },
    "sessionId": "afcf5ae1-8581-4c72-8169-b3eb715c58e3"
  }
}
```
server:
```json
{
  "data": {
    "data": {
      "property1": "property1",
      "property2": "property2",
      "property3": "property3"
    },
    "_meta": {
      "created": 1474268693043,
      "modified": 1474268693043,
      "path": "/2_websockets_embedded_sanity/1474268692381_rynMR-6n/testsubscribe/data/event/blah",
      "_id": "/2_websockets_embedded_sanity/1474268692381_rynMR-6n/testsubscribe/data/event/blah",
      "type": "data",
      "status": "ok",
      "published": true,
      "eventId": 3,
      "sessionId": "6db5fcb2-d987-43fd-ab0c-ad9da90f4fed",
      "action": "/SET@/2_websockets_embedded_sanity/1474268692381_rynMR-6n/testsubscribe/data/event/blah",
      "channel": "/SET@/2_websockets_embedded_sanity/1474268692381_rynMR-6n/testsubscribe/data/event/*"
    },
    "headers": {
      "protocol": "1.0.0"
    }
  }
}
```

set without publishing:
-----------------------

```json
{
  "data": {
    "path": "/2_websockets_embedded_sanity/1474268692381_rynMR-6n/set_multiple/B18pGA-Th",
    "action": "set",
    "eventId": 12,
    "options": {
      "noPublish": true,
      "timeout": 20000
    },
    "data": {
      "property1": "property1",
      "property2": "property2",
      "property3": "property3"
    },
    "sessionId": "afcf5ae1-8581-4c72-8169-b3eb715c58e3"
  }
 }
```

server emit:
```json
{
  "data": {
    "data": {
      "property1": "property1",
      "property2": "property2",
      "property3": "property3"
    },
    "_meta": {
      "created": 1474268693043,
      "modified": 1474268693043,
      "path": "/2_websockets_embedded_sanity/1474268692381_rynMR-6n/testsubscribe/data/event/blah",
      "_id": "/2_websockets_embedded_sanity/1474268692381_rynMR-6n/testsubscribe/data/event/blah",
      "type": "response",
      "status": "ok",
      "published": true,
      "eventId": 3,
      "sessionId": "afcf5ae1-8581-4c72-8169-b3eb715c58e3",
      "action": "/SET@/2_websockets_embedded_sanity/1474268692381_rynMR-6n/testsubscribe/data/event/blah"
    },
    "headers": {
      "protocol": "1.0.0"
    }
  }
}
```

detach from event:
------------------
client:
```json
{
  "data": {
    "path": "/SET@/2_websockets_embedded_sanity/1474268692381_rynMR-6n/testsubscribe/data/event/*",
    "action": "off",
    "eventId": 4,
    "options": {
      "refCount": 1,
      "timeout": 20000
    },
    "data": {
      "id": "6db5fcb2-d987-43fd-ab0c-ad9da90f4fed",
      "type": 1,
      "user": {
        "custom_data": {},
        "username": "_ADMIN",
        "_meta": {
          "created": 1474268692684,
          "modified": 1474268692684,
          "path": "/_SYSTEM/_SECURITY/_USER/_ADMIN",
          "_id": "/_SYSTEM/_SECURITY/_USER/_ADMIN"
        },
        "groups": {
          "_ADMIN": {
            "data": {},
            "_meta": {
              "created": 1474268692686,
              "modified": 1474268692686,
              "path": "/_SYSTEM/_SECURITY/_USER/_ADMIN/_USER_GROUP/_ADMIN",
              "_id": "/_SYSTEM/_SECURITY/_USER/_ADMIN/_USER_GROUP/_ADMIN"
            }
          }
        }
      },
      "timestamp": 1474268693026,
      "policy": {
        "0": {
          "ttl": 2592000000,
          "inactivity_threshold": null
        },
        "1": {
          "ttl": 2592000000,
          "inactivity_threshold": null
        }
      },
      "permissionSetKey": "/_ADMIN/",
      "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImlkfDZkYjVmY2IyLWQ5ODctNDNmZC1hYjBjLWFkOWRhOTBmNGZlZHx0eXBlfHRpbWVzdGFtcHxwb2xpY3l8MHx0dGx8aW5hY3Rpdml0eV90aHJlc2hvbGR8MXxwZXJtaXNzaW9uU2V0S2V5fC9fQURNSU4vfGlzVG9rZW58dXNlcm5hbWV8X0FETUlOXjB8SVQ5UElKVk18MTZWN0swMHwxNlY3SzAwXl4kMHwxfDJ8RXwzfEZ8NHwkNXwkNnxHfDd8LTNdfDh8JDZ8SHw3fC0zXV18OXxBfEJ8LTF8Q3xEXSI.3-sR0Tw_fJQlOa2SKO68N_Fo-VIt8wP97g0DCrNddtM",
      "info": {
        "from": "startup",
        "_browser": false,
        "_local": false,
        "happn": {
          "name": "lavendercentaur_VJHEa_uh-"
        }
      },
      "index": 1
    },
    "sessionId": "6db5fcb2-d987-43fd-ab0c-ad9da90f4fed"
  },
  "raw": "{\"path\":\"/SET@/2_websockets_embedded_sanity/1474268692381_rynMR-6n/testsubscribe/data/event/*\",\"action\":\"off\",\"eventId\":4,\"options\":{\"refCount\":1,\"timeout\":20000},\"data\":{\"id\":\"6db5fcb2-d987-43fd-ab0c-ad9da90f4fed\",\"type\":1,\"user\":{\"custom_data\":{},\"username\":\"_ADMIN\",\"_meta\":{\"created\":1474268692684,\"modified\":1474268692684,\"path\":\"/_SYSTEM/_SECURITY/_USER/_ADMIN\",\"_id\":\"/_SYSTEM/_SECURITY/_USER/_ADMIN\"},\"groups\":{\"_ADMIN\":{\"data\":{},\"_meta\":{\"created\":1474268692686,\"modified\":1474268692686,\"path\":\"/_SYSTEM/_SECURITY/_USER/_ADMIN/_USER_GROUP/_ADMIN\",\"_id\":\"/_SYSTEM/_SECURITY/_USER/_ADMIN/_USER_GROUP/_ADMIN\"}}}},\"timestamp\":1474268693026,\"policy\":{\"0\":{\"ttl\":2592000000,\"inactivity_threshold\":null},\"1\":{\"ttl\":2592000000,\"inactivity_threshold\":null}},\"permissionSetKey\":\"/_ADMIN/\",\"token\":\"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImlkfDZkYjVmY2IyLWQ5ODctNDNmZC1hYjBjLWFkOWRhOTBmNGZlZHx0eXBlfHRpbWVzdGFtcHxwb2xpY3l8MHx0dGx8aW5hY3Rpdml0eV90aHJlc2hvbGR8MXxwZXJtaXNzaW9uU2V0S2V5fC9fQURNSU4vfGlzVG9rZW58dXNlcm5hbWV8X0FETUlOXjB8SVQ5UElKVk18MTZWN0swMHwxNlY3SzAwXl4kMHwxfDJ8RXwzfEZ8NHwkNXwkNnxHfDd8LTNdfDh8JDZ8SHw3fC0zXV18OXxBfEJ8LTF8Q3xEXSI.3-sR0Tw_fJQlOa2SKO68N_Fo-VIt8wP97g0DCrNddtM\",\"info\":{\"from\":\"startup\",\"_browser\":false,\"_local\":false,\"happn\":{\"name\":\"lavendercentaur_VJHEa_uh-\"}},\"index\":1},\"sessionId\":\"6db5fcb2-d987-43fd-ab0c-ad9da90f4fed\"}"
}
```

server:
```json
{
  "data": {
    "data": {},
    "_meta": {
      "status": "ok",
      "type": "response",
      "published": false,
      "eventId": 4,
      "sessionId": "6db5fcb2-d987-43fd-ab0c-ad9da90f4fed",
      "action": "off"
    },
    "headers": {
      "protocol": "1.0.0"
    }
  }
}
```

perform get
-----------

client:
```json
{
  "data": {
    "path": "2_websockets_embedded_sanity/1474268692381_rynMR-6n/testsubscribe/data/SkeazCWa3",
    "action": "get",
    "eventId": 6,
    "options": {
      "timeout": 20000
    },
    "data": null,
    "sessionId": "afcf5ae1-8581-4c72-8169-b3eb715c58e3"
  }
}
```

server:
```json
{
  "data": {
    "data": {
      "property1": "property1",
      "property2": "property2",
      "property3": "property3"
    },
    "_meta": {
      "created": 1474268693057,
      "modified": 1474268693057,
      "path": "2_websockets_embedded_sanity/1474268692381_rynMR-6n/testsubscribe/data/SkeazCWa3",
      "_id": "2_websockets_embedded_sanity/1474268692381_rynMR-6n/testsubscribe/data/SkeazCWa3",
      "type": "response",
      "status": "ok",
      "published": false,
      "eventId": 6,
      "sessionId": "afcf5ae1-8581-4c72-8169-b3eb715c58e3",
      "action": "get"
    },
    "headers": {
      "protocol": "1.0.0"
    }
  }
}
```

perform remove
--------------

client:
```json
{
  "data": {
    "path": "/2_websockets_embedded_sanity/1474268692381_rynMR-6n/testsubscribe/data/delete_me",
    "action": "remove",
    "eventId": 29,
    "options": {
      "noPublish": true,
      "timeout": 20000
    },
    "data": null,
    "sessionId": "afcf5ae1-8581-4c72-8169-b3eb715c58e3"
  }
}
```

server:
```json
{
  "data": {
    "data": {
      "removed": 1
    },
    "_meta": {
      "timestamp": 1474268693169,
      "path": "/2_websockets_embedded_sanity/1474268692381_rynMR-6n/testsubscribe/data/delete_me",
      "type": "response",
      "status": "ok",
      "published": false,
      "eventId": 29,
      "sessionId": "afcf5ae1-8581-4c72-8169-b3eb715c58e3",
      "action": "remove"
    },
    "headers": {
      "protocol": "1.0.0"
    }
  }
}
```






