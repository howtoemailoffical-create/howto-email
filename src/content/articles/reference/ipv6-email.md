---
title: IPv6 and email
description: AAAA records and IPv6 sending require the same operational discipline as IPv4, plus working reverse DNS.
section: Reference
tags: [IPv6, DNS, SMTP]
---

SMTP can operate over IPv6.

If a sending host uses IPv6, make sure the address is intentionally routed, permitted by firewalls, represented in SPF where needed, and has appropriate reverse DNS.

Do not publish an AAAA record for an MX host unless the IPv6 service actually works. Remote senders can attempt that address.

## Reference material

- [RFC 5321 — SMTP](https://www.rfc-editor.org/rfc/rfc5321)
- [RFC 3596 — DNS Extensions to Support IPv6](https://www.rfc-editor.org/rfc/rfc3596)
- [Google — Email sender guidelines](https://support.google.com/mail/answer/81126)
