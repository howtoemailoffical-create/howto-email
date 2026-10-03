---
title: DMARC and subdomains
description: How organizational-domain policy and the sp tag affect subdomain mail.
section: Reference
tags: [DMARC, DNS, Subdomains]
---

A DMARC policy can affect mail from subdomains even when each subdomain does not publish its own record.

DMARC's organizational-domain discovery and subdomain-policy rules determine which policy applies.

The `sp` tag can specify policy for subdomains separately from the organizational domain's `p` policy.

Do not assume creating `marketing.example.com` escapes the policy at `example.com`. Check the actual DMARC discovery rules.

## Reference material

- [RFC 9989 — DMARC](https://www.rfc-editor.org/rfc/rfc9989)
