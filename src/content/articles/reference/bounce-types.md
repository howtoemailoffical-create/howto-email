---
title: Hard bounce and soft bounce terminology
description: Useful operational shorthand that should not replace the actual SMTP status.
section: Reference
tags: [Bounces, Deliverability]
---

Senders often call a permanent failure a **hard bounce** and a temporary failure a **soft bounce**.

Those labels are convenient but are not precise enough for troubleshooting.

A recipient that does not exist, a policy block, a temporarily full mailbox and a rate-limit deferral require different responses. Preserve the SMTP reply and enhanced status code instead of reducing everything to hard or soft.

## Reference material

- [RFC 3463 — Enhanced Mail System Status Codes](https://www.rfc-editor.org/rfc/rfc3463)
- [RFC 3464 — Delivery Status Notifications](https://www.rfc-editor.org/rfc/rfc3464)
