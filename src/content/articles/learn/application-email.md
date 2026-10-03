---
title: Application email architecture
description: Design application-generated email so credentials, retries, identity and telemetry are manageable.
section: Learn
tags: [Applications, SMTP, Architecture]
---

Treat email as an external dependency, not a function call that always succeeds.

A useful design separates message creation, submission, provider response, asynchronous delivery events and business state.

## Plan for failure

A successful API call or SMTP `250` usually means the next system accepted responsibility. It does not prove the recipient read the message—or even that final delivery has happened.

Queue application sends where appropriate, use bounded retries, avoid duplicate business actions, and keep a correlation identifier.

## Identity

Define which domain appears in From, which domain handles bounces, and where DKIM signing happens. Do this before multiple applications invent their own patterns.

## Reference material

- [RFC 6409 — Message Submission for Mail](https://www.rfc-editor.org/rfc/rfc6409)
- [RFC 5321 — SMTP](https://www.rfc-editor.org/rfc/rfc5321)
- [RFC 5322 — Internet Message Format](https://www.rfc-editor.org/rfc/rfc5322)
