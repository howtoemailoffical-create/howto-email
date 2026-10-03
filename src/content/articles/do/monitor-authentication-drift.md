---
title: Monitor email authentication drift
description: Catch new senders and broken alignment before users report deliverability problems.
section: Do
tags: [DMARC, Monitoring, Operations]
---

Authentication changes even when nobody edits the DMARC record.

New SaaS tools appear, vendors rotate infrastructure, applications change return paths and gateways start modifying mail.

Monitor:

- new DMARC source IPs/providers;
- SPF permerrors;
- DKIM failure changes;
- alignment failure rates;
- unknown selectors;
- DNS changes to authentication records.

Tie alerts to the sender inventory so a known planned migration does not look identical to an unauthorized sender.

## Reference material

- [RFC 9989 — DMARC](https://www.rfc-editor.org/rfc/rfc9989)
- [RFC 7208 — SPF](https://www.rfc-editor.org/rfc/rfc7208)
- [RFC 6376 — DKIM](https://www.rfc-editor.org/rfc/rfc6376)
