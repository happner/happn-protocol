HAPPN PROTOCOL 1.0.1
--------------------

login sequence:
---------------

client:
```json
{
  "data": {
    "action": "describe",
    "eventId": 1,
    "protocol": "1.1.0"
  }
}
```

server:
```json
{
  "data": {
    "data": {
      "name": "catfancier_4yAAgAY3b",
      "secure": true,
      "encryptPayloads": false,
      "publicKey": "AmcSw2lpoE0M21odlCCsqibe6mZg/MSyZldkIrRICZQP"
    },
    "_meta": {
      "type": "response",
      "status": "ok",
      "published": false,
      "eventId": 1,
      "action": "describe"
    },
    "protocol": "1.1.0"
  }
}
```

client:
```json
{
  "data": {
    "action": "login",
    "eventId": 2,
    "data": {
      "username": "_ADMIN",
      "info": {
        "_browser": false
      },
      "password": "happn"
    },
    "protocol": "1.1.0"
  }
 }
```

server:
```json
{
  "data": {
    "data": {
      "id": "0c81f954-b357-4eaf-9781-c3eb8bdfec7f",
      "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImlkfDBjODFmOTU0LWIzNTctNGVhZi05NzgxLWMzZWI4YmRmZWM3Znx0eXBlfHRpbWVzdGFtcHxwb2xpY3l8MHx0dGx8aW5hY3Rpdml0eV90aHJlc2hvbGR8MXxwZXJtaXNzaW9uU2V0S2V5fC9fQURNSU4vfGlzVG9rZW58dXNlcm5hbWV8X0FETUlOXjB8SVRCNUE5RjZ8MTZWN0swMHwxNlY3SzAwXl4kMHwxfDJ8RXwzfEZ8NHwkNXwkNnxHfDd8LTNdfDh8JDZ8SHw3fC0zXV18OXxBfEJ8LTF8Q3xEXSI.ZA9AhzBJH64scBE8DUXyg-UaoO3eaexnDw-KATceTak",
      "timestamp": 1474355646258,
      "info": {
        "from": "startup",
        "_browser": false,
        "_local": false,
        "happn": {
          "name": "catfancier_4yAAgAY3b"
        }
      },
      "index": 0,
      "type": 1,
      "user": {
        "username": "_ADMIN"
      }
    },
    "_meta": {
      "type": "response",
      "status": "ok",
      "published": false,
      "eventId": 2,
      "action": "login"
    },
    "protocol": "1.1.0"
  }
}
```

subscribe to SET event
----------------------

client:
```json
{
  "data": {
    "action": "on",
    "eventId": 3,
    "path": "/SET@/2_websockets_embedded_sanity/1474355645681_H1LaZP0n/testsubscribe/data/event/*",
    "sessionId": "e4734927-0f56-46ca-aea4-d1e6c07cfcc0",
    "options": {
      "event_type": "set",
      "count": 1,
      "refCount": 0,
      "timeout": 20000
    },
    "protocol": "1.1.0"
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
      "sessionId": "e4734927-0f56-46ca-aea4-d1e6c07cfcc0",
      "action": "on"
    },
    "protocol": "1.1.0"
  }
}
```

perform set:
-------------

client:
```json
{
  "data": {
    "action": "set",
    "eventId": 3,
    "path": "/2_websockets_embedded_sanity/1474355645681_H1LaZP0n/testsubscribe/data/event/blah",
    "data": {
      "property1": "property1",
      "property2": "property2",
      "property3": "property3"
    },
    "sessionId": "0c81f954-b357-4eaf-9781-c3eb8bdfec7f",
    "protocol": "1.1.0"
  }
 }
```

server response:
```json
{
  "data": {
    "data": {
      "property1": "property1",
      "property2": "property2",
      "property3": "property3"
    },
    "_meta": {
      "created": 1474355646356,
      "modified": 1474355646356,
      "path": "/2_websockets_embedded_sanity/1474355645681_H1LaZP0n/testsubscribe/data/event/blah",
      "type": "response",
      "status": "ok",
      "published": true,
      "eventId": 3,
      "sessionId": "0c81f954-b357-4eaf-9781-c3eb8bdfec7f",
      "action": "/SET@/2_websockets_embedded_sanity/1474355645681_H1LaZP0n/testsubscribe/data/event/blah"
    },
    "protocol": "1.1.0"
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
      "created": 1474355646356,
      "modified": 1474355646356,
      "path": "/2_websockets_embedded_sanity/1474355645681_H1LaZP0n/testsubscribe/data/event/blah",
      "type": "data",
      "sessionId": "e4734927-0f56-46ca-aea4-d1e6c07cfcc0",
      "action": "/SET@/2_websockets_embedded_sanity/1474355645681_H1LaZP0n/testsubscribe/data/event/blah",
      "channel": "/SET@/2_websockets_embedded_sanity/1474355645681_H1LaZP0n/testsubscribe/data/event/*"
    },
    "protocol": "1.1.0"
  }
}
```

set without publishing:
-----------------------

client:
```json
{
  "data": {
    "action": "set",
    "eventId": 5,
    "path": "2_websockets_embedded_sanity/1474355645681_H1LaZP0n/testsubscribe/data/Sk-8pWwRn",
    "data": {
      "property1": "property1",
      "property2": "property2",
      "property3": "property3"
    },
    "sessionId": "0c81f954-b357-4eaf-9781-c3eb8bdfec7f",
    "options": {
      "noPublish": true,
      "timeout": 20000
    },
    "protocol": "1.1.0"
  }
 }
```

server response:
```json
{
  "data": {
    "data": {
      "property1": "property1",
      "property2": "property2",
      "property3": "property3"
    },
    "_meta": {
      "created": 1474355646370,
      "modified": 1474355646370,
      "path": "2_websockets_embedded_sanity/1474355645681_H1LaZP0n/testsubscribe/data/Sk-8pWwRn",
      "type": "response",
      "status": "ok",
      "published": false,
      "eventId": 5,
      "sessionId": "0c81f954-b357-4eaf-9781-c3eb8bdfec7f",
      "action": "set"
    },
    "protocol": "1.1.0"
  }
}
```

detach from event:
------------------

client:
```json
{
  "data": {
    "action": "off",
    "eventId": 4,
    "path": "/SET@/2_websockets_embedded_sanity/1474355645681_H1LaZP0n/testsubscribe/data/event/*",
    "sessionId": "e4734927-0f56-46ca-aea4-d1e6c07cfcc0",
    "options": {
      "refCount": 1,
      "timeout": 20000
    },
    "protocol": "1.1.0"
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
      "eventId": 4,
      "sessionId": "e4734927-0f56-46ca-aea4-d1e6c07cfcc0",
      "action": "off"
    },
    "protocol": "1.1.0"
  }
}
```

perform get single item
------------------------

client:
```json
{
  "data": {
    "action": "get",
    "eventId": 6,
    "path": "2_websockets_embedded_sanity/1474355645681_H1LaZP0n/testsubscribe/data/Sk-8pWwRn",
    "sessionId": "0c81f954-b357-4eaf-9781-c3eb8bdfec7f",
    "protocol": "1.1.0"
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
      "created": 1474355646370,
      "modified": 1474355646370,
      "path": "2_websockets_embedded_sanity/1474355645681_H1LaZP0n/testsubscribe/data/Sk-8pWwRn",
      "type": "response",
      "status": "ok",
      "published": false,
      "eventId": 6,
      "sessionId": "0c81f954-b357-4eaf-9781-c3eb8bdfec7f",
      "action": "get"
    },
    "protocol": "1.1.0"
  }
}
```

perform get multiple items
---------------------------

client:
```json
{
  "data": {
    "action": "get",
    "eventId": 5,
    "path": "/2_websockets_embedded_sanity/1474355645681_H1LaZP0n/set_multiple/*",
    "sessionId": "e4734927-0f56-46ca-aea4-d1e6c07cfcc0",
    "protocol": "1.1.0"
  }
}
```

server:
```json
{
  "data": [
    {
      "property1": "property1",
      "property2": "property2",
      "property3": "property3",
      "_meta": {
        "created": 1474355646387,
        "modified": 1474355646387,
        "path": "/2_websockets_embedded_sanity/1474355645681_H1LaZP0n/set_multiple/BJmIabP0h",
        "_id": "/2_websockets_embedded_sanity/1474355645681_H1LaZP0n/set_multiple/BJmIabP0h"
      }
    },
    {
      "property1": "property1",
      "property2": "property2",
      "property3": "property3",
      "_meta": {
        "created": 1474355646386,
        "modified": 1474355646386,
        "path": "/2_websockets_embedded_sanity/1474355645681_H1LaZP0n/set_multiple/HyGIT-DCh",
        "_id": "/2_websockets_embedded_sanity/1474355645681_H1LaZP0n/set_multiple/HyGIT-DCh"
      }
    },
    {
      "type": "response",
      "status": "ok",
      "published": false,
      "eventId": 5,
      "sessionId": "e4734927-0f56-46ca-aea4-d1e6c07cfcc0",
      "action": "get"
    }
  ]
}
```

*NB: the response is added as the last item in the fetched collection*

perform get null
----------------

client:
```json
{
  "data": {
    "action": "get",
    "eventId": 4,
    "path": "1_eventemitter_embedded_sanity/1474355645681_H1LaZP0n/unfound/exact/Bkx8abDAh",
    "sessionId": "0c81f954-b357-4eaf-9781-c3eb8bdfec7f",
    "protocol": "1.1.0"
  }
}
```

server:
```json
{
  "data": {
    "data": null,
    "_meta": {
      "type": "response",
      "status": "ok",
      "published": false,
      "eventId": 4,
      "sessionId": "0c81f954-b357-4eaf-9781-c3eb8bdfec7f",
      "action": "get"
    },
    "protocol": "1.1.0"
  }
}
```

perform remove
--------------

client:
```json
{
  "data": {
    "action": "remove",
    "eventId": 29,
    "path": "/2_websockets_embedded_sanity/1474355645681_H1LaZP0n/testsubscribe/data/delete_me",
    "sessionId": "0c81f954-b357-4eaf-9781-c3eb8bdfec7f",
    "options": {
      "noPublish": true,
      "timeout": 20000
    },
    "protocol": "1.1.0"
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
      "timestamp": 1474355646481,
      "path": "/2_websockets_embedded_sanity/1474355645681_H1LaZP0n/testsubscribe/data/delete_me",
      "type": "response",
      "status": "ok",
      "published": false,
      "eventId": 29,
      "sessionId": "0c81f954-b357-4eaf-9781-c3eb8bdfec7f",
      "action": "remove"
    },
    "protocol": "1.1.0"
  }
}
```






