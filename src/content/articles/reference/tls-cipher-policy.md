---
title: TLS versions and cipher policy for email
description: Transport security requires interoperable cryptography as well as a valid certificate.
section: Reference
tags: [TLS, Security, SMTP]
---

TLS policy includes protocol versions and cryptographic algorithms, not just certificates.

Disable obsolete cryptography according to current organizational and platform guidance while preserving interoperability required by the mail service.

Submission and mailbox access can usually enforce stronger authenticated TLS expectations than opportunistic Internet SMTP.

For server-to-server mail, MTA-STS or DANE can add policy beyond opportunistic STARTTLS.

## Reference material

- [RFC 8996 — Deprecating TLS 1.0 and TLS 1.1](https://www.rfc-editor.org/rfc/rfc8996)
- [RFC 8314 — TLS for Email Submission and Access](https://www.rfc-editor.org/rfc/rfc8314)
- [RFC 8461 — MTA-STS](https://www.rfc-editor.org/rfc/rfc8461)
