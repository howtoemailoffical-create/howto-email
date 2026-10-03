---
title: ARC
description: Authenticated Received Chain preserves authentication observations through intermediaries.
section: Reference
tags: [ARC, Authentication, Forwarding]
---

ARC exists for a problem that shows up constantly in real mail flow: a legitimate intermediary changes the message or its delivery path, and authentication that worked earlier no longer works at the final receiver.

An ARC-aware intermediary records authentication results and adds cryptographic seals. The next receiver can evaluate that chain and decide whether it trusts the ARC sealer.

## What ARC does not do

ARC does not replace SPF, DKIM or DMARC, and an ARC chain is not automatically trusted because it validates cryptographically. The final receiver still decides whether the intermediary is trustworthy.

This is particularly relevant with forwarding services, mailing lists and security gateways that modify messages.

## Microsoft 365 example

Microsoft 365 supports configuring trusted ARC sealers for intermediaries that legitimately modify inbound messages. This is a trust decision and should be limited to services you actually use and trust.

## Reference material

- [RFC 8617 — The Authenticated Received Chain (ARC) Protocol](https://www.rfc-editor.org/rfc/rfc8617)
- [Microsoft — Configure trusted ARC sealers](https://learn.microsoft.com/en-us/defender-office-365/email-authentication-arc-configure)
