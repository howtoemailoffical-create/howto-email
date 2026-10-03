---
title: How Bcc works
description: Why a recipient can receive a message without appearing in To or Cc.
section: Reference
tags: [Headers, SMTP]
---

SMTP recipients live in the envelope. The visible `To:` and `Cc:` fields live inside the message. Because those are separate, an SMTP recipient does not have to appear in a visible recipient header.

A sending system can remove the `Bcc:` field before final delivery while still issuing `RCPT TO` for the blind-copy recipient.

This is normal behavior and a useful example of why header recipients cannot be treated as the authoritative delivery-recipient list.

## Reference material

- [RFC 5322 — Destination address fields and Bcc](https://www.rfc-editor.org/rfc/rfc5322)
- [RFC 5321 — SMTP envelope recipients](https://www.rfc-editor.org/rfc/rfc5321)
