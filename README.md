happn protocol
----------------

*this repository is where we analyze the happn protocol, and make suggestions for optimisations in the [recommendations document](https://github.com/happner/happn-protocol/blob/master/doc/recommendations.md)*

- current version 1.1.0

[LATEST PROTOCOL DOCUMENT 1.1.0 HAPPN-3](https://github.com/happner/happn-protocol/blob/master/automated-docs/happn-3/current/protocol.md)
--------------------------------

[LATEST PROTOCOL DOCUMENT 1.1.0 HAPPN-2](https://github.com/happner/happn-protocol/blob/master/automated-docs/happn-2/current/protocol.md)
--------------------------------

automated protocol documents for happn-3, in format protocol version / happn version

- [1.1.0/1.0.4](https://github.com/happner/happn-protocol/blob/master/automated-docs/happn-3/1.1.0/1.0.4/protocol.md)

automated protocol documents for happn-2, in format protocol version / happn version

- [1.1.0/2.16.3](https://github.com/happner/happn-protocol/blob/master/automated-docs/happn-2/2.16.3/2.16.3/protocol.md)

manual run:
-----------
```bash

> npm run describe

# check the difference between the 2 current protocols

> npm run describe && git add --all && git commit -m "protocol describe run"

> git diff --minimal HEAD:./automated-docs/happn-2/current/protocol.md HEAD:./automated-docs/happn-3/current/protocol.md >> ./automated-docs/changes.diff

```

changes with each protocol update:

*TODO: with each release of happn, the describe is run and the readme is updated, then a diff is run on the latest existing protocol document and the new 1 to produce protocol changes*
