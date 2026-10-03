---
title: TLS-RPT DNS record
description: The DNS policy that tells participating senders where to send SMTP TLS reports.
section: Reference
tags: [TLS-RPT, DNS, Reporting]
---

TLS-RPT policy is published as TXT at:

```text
_smtp._tls.example.com
```

A basic policy identifies the TLS reporting version and one or more reporting URIs.

Reports summarize successful and failed TLS delivery attempts under supported policy mechanisms.

TLS-RPT does not itself require TLS. It provides visibility into transport-security behavior.

## Reference material

- [RFC 8460 — SMTP TLS Reporting](https://www.rfc-editor.org/rfc/rfc8460)
