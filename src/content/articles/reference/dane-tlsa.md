---
title: TLSA records for SMTP DANE
description: How DNSSEC-protected TLSA records can authenticate SMTP TLS endpoints.
section: Reference
tags: [DANE, TLS, DNSSEC]
---

DANE publishes TLSA records that describe acceptable TLS authentication information for a service.

For SMTP, the records are tied to the MX service endpoint and depend on DNSSEC validation.

DANE's security model is different from MTA-STS. It uses DNSSEC-protected DNS data rather than an HTTPS-hosted policy.

Operational success therefore depends on correct DNSSEC, TLSA data and certificate/key lifecycle.

## Reference material

- [RFC 6698 — DANE TLSA](https://www.rfc-editor.org/rfc/rfc6698)
- [RFC 7672 — SMTP Security via DANE](https://www.rfc-editor.org/rfc/rfc7672)
