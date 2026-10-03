---
title: Implement one-click unsubscribe
description: Add RFC 8058 unsubscribe behavior without turning a preferences page into fake one-click support.
section: Do
tags: [Bulk Email, Unsubscribe, Headers]
---

For applicable subscription mail, generate an HTTPS endpoint that can identify the recipient/list from an opaque or hard-to-forge token.

Add:

```text
List-Unsubscribe: <https://example.com/unsubscribe/opaque-token>
List-Unsubscribe-Post: List-Unsubscribe=One-Click
```

## Endpoint behavior

The receiving system sends an HTTPS POST. RFC 8058 is designed so the unsubscribe can complete without another user interaction.

Do not redirect the POST to a preference page and call that one-click.

## Sign the headers

Use DKIM and ensure the relevant unsubscribe headers are covered by a valid signature as required by RFC 8058.

## Keep the visible option too

Provider requirements can also call for a clearly visible unsubscribe option in the message body. Treat the protocol header and human-facing preference experience as complementary.

## Reference material

- [RFC 8058 — One-Click Unsubscribe](https://www.rfc-editor.org/rfc/rfc8058)
- [Google — Email sender guidelines](https://support.google.com/mail/answer/81126)
- [Google — Sender guidelines FAQ](https://support.google.com/mail/answer/14229414)
