---
title: Audit organizational email domains
description: Build a domain inventory before authentication and routing become tribal knowledge.
section: Do
tags: [DNS, Audit, Operations]
---

List every organizational domain and subdomain used for email.

For each, record:

- receives mail?
- sends mail?
- MX;
- SPF;
- DKIM selectors/providers;
- DMARC;
- return-path/bounce use;
- MTA-STS/TLS-RPT;
- responsible owner;
- vendors;
- retirement date if temporary.

Include domains used only by applications or marketing systems.

A domain with no owner is where stale SPF includes and forgotten SaaS senders tend to live.

## Reference material

- [RFC 9989 — DMARC](https://www.rfc-editor.org/rfc/rfc9989)
- [RFC 5598 — Internet Mail Architecture](https://www.rfc-editor.org/rfc/rfc5598)
