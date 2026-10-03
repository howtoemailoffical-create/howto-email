---
title: DKIM
description: DomainKeys Identified Mail uses cryptographic signatures to authenticate a domain and message content.
section: Reference
tags: [DKIM, DNS, Authentication]
---

DKIM lets a sending system cryptographically sign selected parts of a message. The receiver retrieves the public key from DNS and verifies the signature.

A DKIM signature does **not** mean the message is safe. It proves that the signed content validates against a key published for the signing domain.

## The two identifiers to know

Inside `DKIM-Signature`:

- `d=` identifies the signing domain.
- `s=` identifies the selector.

Together they tell the receiver where to find the public key:

```text
selector._domainkey.example.com
```

Selectors let a domain use multiple keys and rotate keys without replacing every sender at once.

## What is signed

DKIM can sign selected headers plus the message body. The signature contains a body hash and lists the signed headers. Canonicalization rules allow limited formatting differences while still detecting meaningful changes.

Intermediaries that modify signed content can break DKIM. Mailing lists, gateways and footers are common places to investigate when a signature unexpectedly fails.

## DKIM and DMARC

DMARC can use a passing DKIM signature when the DKIM signing domain aligns with the visible From domain. A provider signing only with its own unrelated domain can produce a valid DKIM result without producing DMARC-aligned DKIM for your domain.

## Reference material

- [RFC 6376 — DomainKeys Identified Mail (DKIM) Signatures](https://www.rfc-editor.org/rfc/rfc6376)
- [Microsoft — Configure DKIM for Microsoft 365](https://learn.microsoft.com/en-us/defender-office-365/email-authentication-dkim-configure)
- [Google — Email sender guidelines](https://support.google.com/a/answer/81126)
