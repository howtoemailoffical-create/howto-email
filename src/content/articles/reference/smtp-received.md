---
title: SMTP Received trace fields
description: What a mail server records when it adds a Received header.
section: Reference
tags: [SMTP, Headers, Troubleshooting]
---

Each SMTP system that accepts and relays a message normally prepends a `Received` trace field.

Depending on the system, the field can record the sending and receiving hosts, protocol, queue identifier, recipient information and timestamp.

## Order

Because each new field is prepended, the newest trusted hop is near the top and older hops are lower down.

## Trust

Do not assume the entire chain is genuine. An attacker can create fake Received fields before handing the message to your infrastructure. Start with a field added by a system you trust and work backward.

## Reference material

- [RFC 5321 — Trace information](https://www.rfc-editor.org/rfc/rfc5321)
- [RFC 5322 — Trace fields](https://www.rfc-editor.org/rfc/rfc5322)
