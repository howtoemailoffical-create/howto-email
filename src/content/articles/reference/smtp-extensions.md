---
title: Common ESMTP extensions
description: How EHLO advertises capabilities beyond original SMTP.
section: Reference
tags: [SMTP, ESMTP, Reference]
---

A client sends `EHLO` and the server returns the ESMTP capabilities available for that connection.

Common examples include:

- `STARTTLS`
- `SIZE`
- `PIPELINING`
- `8BITMIME`
- `SMTPUTF8`
- `AUTH`
- `DSN`

Capabilities can change after STARTTLS or authentication, so clients should follow the protocol rather than assuming a server always advertises the same list.

## Reference material

- [IANA — SMTP Service Extensions registry](https://www.iana.org/assignments/smtp/smtp.xhtml)
- [RFC 5321 — SMTP](https://www.rfc-editor.org/rfc/rfc5321)
