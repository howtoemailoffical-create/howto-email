---
title: Alias vs mailbox
description: An address that redirects mail is not the same thing as a mailbox that stores it.
section: Reference
tags: [Mailbox, Addressing, Routing]
---

A mailbox stores messages for access by a user or application.

An alias is an additional address that routes to another destination. It normally does not have independent storage or credentials.

A distribution group/list is different again: one incoming recipient can expand to multiple members.

Knowing which object owns an address matters during migrations, access reviews and troubleshooting.

## Reference material

- [RFC 5321 — SMTP mailbox model](https://www.rfc-editor.org/rfc/rfc5321)
- [RFC 5598 — Internet Mail Architecture](https://www.rfc-editor.org/rfc/rfc5598)
