---
title: Process unsubscribes safely
description: Make suppression durable across campaigns and avoid accidentally resubscribing people.
section: Do
tags: [Unsubscribe, Bulk Email, Operations]
---

An unsubscribe is an operational state, not just a link click.

Record enough information to suppress future applicable sends even if a list is re-imported later. Define whether the request applies to one list, a category of mail, or all promotional mail according to the user's choice and your legal/operational requirements.

Do not silently recreate subscriptions from stale CRM exports.

For automated one-click requests, validate the opaque token and process the request without requiring an interactive login.

## Reference material

- [RFC 8058 — One-Click Unsubscribe](https://www.rfc-editor.org/rfc/rfc8058)
- [Google — Email subscription guidelines](https://support.google.com/mail/answer/15263077)
