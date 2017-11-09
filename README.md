happn protocol
----------------

*this repository is where we analyze the happn protocol, and make suggestions for optimisations in the [recommendations document](https://github.com/happner/happn-protocol/blob/master/doc/recommendations.md)*

[LATEST PROTOCOL DOCUMENT HAPPN-3](https://github.com/happner/happn-protocol/blob/master/automated-docs/happn-3/current/protocol.md)
--------------------------------

[LATEST PROTOCOL DOCUMENT HAPPN-2](https://github.com/happner/happn-protocol/blob/master/automated-docs/happn-2/current/protocol.md)
--------------------------------

####NB happn protocol checking discontinued, only happn-3 is now described and compared

####automated protocol documents for happn-3
*in format: protocol version / happn version*
- begin (do not delete)
- [1.1.0/1.0.4](https://github.com/happner/happn-protocol/blob/master/automated-docs/happn-3/1.1.0/1.0.4/protocol.md)
- [1.2.0/1.1.0](https://github.com/happner/happn-protocol/blob/master/automated-docs/happn-3/1.2.0/1.1.0/protocol.md)
- [2.0.0/5.0.0-alpha.2](https://github.com/happner/happn-protocol/blob/master/automated-docs/happn-3/2.0.0/5.0.0-alpha.2/protocol.md)
- end (do not delete)
####protocol documents for happn
*in format: protocol version / happn version*

- [1.1.0/2.16.3](https://github.com/happner/happn-protocol/blob/master/automated-docs/happn-2/1.1.0/2.16.3/protocol.md)
- [1.1.0/2.16.3](https://github.com/happner/happn-protocol/blob/master/automated-docs/happn-2/1.1.0/2.21.0/protocol.md)
- [1.1.0/2.16.3](https://github.com/happner/happn-protocol/blob/master/automated-docs/happn-2/1.1.0/2.21.2/protocol.md)
- [1.1.0/2.16.3](https://github.com/happner/happn-protocol/blob/master/automated-docs/happn-2/1.1.0/3.1.0/protocol.md)

manual run:
-----------
```bash

#ensure that your package json has the version of happn-3 you wish to describe

> npm run describe does the following:

> rm -rf node_modules/happn-3 && npm install && node describe

# check the difference between the 2 versions and protocols, as long as you have described them

> node compare 1.3.0/1.13.0 1.3.0/4.0.0 --v

# in format compare compareTo -> [protocol version]/[happn version] [protocol version]/[happn version] --v = verbose reporting

# this will console log a report which will list which operations have different protocol structures

# a quick compare is possible by doing
> node compare previous

# this will compare the current describe with the previous describe
```
