---
title: Lab: trace email DNS by hand
description: Walk from a domain to its MX, addresses, SPF, DMARC and DKIM records.
section: Do
tags: [Lab, DNS, Authentication]
---

Use a domain you own or a public domain for passive DNS inspection.

## MX

Query the domain's MX records and note preference and hostname.

## Addresses

Resolve each MX hostname to A and AAAA records.

## SPF

Query TXT at the sending domain and identify the SPF policy.

## DMARC

Query TXT at `_dmarc.example.com`.

## DKIM

You need a selector. Take `s=` and `d=` from a real DKIM-Signature, then query:

```text
selector._domainkey.signing-domain
```

## What to write down

For every lookup, keep the queried name, record type, answer, TTL and which resolver or authoritative server answered.

## Reference material

- [RFC 1034 — DNS Concepts](https://www.rfc-editor.org/rfc/rfc1034)
- [RFC 7208 — SPF](https://www.rfc-editor.org/rfc/rfc7208)
- [RFC 6376 — DKIM](https://www.rfc-editor.org/rfc/rfc6376)
- [RFC 9989 — DMARC](https://www.rfc-editor.org/rfc/rfc9989)
