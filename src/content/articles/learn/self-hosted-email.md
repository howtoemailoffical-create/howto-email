---
title: What self-hosting email actually requires
description: The moving parts behind operating your own Internet-facing mail service.
section: Learn
tags: [Self-Hosted, Architecture, Operations]
---

Running an SMTP daemon is the easy part of self-hosting email.

A production service also needs stable DNS, MX and address records, reverse DNS, TLS certificates, inbound filtering, outbound abuse controls, SPF/DKIM/DMARC, queues, backups, monitoring, account security, patching and an operational response process.

## Reputation is operational

A correctly configured server is not automatically trusted by receivers. New or abused infrastructure can still encounter filtering and throttling.

## Availability

Mail is store-and-forward, which gives you some resilience, but long outages eventually exhaust remote retry windows. Monitor queues and make sure DNS and certificates are not single-person maintenance tasks.

## Reference material

- [RFC 5321 — SMTP](https://www.rfc-editor.org/rfc/rfc5321)
- [RFC 5598 — Internet Mail Architecture](https://www.rfc-editor.org/rfc/rfc5598)
- [NIST SP 800-177 Rev. 1 — Trustworthy Email](https://csrc.nist.gov/pubs/sp/800/177/r1/final)
