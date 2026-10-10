---
title: Email authentication explained
description: Understand how SPF, DKIM and DMARC work together, why alignment matters, and how to troubleshoot authentication failures.
section: Learn
tags: [SPF, DKIM, DMARC, Security]
---

Email authentication helps receiving systems evaluate whether a message is associated with the domains it claims to use. The three core mechanisms answer different questions:

- **SPF** evaluates whether the connecting mail server is authorized to send for the SMTP envelope domain (or HELO identity in certain cases).
- **DKIM** checks a cryptographic signature attached to the message and identifies the signing domain.
- **DMARC** evaluates whether SPF or DKIM passes **and** aligns with the domain in the visible `From:` header. It also provides policy and reporting mechanisms.

A message can pass SPF and still fail DMARC. A message can also pass DMARC with DKIM alone, even when SPF fails.

## Follow the identities through a message

Consider this simplified example:

```text
From: Billing <billing@example.com>
Return-Path: <bounce@mailer.vendor.example>
DKIM-Signature: v=1; d=example.com; s=mail1; ...
Authentication-Results: mx.receiver.example;
  spf=pass smtp.mailfrom=mailer.vendor.example;
  dkim=pass header.d=example.com;
  dmarc=pass header.from=example.com
```

The SPF result applies to `mailer.vendor.example`, which does not align with the visible `example.com` From domain. However, the passing DKIM signature uses `example.com`, so DKIM provides an aligned authentication path for DMARC.

These `Authentication-Results` values are **claims inserted by a receiving system**. Do not assume a pasted header proves the checks occurred: untrusted headers can be forged. When investigating, identify the authentication results added by infrastructure you trust.

## What alignment means

DMARC checks the organizational relationship between the visible From domain and the authenticated SPF or DKIM domain.

- **Relaxed alignment:** Subdomains of the same organizational domain can align, subject to DMARC's domain rules.
- **Strict alignment:** The authenticated domain must match the From domain exactly.
- **DMARC pass:** At least one supported authentication mechanism passes and aligns. Both do not have to pass.

A simple string comparison is not sufficient to implement the full organizational-domain rules, particularly with public suffixes.

## Why forwarding and mailing lists cause trouble

When a message is forwarded, the forwarder may become the connecting SMTP host. SPF for the original sender can therefore fail. DKIM may survive if the signed headers and body are not modified, but mailing-list footers or subject rewriting can break signatures.

**SRS** helps forwarders rewrite the envelope sender for SPF handling; it does not automatically make the original visible From domain align. **ARC** preserves authentication assessments across intermediaries, but receivers decide how much to trust an ARC chain. Neither is a universal DMARC bypass.

## Troubleshooting checklist

1. Obtain the full headers from the receiving mailbox, not just a screenshot of the visible sender.
2. Identify the receiver's trusted `Authentication-Results` entry.
3. Record `smtp.mailfrom`, `header.d`, and `header.from`.
4. Check which mechanism passed and whether that identity aligns with the visible From domain.
5. Inspect the sending service's SPF authorization and DKIM signing configuration.
6. If forwarding or a gateway is involved, compare the message before and after that hop.
7. After making DNS or configuration changes, send a new test message and inspect its results.

Use the [Email Header Analyzer](/tools/header-analyzer) to organize reported results and delivery hops, or the [Domain Analyzer](/tools/domain-analyzer) to inspect published DNS records. Neither tool alone proves that a message is legitimate.

## Authentication is not a safety verdict

A compromised legitimate mailbox can send phishing messages that pass SPF, DKIM and DMARC. Authentication is a useful domain-identity signal, not proof of sender intent or message safety.

## Further reading

- [SPF reference](/reference/spf)
- [DKIM reference](/reference/dkim)
- [DMARC reference](/reference/dmarc)
- [Analyze an email header](/do/read-headers)
- [RFC 7208 — SPF](https://www.rfc-editor.org/rfc/rfc7208)
- [RFC 6376 — DKIM](https://www.rfc-editor.org/rfc/rfc6376)
- [DMARC standards status](/reference/dmarc-current-standard)
