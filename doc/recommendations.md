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
- on get, why do we need the sessionid?




