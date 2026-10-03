---
title: Self-hosted mail readiness checklist
description: A preflight before exposing your own mail server to the Internet.
section: Do
tags: [Self-Hosted, SMTP, Operations]
---

Before publishing an Internet-facing mail service, verify the basics.

## DNS and identity

MX, A/AAAA, PTR/rDNS, SPF, DKIM and DMARC should reflect the actual design.

## Transport

Use maintained software, current TLS, valid certificates and deliberate relay controls. Confirm you are not an open relay.

## Abuse and accounts

Protect administrative and mailbox identities, rate-limit where appropriate, monitor outbound anomalies, and maintain working abuse/postmaster processes.

## Operations

Monitor queue age, disk/storage, DNS, certificates, block/reputation signals and service availability. Back up what cannot be recreated.

Have a patching and incident-response process before the first compromise rather than after it.

## Reference material

- [RFC 5321 — SMTP](https://www.rfc-editor.org/rfc/rfc5321)
- [RFC 5598 — Internet Mail Architecture](https://www.rfc-editor.org/rfc/rfc5598)
- [NIST SP 800-177 Rev. 1 — Trustworthy Email](https://csrc.nist.gov/pubs/sp/800/177/r1/final)
