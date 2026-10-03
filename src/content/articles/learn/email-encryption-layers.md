---
title: Email encryption has multiple layers
description: Transport TLS and end-to-end message protection solve different problems.
section: Learn
tags: [TLS, Encryption, S-MIME]
---

Saying that an email is "encrypted" is incomplete without saying **where**.

## Transport encryption

SMTP TLS protects a connection between two systems while the message is moving across that hop. The next system normally receives the message in a form it can process.

## Message-level protection

Technologies such as S/MIME can encrypt or sign message content itself. This can provide protection that travels with the message, but it introduces certificate, key-distribution, client-support and recovery considerations.

## Storage is another layer

Encryption at rest protects stored systems or media under a different threat model. It does not replace secure transport or message-level controls.

## Reference material

- [NIST SP 800-177 Rev. 1 — Trustworthy Email](https://csrc.nist.gov/pubs/sp/800/177/r1/final)
- [RFC 8551 — S/MIME 4.0 Message Specification](https://www.rfc-editor.org/rfc/rfc8551)
