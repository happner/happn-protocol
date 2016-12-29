HAPPN PROTOCOL 2 IDEAS:

LEARNED FROM MQTT:

Taken from MQTT specification http://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html

Connection: ordered, lossless, stream of bytes in both direction

Server: acts as an intermediary between Clients which publish Application Messages and Clients which have made Subscriptions

Client: a program or device that uses MQTT. A Client always establishes the Network Connection to the Server

###Encoding is explicit, UTF-8

Packets are broken into 2 types:

Control packets

Data/Publish packets

###Configurable Quality of service

Publish acknowledgements, ACK control packets

###LWT - or last will and testament, stored with the server - can be anything the client defines, if the client dies ungracefully - this is sent to all other clients also subscribed to the broker

###Inactivity threshold and keep-alives, server is allowed to disconnect any client at any time it deems to be inactive

###BAD MESSAGES, server side protocol validation, are we disconnecting badly behaved/written clients?

###CONNECT TIMEOUT - are we actively ensuring that a login or CONFIGURE_SESSION has happened at a specified timeout after a socket has been opened?

##Transforming MQTT packets

CONNECT = CONFIGURE_SESSION

Defines type of session (stateful/less, create new etc)

Contains QoS settings, SO FROM CLIENT SIDE, MAKES SENSE

PUBLISH = emit

DUP flag, so the server will retry sending a message, and the message is flagged with DUP = 1 if this is a resend

RETAIN, happn always retains the value, noPublish means we do not retain a value

PUBACK = TBD

packets published with a QoS 1 or higher are responded to by the clients in the form of an ACK, the ACK has a timeout after which the packet is retried N times, after which a server emit error is bubbled up

PINGREQ, PINGRESP = ping/pong

DISCONNECT = DISCONNECT

###Understanding MQTT QoS
5 stages, pubACK, then pubREC then pubREL and the pubCOMP
QoS 0 at most once delivery = fire and forget, similar to happn now
QoS 1 at least once delivery
QoS 2 Exactly once delivery

###In the QoS 2 delivery protocol, the SENDER:

MUST assign an unused Packet Identifier when it has a new Application Message to publish.
MUST send a PUBLISH packet containing this Packet Identifier with QoS=2, DUP=0.
MUST treat the PUBLISH packet as “unacknowledged” until it has received the corresponding PUBREC packet from the receiver. See Section 4.4 for a discussion of unacknowledged messages.
MUST send a PUBREL packet when it receives a PUBREC packet from the receiver. This PUBREL packet MUST contain the same Packet Identifier as the original PUBLISH packet.
MUST treat the PUBREL packet as “unacknowledged” until it has received the corresponding PUBCOMP packet from the receiver.
MUST NOT re-send the PUBLISH once it has sent the corresponding PUBREL packet.

###In the QoS 2 delivery protocol, the RECEIVER:

MUST respond with a PUBREC containing the Packet Identifier from the incoming PUBLISH Packet, having accepted ownership of the Application Message.
Until it has received the corresponding PUBREL packet, the Receiver MUST acknowledge any subsequent PUBLISH packet with the same Packet Identifier by sending a PUBREC. It MUST NOT cause duplicate messages to be delivered to any onward recipients in this case.
MUST respond to a PUBREL packet by sending a PUBCOMP packet containing the same Packet Identifier as the PUBREL.
After it has sent a PUBCOMP, the receiver MUST treat any subsequent PUBLISH packet that contains that Packet Identifier as being a new publication.

###UNDERSTANDING TOPICS (same as keys/data-points):
*far more structured than happn's wildcard - this may usher in performance improvements as the reg expression causes full table scans on the happner side*
- wildcards for multiple levels  #
- wildcards for single levels +
- $ is reserved for wildcards

SECURITY:

INDUSTRY STANDARDS

NIST Cyber Security Framework [NISTCSF](http://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html#NISTCSF),

PCI-DSS [PCIDSS]),

FIPS-140-2 [FIPS1402]

NSA Suite B [NSAB].

check out: [MQTT NIST].

##ORDERED EVENTS:

- use of queues on server and client side possibly

##PRUNING:

- on set events, do not pass back the data of the object - only the _meta, the client can reconstruct the data
- on emit events, ensure only what is necessary is emitted, most of the _meta can go
- path and _id are the same for all return and emit object _meta, remove _id
- do not have a headers tag, protocol can just go in body of message
- default options timeout not to be passed up to server

##PROTOCOL 2 IMPROVEMENTS:

- incorporate the protocol into the queue, and key the internal queue by protocol_action_options
- the protocol needs to emit to subscribers
- create multiple queues by configuration, this allows for ordered messages
- the happn-3 client must be passed an IP address/porr range, and be able to:
 (1) connect to a host using a semi-random selection algorithm. Load balancing:check
 (2) on unintended disconnection, immediately move subscriptions and login to a new item in the configured cluster, so redundancy:check
- Quality of Service - packet based, this means any packets being published are pushed to all connected clients and are accounted for by ACK packets sent back by the clients
- QoS IS DEFINED ON SUBSCRIPTIONS - so subscriptions can define how the want to be treated in terms of delivery - v cool
- ping/pong to be brought into the protocol layer
- protocols needs to exist in a folder structure, so /[protocol name]_[protocol version]/protocol.js - this is so we can group protocol helper files in the folder neatly as well
- protocol needs to be required, this has not been tested
- session inactivity, inactive sessions need to be pruned from the server
- CONNECT TIMEOUT - actively ensuring that a login or CONFIGURE_SESSION has happened at a specified timeout after a socket has been opened?
- protocol violation, protocol layer needs a validate method, if the validation fails the client must be disconnected
- security connection policies - server detects possible DoS, by flagging reconnection attempts
- json compression client and server headers
- remove "data" property on outgoing server puts when data is empty {}


##FUTURE CONSIDERATIONS

- the client and server could actually be indistinguishable, they are both simply brokers connected to each other by endpoints, the client just runs a different set of services
    - at the evry least the queing/emitting and/acknowledgement of messages could be a shared codebase