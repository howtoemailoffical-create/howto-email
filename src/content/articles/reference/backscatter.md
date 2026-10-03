---
title: Backscatter
description: Why generating bounces to forged sender addresses can make your mail system part of an abuse problem.
section: Reference
tags: [Bounces, Abuse, SMTP]
---

Backscatter happens when a system accepts a message and later sends a non-delivery message to an address that was forged as the sender.

The innocent forged address receives a bounce for mail it never sent.

## Prefer rejection during SMTP

When possible, reject clearly unacceptable recipients or messages during the SMTP transaction. The connecting sender then owns notification behavior.

After accepting responsibility for a message, delivery failures have different semantics, which is why careful acceptance policy matters.

## Reference material

- [RFC 5321 — SMTP delivery responsibility and notifications](https://www.rfc-editor.org/rfc/rfc5321)
- [RFC 3464 — Delivery Status Notifications](https://www.rfc-editor.org/rfc/rfc3464)
