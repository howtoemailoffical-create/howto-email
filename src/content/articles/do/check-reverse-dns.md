---
title: Check reverse DNS for an outbound mail server
description: Verify PTR and forward DNS without confusing rDNS with authentication.
section: Do
tags: [DNS, Deliverability]
---

Start with the actual public IP used for outbound SMTP.

1. Query its PTR record.
2. Resolve the returned hostname forward.
3. Confirm the naming is intentional and stable.
4. Compare it with the SMTP hostname/HELO used by the sending infrastructure.

PTR records are normally controlled by the organization that owns the IP space, not by the DNS provider hosting your normal domain zone.

Reverse DNS is an infrastructure signal. It does not replace SPF, DKIM or DMARC.

## Reference material

- [RFC 1035 — PTR resource records](https://www.rfc-editor.org/rfc/rfc1035)
- [RFC 5321 — SMTP client identity](https://www.rfc-editor.org/rfc/rfc5321)
