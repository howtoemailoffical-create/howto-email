---
title: One-click unsubscribe
description: The RFC 8058 headers used by mailbox providers for automated unsubscribe actions.
section: Reference
tags: [Bulk Email, Headers, Unsubscribe]
---

RFC 8058 defines a way for a sender to advertise an HTTPS one-click unsubscribe action.

The message contains both:

```text
List-Unsubscribe: <https://example.com/unsubscribe/opaque-token>
List-Unsubscribe-Post: List-Unsubscribe=One-Click
```

The receiving system can perform an HTTPS POST without sending the user through a confirmation page.

## It is not just a body link

A visible unsubscribe link in the message body is useful, but it is not the same protocol mechanism as RFC 8058 one-click unsubscribe.

The specification also requires a valid DKIM signature covering the relevant list-unsubscribe headers.

## Current provider requirements

Large mailbox providers can impose additional requirements on bulk or subscription mail. Google, for example, requires one-click unsubscribe for applicable marketing/subscribed traffic under its sender rules. Always verify current provider guidance because those requirements evolve.

## Reference material

- [RFC 8058 — Signaling One-Click Functionality for List Email Headers](https://www.rfc-editor.org/rfc/rfc8058)
- [RFC 2369 — Mail List Command Headers](https://www.rfc-editor.org/rfc/rfc2369)
- [Google — Email sender guidelines](https://support.google.com/mail/answer/81126)
