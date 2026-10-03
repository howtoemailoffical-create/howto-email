---
title: Add IPv6 to a mail server
description: Publish IPv6 only after SMTP, firewall, reverse DNS and authentication are ready.
section: Do
tags: [IPv6, SMTP, DNS]
---

Treat IPv6 as a production path, not a checkbox.

Before publishing AAAA or sending over IPv6:

1. verify routing and firewall rules;
2. bind SMTP to the intended address;
3. configure PTR/reverse DNS;
4. confirm forward DNS;
5. update SPF where the address is directly authorized;
6. test inbound/outbound SMTP;
7. verify TLS;
8. monitor reputation and failures separately from IPv4.

If IPv6 is broken, remove the advertised path until it is fixed rather than relying on every remote system to fall back cleanly.

## Reference material

- [RFC 3596 — DNS Extensions for IPv6](https://www.rfc-editor.org/rfc/rfc3596)
- [RFC 5321 — SMTP](https://www.rfc-editor.org/rfc/rfc5321)
