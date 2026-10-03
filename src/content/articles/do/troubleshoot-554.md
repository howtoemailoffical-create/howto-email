---
title: Investigate SMTP 554 responses
description: Use the enhanced code and diagnostic text because 554 alone is not a root cause.
section: Do
tags: [SMTP, Troubleshooting, Deliverability]
---

`554` is a permanent negative SMTP reply, but providers use it for different rejection conditions.

Capture:

- complete reply;
- enhanced status code;
- remote hostname;
- sending IP;
- sender/recipient;
- timestamp;
- queue/message identifier.

Then classify the actual reason: policy, content, authentication, reputation, relay, recipient restrictions or another condition.

Do not make DNS changes based on the three-digit code alone.

## Reference material

- [RFC 5321 — SMTP reply codes](https://www.rfc-editor.org/rfc/rfc5321)
- [RFC 3463 — Enhanced Status Codes](https://www.rfc-editor.org/rfc/rfc3463)
