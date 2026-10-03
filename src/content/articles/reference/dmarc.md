---
title: DMARC
description: DMARC connects the visible From domain to SPF or DKIM authentication and adds policy and reporting.
section: Reference
tags: [DMARC, SPF, DKIM, Authentication]
---

DMARC builds on SPF and DKIM. Its key contribution is **alignment**: the authenticated identity has to relate to the domain in the visible `From:` header.

A message passes DMARC when at least one supported path passes **and aligns**:

- SPF passes and the SPF-authenticated domain aligns with From, or
- DKIM passes and the DKIM `d=` domain aligns with From.

## A basic record

```text
_dmarc.example.com. IN TXT "v=DMARC1; p=none; rua=mailto:dmarc@example.com"
```

Policies are `none`, `quarantine` and `reject`. Moving to enforcement should come after identifying legitimate senders and fixing alignment.

## Reporting

Aggregate reports sent through `rua` are useful for finding systems that use your domain. They show authentication observations grouped by sending source. They are telemetry—not automatically a list of attackers.

## DMARC is not a spam filter

A malicious message can be fully authenticated. DMARC is primarily a domain-identity control against unauthorized use of the protected From domain. Content filtering, account security, reputation and user protections still matter.

## Reference material

- [RFC 7489 — DMARC](https://www.rfc-editor.org/rfc/rfc7489)
- [Microsoft — Set up DMARC in Microsoft 365](https://learn.microsoft.com/en-us/defender-office-365/email-authentication-dmarc-configure)
- [Google — Email sender guidelines](https://support.google.com/a/answer/81126)
