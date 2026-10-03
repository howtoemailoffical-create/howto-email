---
title: Open SMTP relays
description: Why unrestricted third-party relay is an abuse and reputation disaster.
section: Reference
tags: [SMTP, Security, Relay]
---

An open relay lets unauthenticated or unauthorized third parties use a mail server to send onward to unrelated destinations.

That makes the infrastructure useful to spammers and can quickly damage IP/domain reputation.

A public MX must accept inbound mail **for domains it serves**. That is not the same as relaying arbitrary mail from anybody to anybody.

## Reference material

- [RFC 5321 — SMTP relay](https://www.rfc-editor.org/rfc/rfc5321)
- [RFC 6409 — Message Submission](https://www.rfc-editor.org/rfc/rfc6409)
