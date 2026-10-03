---
title: SMTP queue lifetime
description: How long a sender retries is an operational policy bounded by SMTP requirements and implementation choices.
section: Reference
tags: [SMTP, Queues, Retries]
---

Temporary delivery failures cause a sending MTA to queue mail and retry later.

SMTP specifies retry behavior and minimum expectations, while actual queue lifetime and retry schedule depend on the implementation and service.

Eventually a message that cannot be delivered expires and normally produces a delivery failure notification where appropriate.

When troubleshooting delay, check the queue's next retry time and expiry policy rather than repeatedly forcing manual retries.

## Reference material

- [RFC 5321 — Queuing and retry strategies](https://www.rfc-editor.org/rfc/rfc5321)
