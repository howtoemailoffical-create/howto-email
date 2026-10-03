---
title: Email domain strategy
description: Use organizational domains and subdomains deliberately across people, applications and bulk mail.
section: Learn
tags: [DNS, Architecture, Deliverability]
---

A company can send every kind of email from one domain, but that does not mean it should.

Subdomains can make ownership and operations clearer:

```text
example.com
notify.example.com
marketing.example.com
support.example.com
```

## What separation gives you

Separate domains or subdomains can make authentication, vendor delegation, bounce handling and monitoring easier to reason about. They can also reduce the blast radius of configuration mistakes.

Separation is not a trick for escaping reputation. Receivers can correlate related infrastructure and organizational domains.

## Plan before delegation

Decide who owns DNS, DKIM, DMARC reports, return paths and decommissioning for each mail stream.

## Reference material

- [RFC 9989 — DMARC](https://www.rfc-editor.org/rfc/rfc9989)
- [RFC 5598 — Internet Mail Architecture](https://www.rfc-editor.org/rfc/rfc5598)
