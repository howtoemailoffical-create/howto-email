---
title: Outbound email abuse controls
description: Protect sending infrastructure from becoming a spam source after an account or application is compromised.
section: Learn
tags: [Security, Abuse, SMTP]
---

Outbound filtering is not only a deliverability feature. It limits damage when a mailbox, API key or application is compromised.

Useful controls can include authentication, rate limits, anomaly detection, recipient limits, malware/content controls and rapid credential revocation.

## Baselines matter

A payroll application sending 200 messages at 9 AM behaves differently from a mailbox suddenly sending 20,000 messages overnight.

Build alerts around the expected use of each sending identity rather than one global number.

## Reference material

- [NIST SP 800-177 Rev. 1 — Trustworthy Email](https://csrc.nist.gov/pubs/sp/800/177/r1/final)
- [RFC 6409 — Message Submission](https://www.rfc-editor.org/rfc/rfc6409)
