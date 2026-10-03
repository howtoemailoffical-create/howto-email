---
title: Renew a mail TLS certificate
description: Replace certificates on every real SMTP/IMAP/submission endpoint and verify what clients actually receive.
section: Do
tags: [TLS, Certificates, Operations]
---

Inventory every service using the certificate: SMTP relay, submission, IMAP, POP, HTTPS policy hosts and load balancers.

Install the new certificate and intended chain.

Then connect to each public service and inspect the certificate actually presented. A file existing on the server does not prove the daemon or load balancer loaded it.

Keep the old key/certificate only as long as required by your rollback and security policy.

Automate expiry monitoring.

## Reference material

- [RFC 8314 — TLS for Submission and Access](https://www.rfc-editor.org/rfc/rfc8314)
- [RFC 8461 — MTA-STS](https://www.rfc-editor.org/rfc/rfc8461)
