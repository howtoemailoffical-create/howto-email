---
title: Email port guide
description: What ports 25, 465, 587, 110, 995, 143 and 993 are normally used for.
section: Reference
tags: [Ports, SMTP, IMAP, POP3]
---

The port number often tells you which role a connection is trying to perform.

| Port | Typical use |
| ---: | --- |
| 25 | SMTP server-to-server relay |
| 465 | SMTP submission with implicit TLS |
| 587 | SMTP message submission |
| 110 | POP3 |
| 995 | POP3 with implicit TLS |
| 143 | IMAP |
| 993 | IMAP with implicit TLS |

These are standard service assignments, not a guarantee that every provider exposes every service.

Do not use port 25 for an end-user application merely because "SMTP uses 25." Submission and relay have different trust and policy models.

## Reference material

- [IANA — Service Name and Transport Protocol Port Number Registry](https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml)
- [RFC 6409 — Message Submission](https://www.rfc-editor.org/rfc/rfc6409)
- [RFC 8314 — TLS for Email Submission and Access](https://www.rfc-editor.org/rfc/rfc8314)
