---
title: TXT records in email
description: Why so many email controls use DNS TXT and why record boundaries still matter.
section: Reference
tags: [DNS, TXT, Authentication]
---

SPF, DMARC, verification tokens and several email-related mechanisms publish data through DNS TXT records.

TXT is a container. The meaning comes from the protocol querying a particular DNS name and interpreting the returned text.

## Do not merge unrelated protocols

An SPF policy at a domain and a verification token at the same name are separate TXT records. A DMARC policy belongs under `_dmarc`. DKIM public keys normally live under a selector-specific `_domainkey` name.

DNS interfaces can display long TXT data as multiple quoted character strings. DNS software concatenates the character strings within a single TXT resource record for protocol use.

## Reference material

- [RFC 1035 — TXT resource record](https://www.rfc-editor.org/rfc/rfc1035)
- [RFC 7208 — SPF](https://www.rfc-editor.org/rfc/rfc7208)
- [RFC 9989 — DMARC](https://www.rfc-editor.org/rfc/rfc9989)
