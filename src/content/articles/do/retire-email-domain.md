---
title: Retire an email domain safely
description: Stop receiving and sending without leaving stale authentication and forgotten mail paths behind.
section: Do
tags: [DNS, Operations, Decommission]
---

First decide whether the domain should continue receiving mail during a transition period.

Inventory active mailboxes, aliases, applications, SaaS senders, certificates and external accounts that use the domain.

Remove sending dependencies, then clean up SPF/DKIM/DMARC and provider verification records when they are no longer required.

If the domain should never receive email, a Null MX can explicitly signal that state.

Keep ownership of a retired business domain as long as the organization needs to prevent somebody else from acquiring it and receiving traffic intended for old addresses.

## Reference material

- [RFC 7505 — Null MX](https://www.rfc-editor.org/rfc/rfc7505)
- [RFC 5321 — SMTP](https://www.rfc-editor.org/rfc/rfc5321)
