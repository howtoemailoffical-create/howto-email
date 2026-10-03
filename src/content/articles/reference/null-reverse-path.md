---
title: Null reverse-path
description: Why bounces use MAIL FROM:<> and why responders should not bounce a bounce.
section: Reference
tags: [SMTP, Bounces, Automation]
---

SMTP uses an empty reverse-path for delivery-status notifications and other cases where another bounce must not be generated.

On the wire:

```text
MAIL FROM:<>
```

This prevents a failed DSN from creating another DSN back to itself and forming a bounce loop.

Filters and applications should not treat the null reverse-path as malformed merely because there is no normal sender address.

## Reference material

- [RFC 5321 — Reverse-path and notifications](https://www.rfc-editor.org/rfc/rfc5321)
- [RFC 3464 — Delivery Status Notifications](https://www.rfc-editor.org/rfc/rfc3464)
