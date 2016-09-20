protocol recommendations:
-------------------------

1.0.1
-----

- strip out any null value properties
- login response, strip down to only essentials, token and session id
- on subscriptions pass the entire session over the wire, very bloated - only pass what is necessary
- on set events, do not pass back the data of the object - only the _meta, the client can reconstruct the data
- on emit events, ensure only what is necessary is emitted, most of the _meta can go
- on set and subsequent emit, skip emitting to the originator of the set event?
- on detachment from event (off) we must also only pass in what is necessary
- client to pass protocol up to server, this is so that we can perform optimsiations in a backwards compatible way
- json compression client and server headers

1.1.0
-----

- json compression client and server headers
- on set events, do not pass back the data of the object - only the _meta, the client can reconstruct the data
- on emit events, ensure only what is necessary is emitted, most of the _meta can go
- path and _id are the same for all return and emit object _meta, remove _id
- do not have a headers tag, protocol can just go in body of message
- default options timeout not to be passed up to server

1.2.0
-----

- json compression client and server headers
- on set events, do not pass back the data of the object - only the _meta, the client can reconstruct the data
- remove "data" property on outgoing server puts when data is empty {}

