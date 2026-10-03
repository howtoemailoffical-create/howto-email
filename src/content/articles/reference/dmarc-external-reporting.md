---
title: DMARC reports to another domain
description: Why external aggregate-report destinations require authorization.
section: Reference
tags: [DMARC, Reporting, DNS]
---

A domain can request DMARC reports be sent to an address outside the domain publishing the policy.

Because that could otherwise direct large report volumes at an unwilling third party, DMARC defines an authorization check for external reporting destinations.

DMARC report processors commonly provide the required DNS record when you onboard a domain.

If reports never arrive at an external destination, check this authorization before assuming receivers are ignoring `rua`.

## Reference material

- [RFC 9989 — DMARC external reporting](https://www.rfc-editor.org/rfc/rfc9989)
