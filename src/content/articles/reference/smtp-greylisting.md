---
title: Greylisting
description: Temporary SMTP deferral used by some receivers as an anti-abuse technique.
section: Reference
tags: [SMTP, Anti-Spam, Queues]
---

Greylisting temporarily rejects a delivery attempt with a 4xx response and expects a normal sending MTA to queue and retry.

Historically, this helped distinguish standards-compliant mail systems from simplistic spam software that did not retry properly.

Modern mail ecosystems have many other reputation and filtering signals, so greylisting is not universally used and can introduce delivery delay.

A legitimate sender should treat the temporary response according to SMTP retry behavior rather than immediately converting it into a permanent bounce.

## Reference material

- [RFC 5321 — Temporary failures and retry](https://www.rfc-editor.org/rfc/rfc5321)
