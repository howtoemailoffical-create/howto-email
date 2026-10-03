---
title: DMARC fails even though SPF passes
description: Check alignment before assuming the receiver evaluated DMARC incorrectly.
section: Do
tags: [DMARC, SPF, Troubleshooting]
---

Find the SPF-authenticated domain in trusted Authentication-Results.

Then compare it with the domain in the visible From header.

Example:

```text
From: billing@example.com
Return-Path: bounce@vendor.example
spf=pass smtp.mailfrom=vendor.example
```

SPF can pass for `vendor.example` while failing DMARC alignment with `example.com`.

Check whether aligned DKIM provides the other DMARC pass path. If not, configure the sender for an aligned return path or DKIM identity according to the provider's supported design.

## Reference material

- [RFC 9989 — DMARC](https://www.rfc-editor.org/rfc/rfc9989)
- [RFC 7208 — SPF](https://www.rfc-editor.org/rfc/rfc7208)
