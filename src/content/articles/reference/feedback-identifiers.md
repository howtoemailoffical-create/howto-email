---
title: Feedback identifiers in bulk mail
description: Provider or sender metadata can help correlate complaints and campaigns without exposing recipient data carelessly.
section: Reference
tags: [Deliverability, Bulk Email, Telemetry]
---

Bulk sending systems often attach internal campaign, tenant or stream identifiers so delivery and complaint events can be traced back to a source.

The exact mechanism is provider-specific.

Identifiers should be opaque enough that exposing a header or bounce address does not reveal sensitive internal information.

Use stable correlation metadata to answer "which application/list/campaign caused this?" quickly.

## Reference material

- [RFC 5965 — Email Feedback Reports](https://www.rfc-editor.org/rfc/rfc5965)
- [RFC 3464 — Delivery Status Notifications](https://www.rfc-editor.org/rfc/rfc3464)
