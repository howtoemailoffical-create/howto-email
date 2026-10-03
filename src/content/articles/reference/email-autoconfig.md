---
title: Email service discovery
description: How clients can discover submission and mailbox services instead of relying only on manual port entry.
section: Reference
tags: [Clients, DNS, Discovery]
---

Mail clients can use standardized or provider-specific discovery mechanisms to locate IMAP, POP and submission services.

Standard mechanisms include SRV-based service discovery and email autoconfiguration specifications. Large hosted providers may also expose their own discovery systems.

Discovery should return secure service choices and still requires normal TLS certificate validation.

## Reference material

- [RFC 6186 — Use of SRV Records for Locating Email Submission/Access Services](https://www.rfc-editor.org/rfc/rfc6186)
- [RFC 8314 — TLS for Email Submission and Access](https://www.rfc-editor.org/rfc/rfc8314)
