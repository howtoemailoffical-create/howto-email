---
title: SMTP EHLO identity
description: The hostname a sending SMTP client presents is part of the transaction and useful operational evidence.
section: Reference
tags: [SMTP, EHLO, Identity]
---

An SMTP client introduces itself using EHLO, or HELO for basic SMTP.

A properly operated MTA normally presents a meaningful hostname consistent with its infrastructure.

Receivers can log or evaluate this identity, but EHLO alone is not cryptographic authentication. A client can claim a name.

Use it alongside connection IP, DNS, TLS, SPF and other evidence.

## Reference material

- [RFC 5321 — HELO and EHLO](https://www.rfc-editor.org/rfc/rfc5321)
