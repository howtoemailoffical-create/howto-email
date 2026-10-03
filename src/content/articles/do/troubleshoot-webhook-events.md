---
title: Troubleshoot missing email webhook events
description: Separate provider delivery from callback-delivery failures.
section: Do
tags: [Webhooks, Troubleshooting, API]
---

When an application says "the email webhook never arrived," split the path into two systems:

**Mail path:** application -> provider -> recipient system.

**Event path:** provider -> your HTTPS endpoint.

A delivered email with no webhook points toward the second path, not SMTP.

Check provider event logs, webhook subscription configuration, endpoint DNS/TLS, request authentication, HTTP response codes, timeouts and application logs.

Also check whether your endpoint accepted the event but failed later during asynchronous processing.

## Reference material

- [RFC 9110 — HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110)
- [RFC 3463 — Enhanced Mail System Status Codes](https://www.rfc-editor.org/rfc/rfc3463)
