---
title: Secure postmaster, abuse and other role mailboxes
description: Keep operational addresses reachable without turning them into forgotten shared credentials.
section: Do
tags: [Security, Mailbox, Operations]
---

Route role addresses to monitored mailboxes, queues or groups with named owners.

Use delegated access instead of a shared password where the platform supports it.

Apply normal anti-phishing and malware controls, because public role addresses receive hostile mail by design.

Document who handles reports and what should be escalated.

Periodically test that required addresses still accept mail and reach somebody responsible.

## Reference material

- [RFC 2142 — Common role mailboxes](https://www.rfc-editor.org/rfc/rfc2142)
- [RFC 5321 — Postmaster](https://www.rfc-editor.org/rfc/rfc5321)
