---
title: Troubleshoot missing or broken MX records
description: Determine whether mail routing is failing at DNS before investigating the mailbox platform.
section: Do
tags: [DNS, MX, Troubleshooting]
---

Query the recipient domain's MX records from more than one resolver and, when possible, query the authoritative nameservers directly.

Check for:

- no expected MX answer;
- MX targets with typing errors;
- MX targets that do not resolve;
- stale cached answers after a change;
- DNSSEC validation failure;
- Null MX on a domain expected to receive mail.

Then test TCP/25 reachability to the resolved exchanger from an appropriate network.

Do not create an MX that points directly to an IP address. MX data names a host, which is then resolved separately.

## Reference material

- [RFC 5321 — SMTP routing](https://www.rfc-editor.org/rfc/rfc5321)
- [RFC 1035 — DNS](https://www.rfc-editor.org/rfc/rfc1035)
- [RFC 7505 — Null MX](https://www.rfc-editor.org/rfc/rfc7505)
