---
title: SMTP command quick reference
description: The common commands you will see in a normal SMTP transaction.
section: Reference
tags: [SMTP, Reference, Commands]
---

Common SMTP commands include:

| Command | Purpose |
| --- | --- |
| EHLO | Identify client and request ESMTP capabilities |
| HELO | Basic SMTP greeting |
| MAIL FROM | Set envelope reverse-path |
| RCPT TO | Add envelope recipient |
| DATA | Begin message content |
| RSET | Reset current transaction |
| NOOP | No operation / request reply |
| QUIT | End session |
| VRFY | Request address verification where supported |

Extensions add commands such as `STARTTLS` and `AUTH`.

Servers commonly restrict or disable information-revealing behavior such as VRFY.

## Reference material

- [RFC 5321 — SMTP commands](https://www.rfc-editor.org/rfc/rfc5321)
- [IANA — SMTP Service Extensions](https://www.iana.org/assignments/smtp/smtp.xhtml)
