---
title: Email quarantine
description: What quarantine means operationally and why release permissions matter.
section: Reference
tags: [Security, Gateway, Operations]
---

Quarantine holds a message away from normal delivery because a security or policy system wants review or delayed disposition.

Quarantine can contain spam, phishing, malware, DLP matches or administrative-policy hits.

## Release is a security action

Who can release a message matters. Allowing end users to release high-confidence malware is a different risk than letting them recover bulk mail.

Keep enough metadata to understand why the message was quarantined and which policy made the decision.

## Reference material

- [Microsoft — Quarantine email messages](https://learn.microsoft.com/en-us/defender-office-365/quarantine-email-messages)
- [NIST SP 800-177 Rev. 1](https://csrc.nist.gov/pubs/sp/800/177/r1/final)
