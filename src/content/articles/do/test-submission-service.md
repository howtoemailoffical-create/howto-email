---
title: Test an SMTP submission service
description: Validate EHLO, TLS and authentication without treating submission like an open-relay test.
section: Do
tags: [SMTP, Submission, Troubleshooting]
---

Use an account and destination you are authorized to test.

1. Resolve the submission hostname.
2. Connect on the documented port.
3. Inspect the greeting and EHLO capabilities.
4. Require TLS according to the service design.
5. Validate the certificate.
6. Authenticate using the supported mechanism.
7. Submit a controlled message.
8. Preserve the server replies and delivered headers.

After STARTTLS, issue EHLO again because advertised capabilities can change.

Never paste production passwords or bearer tokens into public testing websites.

## Reference material

- [RFC 6409 — Message Submission](https://www.rfc-editor.org/rfc/rfc6409)
- [RFC 8314 — TLS for Email Submission and Access](https://www.rfc-editor.org/rfc/rfc8314)
- [RFC 4954 — SMTP AUTH](https://www.rfc-editor.org/rfc/rfc4954)
