#HAPPN PROTOCOL VERSION: 1.1.0

##HAPPN VERSION: 1.0.0
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
{"data":null,"_meta":{"type":"response","status":"ok","published":false,"eventId":1,"action":"configure-session"}}
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
{"data":{"name":"mudfinger_EJ5cxWFQG","secure":true,"encryptPayloads":false,"publicKey":"A5x6IskRxwkNfZfsdlIR56sVBWO4pd+ex5TOg2JxZWhS"},"_meta":{"type":"response","status":"ok","published":false,"eventId":2,"action":"describe"}}
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
    "publicKey": "A/J5Tt5u068D8KYCgJUD4CpwM7EALYeGXRyVXwomaWnj"
  }
}
```
###server -> client
```json
{"data":{"id":"e94530ed-889c-4562-b961-9b8edf42c88a","protocol":"happn_1.1.0","happn":{"name":"mudfinger_EJ5cxWFQG","secure":true,"encryptPayloads":false,"publicKey":"A5x6IskRxwkNfZfsdlIR56sVBWO4pd+ex5TOg2JxZWhS"},"info":{"_browser":false,"_local":false},"type":1,"user":{"custom_data":{},"username":"_ADMIN","_meta":{"created":1481642362223,"modified":1481642362223,"path":"/_SYSTEM/_SECURITY/_USER/_ADMIN","_id":"/_SYSTEM/_SECURITY/_USER/_ADMIN"},"groups":{"_ADMIN":{"data":{},"_meta":{"created":1481642362225,"modified":1481642362225,"path":"/_SYSTEM/_SECURITY/_USER/_ADMIN/_USER_GROUP/_ADMIN","_id":"/_SYSTEM/_SECURITY/_USER/_ADMIN/_USER_GROUP/_ADMIN"}}}},"timestamp":1481642362389,"isEncrypted":false,"policy":{"0":{"ttl":0,"inactivity_threshold":null},"1":{"ttl":0,"inactivity_threshold":null}},"permissionSetKey":"/_ADMIN/","token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImlkfGU5NDUzMGVkLTg4OWMtNDU2Mi1iOTYxLTliOGVkZjQyYzg4YXxpbmZvfF9icm93c2VyfF9sb2NhbHx0eXBlfHRpbWVzdGFtcHxpc0VuY3J5cHRlZHxwb2xpY3l8MHx0dGx8aW5hY3Rpdml0eV90aHJlc2hvbGR8MXxwZXJtaXNzaW9uU2V0S2V5fC9fQURNSU4vfGlzVG9rZW58dXNlcm5hbWV8X0FETUlOXjB8SVdOTkxWS0x8MHwwXl4kMHwxfDJ8JDN8LTJ8NHwtMl18NXxJfDZ8Snw3fC0yfDh8JDl8JEF8S3xCfC0zXXxDfCRBfEx8QnwtM11dfER8RXxGfC0xfEd8SF0i.Cc25Bf37cS2I_5AghWSYziKGX_OHIb6IKOJEKv_t5lY"},"_meta":{"type":"response","status":"ok","published":false,"eventId":3,"action":"login"}}
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
  "sessionId": "e94530ed-889c-4562-b961-9b8edf42c88a",
  "options": {
    "timeout": 30000
  }
}
```
###server -> client
```json
{"data":{"data":{"was":"set"}},"_meta":{"created":1481642362404,"modified":1481642362404,"modifiedBy":"_ADMIN","path":"set/some/data","action":"set","type":"response","published":false,"status":"ok","eventId":4,"sessionId":"e94530ed-889c-4562-b961-9b8edf42c88a"}}
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
  "sessionId": "e94530ed-889c-4562-b961-9b8edf42c88a",
  "options": {
    "merge": true,
    "timeout": 30000
  }
}
```
###server -> client
```json
{"data":{"data":{"was":{"set":"again"}}},"_meta":{"created":1481642362404,"modified":1481642362408,"path":"set/some/data","action":"set","type":"response","published":false,"status":"ok","eventId":5,"sessionId":"e94530ed-889c-4562-b961-9b8edf42c88a"}}
```
##fails to do a set

###server -> client
```json
{"data":null,"_meta":{"type":"response","status":"error","published":false,"eventId":6,"sessionId":"e94530ed-889c-4562-b961-9b8edf42c88a","action":"set","error":{"name":"Error","cause":{},"isOperational":true,"message":"a fly in the ointment"}}}
```
