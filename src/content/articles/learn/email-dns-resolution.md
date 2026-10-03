---
title: How email uses DNS during delivery
description: Follow the resolver path from a recipient domain to a reachable mail exchanger.
section: Learn
tags: [DNS, MX, SMTP]
---

When an MTA needs to deliver mail, DNS is part of the routing decision.

For a normal domain, the sender looks for MX records, orders them by preference, resolves the selected exchanger hostnames to addresses, and attempts SMTP delivery.

## DNS failures are not all the same

A temporary resolver failure should not be treated like authoritative proof that a domain has no mail service. SMTP and DNS both distinguish temporary conditions from permanent ones.

## Cache behavior matters

Resolvers cache answers according to DNS TTLs. After a migration, different senders can legitimately see old and new answers for a period of time.

## Reference material

- [RFC 5321 — SMTP address resolution and mail routing](https://www.rfc-editor.org/rfc/rfc5321)
- [RFC 1034 — Domain Names: Concepts and Facilities](https://www.rfc-editor.org/rfc/rfc1034)
- [RFC 1035 — Domain Names: Implementation and Specification](https://www.rfc-editor.org/rfc/rfc1035)
