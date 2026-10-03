---
title: MX priority and failover
description: How senders choose between multiple MX records and what backup MX really means.
section: Reference
tags: [MX, DNS, Routing]
---

MX preference is an ordering hint, not a load-balancing percentage. A sending MTA normally tries the lowest preference value first and moves to other eligible exchangers when delivery cannot proceed.

```text
example.com. IN MX 10 mx1.example.net.
example.com. IN MX 10 mx2.example.net.
example.com. IN MX 20 mx-backup.example.net.
```

Hosts at the same preference are equivalent choices. The higher-numbered host is lower priority.

## Backup MX is still production

A backup MX that accepts mail must be secured and filtered like the primary path. Attackers can intentionally connect to a weaker backup host. It also needs a reliable way to deliver queued messages onward without becoming an open relay.

## Reference material

- [RFC 5321 — SMTP address resolution and mail routing](https://www.rfc-editor.org/rfc/rfc5321)
- [RFC 7505 — Null MX](https://www.rfc-editor.org/rfc/rfc7505)
