---
title: Delivery receipts vs read receipts
description: Delivery to a mail system and display by a client are different events.
section: Reference
tags: [DSN, MDN, Troubleshooting]
---

A delivery status notification relates to message transport and delivery processing.

A message disposition notification relates to what a recipient-side user agent reports doing with a message, such as displaying it.

Neither guarantees the recipient understood or acted on the content.

Keep these separate from provider tracking pixels, which are another mechanism entirely.

## Reference material

- [RFC 3464 — Delivery Status Notifications](https://www.rfc-editor.org/rfc/rfc3464)
- [RFC 8098 — Message Disposition Notifications](https://www.rfc-editor.org/rfc/rfc8098)
