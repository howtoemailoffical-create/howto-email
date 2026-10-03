---
title: Email authentication
description: How SPF, DKIM and DMARC work together without pretending they solve the same problem.
section: Learn
tags: [SPF, DKIM, DMARC, Security]
---

SPF, DKIM and DMARC get grouped together so often that it is easy to treat them like three versions of the same control. They are not.

**SPF** checks whether a connecting source is authorized for an SMTP domain. **DKIM** verifies a cryptographic signature associated with a signing domain. **DMARC** asks whether a passing SPF or DKIM identity aligns with the domain people actually see in the From header.

## One message, several identities

Imagine a service sends:

```text
From: Billing <billing@example.com>
Return-Path: bounce@mailer.vendor.example
DKIM-Signature: ... d=example.com; s=mail1; ...
```

SPF might pass for `mailer.vendor.example` but not align with `example.com`. DKIM can still give DMARC a passing path if the `example.com` signature validates.

That is why checking only for `spf=pass` is not enough when you are troubleshooting DMARC.

## Where forwarding gets messy

A forwarder becomes the new SMTP source, which commonly breaks SPF for the original envelope domain. DKIM can survive forwarding as long as the signed content is not changed. ARC and SRS can help intermediaries with different pieces of the forwarding problem.

## Authentication is identity, not intent

An attacker using a compromised legitimate mailbox may send messages that authenticate perfectly. Treat authentication as an important identity signal, not proof that a message is trustworthy.

## Reference material

- [RFC 7208 — SPF](https://www.rfc-editor.org/rfc/rfc7208)
- [RFC 6376 — DKIM](https://www.rfc-editor.org/rfc/rfc6376)
- [RFC 7489 — DMARC](https://www.rfc-editor.org/rfc/rfc7489)
- [Microsoft — How email authentication works in Microsoft 365](https://learn.microsoft.com/en-us/defender-office-365/email-authentication-about)
