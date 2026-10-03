---
title: SMTP vs email APIs
description: Choose between SMTP submission and an HTTPS sending API based on the application, not fashion.
section: Learn
tags: [SMTP, API, Applications]
---

Applications usually send mail through SMTP submission or a provider-specific HTTPS API.

SMTP is standardized, widely supported and portable. An API can expose provider-specific features such as templates, tags, idempotency, event metadata and richer error objects.

## The real design questions

Ask how the application authenticates, how secrets or tokens rotate, whether the provider is replaceable, how retries work, how bounces and complaints return, and how you correlate a send request with later delivery events.

An API does not bypass email standards. The provider still has to construct and deliver an Internet message.

## Reference material

- [RFC 6409 — Message Submission for Mail](https://www.rfc-editor.org/rfc/rfc6409)
- [RFC 5321 — SMTP](https://www.rfc-editor.org/rfc/rfc5321)
