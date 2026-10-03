---
title: DSN message format
description: The machine-readable structure behind many delivery status notifications.
section: Reference
tags: [Bounces, MIME]
---

A standards-based DSN uses the `multipart/report` framework and can include human-readable text, a `message/delivery-status` section, and original message content or headers.

Useful fields can include the original recipient, final recipient, action, status and diagnostic code.

That structured data is why bounce processors should parse DSNs or provider event payloads instead of trying to classify failures from the subject line.

## Reference material

- [RFC 3464 — An Extensible Message Format for Delivery Status Notifications](https://www.rfc-editor.org/rfc/rfc3464)
- [RFC 3463 — Enhanced Mail System Status Codes](https://www.rfc-editor.org/rfc/rfc3463)
