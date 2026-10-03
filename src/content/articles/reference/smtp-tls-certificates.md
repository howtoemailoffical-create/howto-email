---
title: SMTP TLS certificates
description: Names, trust and validity checks in SMTP transport and submission.
section: Reference
tags: [TLS, Certificates, SMTP]
---

A TLS certificate is useful only when the connecting party can validate it under the security model being used.

For client submission and mailbox access, clients normally validate the server identity and certificate chain.

Server-to-server SMTP historically uses opportunistic TLS more often, where encryption can occur without the same authenticated policy. MTA-STS and DANE provide mechanisms for stronger destination authentication.

## Rotation

Renew certificates before expiry, deploy the complete intended chain, and monitor all SMTP endpoints—not just the web server using the same domain.

## Reference material

- [RFC 8314 — TLS for Email Submission and Access](https://www.rfc-editor.org/rfc/rfc8314)
- [RFC 8461 — MTA-STS](https://www.rfc-editor.org/rfc/rfc8461)
- [RFC 7672 — SMTP Security via DANE TLS](https://www.rfc-editor.org/rfc/rfc7672)
