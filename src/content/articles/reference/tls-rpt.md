---
title: TLS-RPT
description: Aggregate reporting for failures involving SMTP TLS and transport security policy.
section: Reference
tags: [TLS-RPT, TLS, Reporting]
---

TLS-RPT gives a receiving domain visibility into TLS problems observed by participating sending systems.

A policy is published under `_smtp._tls`:

```text
_smtp._tls.example.com. IN TXT "v=TLSRPTv1; rua=mailto:tls-reports@example.com"
```

Reports can expose certificate validation failures, policy mismatches and TLS negotiation problems that would otherwise only appear in another organization's outbound logs.

TLS-RPT is reporting. It does not itself force TLS. Enforcement can come from mechanisms such as MTA-STS or DANE.

## Reference material

- [RFC 8460 — SMTP TLS Reporting](https://www.rfc-editor.org/rfc/rfc8460)
- [RFC 8461 — MTA-STS](https://www.rfc-editor.org/rfc/rfc8461)
