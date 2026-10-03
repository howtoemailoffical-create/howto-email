---
title: SMTP rate limiting
description: Throttling connections or messages without confusing temporary controls with permanent rejection.
section: Reference
tags: [SMTP, Rate Limiting, Operations]
---

Mail systems can limit connection rate, recipient rate, message rate or volume based on source, account, tenant or other context.

When the condition is temporary, a 4xx SMTP response lets a compliant sender queue and retry.

Rate limits should be designed around expected traffic. A shared NAT or large legitimate provider can make simple per-IP limits overly broad.

## Reference material

- [RFC 5321 — SMTP temporary failures](https://www.rfc-editor.org/rfc/rfc5321)
- [RFC 3463 — Enhanced Status Codes](https://www.rfc-editor.org/rfc/rfc3463)
