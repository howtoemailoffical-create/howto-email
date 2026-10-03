---
title: DANE for SMTP
description: DNSSEC-backed TLSA records can authenticate SMTP TLS without relying solely on the public CA model.
section: Reference
tags: [DANE, TLS, DNSSEC, SMTP]
---

DANE for SMTP lets a receiving domain publish TLSA records that sending MTAs can authenticate through DNSSEC. Those records describe acceptable TLS credentials or keys for the MX service.

The trust path is different from MTA-STS. DANE depends on correctly deployed DNSSEC and TLSA data; MTA-STS discovers policy through DNS but retrieves its enforceable policy over HTTPS.

DANE can provide strong downgrade resistance, but DNSSEC, certificate/key rotation and TLSA lifecycle all become production dependencies.

## Reference material

- [RFC 7672 — SMTP Security via Opportunistic DANE TLS](https://www.rfc-editor.org/rfc/rfc7672)
- [RFC 6698 — The TLSA DNS Resource Record](https://www.rfc-editor.org/rfc/rfc6698)
