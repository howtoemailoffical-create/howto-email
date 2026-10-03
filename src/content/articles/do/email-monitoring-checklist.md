---
title: Email infrastructure monitoring checklist
description: Monitor the dependencies that can break mail even while the SMTP process is still running.
section: Do
tags: [Monitoring, Operations, SMTP]
---

A green process check is not enough.

Monitor:

- inbound/outbound SMTP reachability;
- queue age and depth;
- DNS resolution;
- MX changes;
- certificate expiry;
- DKIM/DMARC DNS availability;
- MTA-STS policy availability if used;
- TLS-RPT/DMARC report flow;
- disk/storage and system health;
- provider/API errors;
- authentication failures;
- abnormal outbound volume;
- representative end-to-end test messages where appropriate.

Keep synthetic tests controlled so monitoring does not become a source of noisy mail.

## Reference material

- [RFC 5321 — SMTP](https://www.rfc-editor.org/rfc/rfc5321)
- [RFC 8460 — TLS Reporting](https://www.rfc-editor.org/rfc/rfc8460)
- [RFC 9989 — DMARC](https://www.rfc-editor.org/rfc/rfc9989)
