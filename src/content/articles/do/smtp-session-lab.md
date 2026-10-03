---
title: Lab: read an SMTP session
description: Learn the transaction without using somebody else's server as a relay test.
section: Do
tags: [Lab, SMTP, Troubleshooting]
---

Use a test SMTP service or infrastructure you are authorized to inspect.

Follow the session:

```text
220 greeting
EHLO client.example
250 capabilities
MAIL FROM:<sender@example.com>
250 accepted
RCPT TO:<recipient@example.net>
250 accepted
DATA
354 send content
...
250 queued
QUIT
```

Identify where STARTTLS occurs, whether authentication is appropriate for that service, and which response belongs to each command.

Then deliberately use an invalid recipient on your own test environment and compare the response.

## Reference material

- [RFC 5321 — SMTP](https://www.rfc-editor.org/rfc/rfc5321)
- [RFC 6409 — Message Submission](https://www.rfc-editor.org/rfc/rfc6409)
