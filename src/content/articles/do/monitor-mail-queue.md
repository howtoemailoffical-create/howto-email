---
title: Monitor an SMTP queue
description: Turn queue depth and age into useful operational signals.
section: Do
tags: [SMTP, Monitoring, Queues]
---

Queue depth alone is noisy. A high-volume sender can have many healthy queued messages for a short time.

Track at least:

- total queued messages;
- age of the oldest message;
- destination concentration;
- repeated SMTP status codes;
- retry counts;
- queue growth rate.

A sudden queue dominated by one destination points somewhere different from a queue growing across every domain.

Alert on conditions that require intervention, such as sustained growth or old messages, rather than every temporary retry.

## Reference material

- [RFC 5321 — SMTP queueing and retries](https://www.rfc-editor.org/rfc/rfc5321)
- [RFC 3463 — Enhanced Status Codes](https://www.rfc-editor.org/rfc/rfc3463)
