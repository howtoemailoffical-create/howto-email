---
title: Investigate SMTP 421 responses
description: Treat 421 as a service-level temporary failure and preserve the provider's diagnostic text.
section: Do
tags: [SMTP, Troubleshooting, Queues]
---

`421` indicates the service is not available and the connection is being closed.

Causes can include maintenance, load, rate limiting, policy controls or local service problems.

The sending MTA normally queues affected mail and retries.

Record the full response and determine whether it affects one destination, one source, or all outbound traffic. A provider-specific diagnostic string may identify throttling or another policy condition.

## Reference material

- [RFC 5321 — SMTP reply codes](https://www.rfc-editor.org/rfc/rfc5321)
- [RFC 3463 — Enhanced Status Codes](https://www.rfc-editor.org/rfc/rfc3463)
