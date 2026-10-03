---
title: Catch-all mailboxes
description: Accepting mail for otherwise nonexistent local parts changes bounce, abuse and directory behavior.
section: Reference
tags: [Mailbox, Routing, Operations]
---

A catch-all configuration accepts addresses that do not otherwise exist under a domain and routes them to a mailbox or handler.

That can be convenient for small domains, but it also accepts typo addresses and more unwanted traffic.

It changes how external senders learn that a recipient is invalid because the SMTP service may accept the address instead of returning a recipient failure.

Use catch-all behavior deliberately rather than as a substitute for maintaining aliases.

## Reference material

- [RFC 5321 — SMTP mailbox and recipient handling](https://www.rfc-editor.org/rfc/rfc5321)
