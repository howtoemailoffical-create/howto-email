---
title: Create a deliverability baseline
description: Know normal authentication, bounces and complaint behavior before an incident.
section: Do
tags: [Deliverability, Monitoring, Operations]
---

You cannot recognize a meaningful change if you do not know what normal looks like.

Track, by major mail stream where possible:

- attempted and accepted volume;
- temporary and permanent failures;
- common enhanced status codes;
- complaint signals;
- authentication results;
- DMARC source trends;
- provider-specific reputation/health indicators;
- queue age and depth for infrastructure you operate.

Do not turn every metric into a pager alert. Establish ranges and trends, then alert on changes that require action.

## Reference material

- [RFC 3463 — Enhanced Mail System Status Codes](https://www.rfc-editor.org/rfc/rfc3463)
- [RFC 9989 — DMARC](https://www.rfc-editor.org/rfc/rfc9989)
- [Google — Email sender guidelines](https://support.google.com/mail/answer/81126)
