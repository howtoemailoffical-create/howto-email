---
title: Respond to suspected business email compromise
description: Contain the account and business process, not just the malicious message.
section: Do
tags: [BEC, Incident Response, Security]
---

If a message may have triggered a fraudulent payment or sensitive-data transfer, involve the organization's incident and financial response process immediately.

## Email and identity containment

For a compromised internal account, revoke active sessions/tokens where supported, reset credentials, enforce strong MFA, and inspect sign-in history, mailbox rules, forwarding, delegates and OAuth grants.

## Determine scope

Identify messages sent by the attacker, recipients, deleted or hidden mail, altered payment conversations and other accounts contacted.

## Business containment

If payment instructions changed, use a known-good out-of-band contact method to verify the request. Do not rely on phone numbers or reply addresses supplied in the suspicious thread.

## Reference material

- [CISA — Recognize and Report Phishing](https://www.cisa.gov/secure-our-world/recognize-and-report-phishing)
- [NIST — Phishing guidance](https://www.nist.gov/itl/smallbusinesscyber/guidance-topic/phishing)
