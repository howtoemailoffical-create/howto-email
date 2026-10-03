---
title: SPF
description: Sender Policy Framework authorizes SMTP sources for a domain.
section: Reference
tags: [SPF, DNS, Authentication]
---

SPF answers a narrow question: **is this connecting IP authorized to send mail for the SMTP identity being checked?**

The policy lives in DNS as a TXT record.

```text
example.com. IN TXT "v=spf1 ip4:192.0.2.10 include:_spf.example.net -all"
```

## What SPF actually authenticates

SPF normally evaluates the domain used by the SMTP envelope sender (`MAIL FROM`). That can be different from the `From:` address a person sees in their mail client.

That difference is important. A message can pass SPF for one domain while displaying another domain in the From header. DMARC adds the alignment check that connects authentication to the visible From domain.

## Common mechanisms

- `ip4` / `ip6` — authorize address ranges.
- `include` — evaluate another domain's SPF policy.
- `a` — use addresses returned for a hostname.
- `mx` — use addresses of MX hosts.
- `all` — matches everything and is normally placed last.

Qualifiers such as `-`, `~`, `?` and `+` affect the result returned by a matching mechanism.

## The DNS lookup limit

SPF is not an unlimited chain of includes. RFC 7208 limits DNS-query-causing terms during evaluation. Complex SaaS environments can exceed that limit and return `permerror`.

Do not solve this by blindly copying records or creating multiple SPF records at the same name. Inventory the real senders and simplify intentionally.

## Forwarding

Traditional forwarding changes the connecting IP. That is why an otherwise legitimate forwarded message can fail SPF. DKIM, SRS and ARC address different parts of this problem.

## Reference material

- [RFC 7208 — Sender Policy Framework (SPF)](https://www.rfc-editor.org/rfc/rfc7208)
- [Microsoft — Set up SPF for Microsoft 365](https://learn.microsoft.com/en-us/defender-office-365/email-authentication-spf-configure)
- [Google — Email sender guidelines](https://support.google.com/a/answer/81126)
