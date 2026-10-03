---
title: SMTP retry backoff
description: Why temporary failures should lead to spaced retries rather than a tight retry loop.
section: Reference
tags: [SMTP, Queues, Rate Limiting]
---

A temporary SMTP failure means "try later," not "reconnect as fast as possible."

Sending systems normally space retry attempts so an overloaded or rate-limiting destination is not hammered continuously.

Provider-specific throttling can make aggressive retries counterproductive.

Operators should inspect the actual queue schedule before changing retry timers globally.

## Reference material

- [RFC 5321 — Retry strategies](https://www.rfc-editor.org/rfc/rfc5321)
