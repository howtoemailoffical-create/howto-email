---
title: DMARC
description: DMARC connects the visible From domain to SPF or DKIM authentication and adds policy and reporting.
section: Reference
tags: [DMARC, SPF, DKIM, Authentication]
---

**Standards status — RFC 7489 is obsolete.** The current DMARC specifications are [RFC 9989 (protocol)](https://www.rfc-editor.org/rfc/rfc9989), [RFC 9990 (aggregate reporting)](https://www.rfc-editor.org/rfc/rfc9990), and [RFC 9991 (failure reporting)](https://www.rfc-editor.org/rfc/rfc9991). See [DMARC standards status](/reference/dmarc-current-standard/) for more context.

**Earlier updates to RFC 7489:** [RFC 8553](https://www.rfc-editor.org/rfc/rfc8553) and [RFC 8616](https://www.rfc-editor.org/rfc/rfc8616). These updates are historical and do not supersede the current specifications.

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

- [RFC 9989 — DMARC protocol specification (current)](https://www.rfc-editor.org/rfc/rfc9989)
- [RFC 9990 — DMARC aggregate reporting](https://www.rfc-editor.org/rfc/rfc9990)
- [RFC 9991 — DMARC failure reporting](https://www.rfc-editor.org/rfc/rfc9991)
- [RFC 7489 — Original DMARC specification (obsolete)](https://www.rfc-editor.org/rfc/rfc7489)
- [Microsoft — Set up DMARC in Microsoft 365](https://learn.microsoft.com/en-us/defender-office-365/email-authentication-dmarc-configure)
- [Google — Email sender guidelines](https://support.google.com/a/answer/81126)
