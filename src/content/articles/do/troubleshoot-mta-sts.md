---
title: Troubleshoot MTA-STS
description: Check the DNS signal, HTTPS policy, MX patterns and certificates as separate dependencies.
section: Do
tags: [MTA-STS, TLS, Troubleshooting]
---

MTA-STS has more than one moving part.

## DNS

Query `_mta-sts.example.com` and record the policy ID.

## HTTPS

Fetch:

```text
https://mta-sts.example.com/.well-known/mta-sts.txt
```

Confirm it is available over valid HTTPS and contains the expected mode, MX patterns and max age.

## SMTP endpoints

Make sure the real MX hosts match the policy and present certificates acceptable under the MTA-STS validation model.

## Reporting

If TLS-RPT is configured, use reports to identify which senders are seeing policy or certificate failures.

## Reference material

- [RFC 8461 — MTA-STS](https://www.rfc-editor.org/rfc/rfc8461)
- [RFC 8460 — TLS Reporting](https://www.rfc-editor.org/rfc/rfc8460)
