---
title: Email event webhooks
description: How providers return delivery, bounce and complaint events to applications.
section: Learn
tags: [Webhooks, API, Applications]
---

Sending is only half of application email. Providers often return asynchronous events such as delivered, deferred, bounced, complained or unsubscribed through webhooks.

## Assume retries and duplicates

A webhook endpoint should authenticate requests using the provider's supported signing mechanism, return promptly, and handle duplicate or out-of-order events safely.

Do not make irreversible business changes merely because an event arrived once.

## Keep provider and business state separate

Store the provider message/event identifier alongside your own correlation ID. That makes it possible to change providers without making provider IDs your application's primary identity.

## Reference material

- [RFC 3463 — Enhanced Mail System Status Codes](https://www.rfc-editor.org/rfc/rfc3463)
- [RFC 5965 — Email Feedback Reports](https://www.rfc-editor.org/rfc/rfc5965)
