---
title: Variable envelope return paths
description: How bulk senders can encode recipient or campaign information into bounce addresses.
section: Reference
tags: [Bounces, Bulk Email, SMTP]
---

A variable envelope return path gives messages distinct envelope-sender addresses so returned delivery information can be associated with a recipient or mailing event.

Conceptually:

```text
bounce+opaque-recipient-id@example.com
```

The exact encoding is implementation-specific.

Because this changes the SMTP envelope identity, operators need to account for SPF, bounce-domain DNS and DMARC alignment strategy where relevant.

## Reference material

- [RFC 5321 — Reverse-path and delivery notifications](https://www.rfc-editor.org/rfc/rfc5321)
- [RFC 3464 — Delivery Status Notifications](https://www.rfc-editor.org/rfc/rfc3464)
