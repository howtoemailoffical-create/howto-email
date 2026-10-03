---
title: Check an SMTP TLS certificate
description: Verify the certificate presented by the actual mail endpoint, not a website with the same domain.
section: Do
tags: [TLS, SMTP, Troubleshooting]
---

Connect to the exact SMTP hostname and port used by the mail flow.

For STARTTLS, negotiate the SMTP protocol first and then upgrade the connection. For implicit TLS submission, TLS begins immediately.

Inspect:

- certificate names;
- validity dates;
- issuer/chain;
- negotiated TLS version;
- whether the client validates the intended hostname.

A valid certificate on `www.example.com` tells you nothing about the certificate on `mx1.example.com:25`.

## Reference material

- [RFC 8314 — TLS for Submission and Access](https://www.rfc-editor.org/rfc/rfc8314)
- [RFC 8461 — MTA-STS](https://www.rfc-editor.org/rfc/rfc8461)
