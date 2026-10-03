---
title: PTR and forward-confirmed reverse DNS
description: Why outbound mail operators commonly align reverse and forward DNS for sending hosts.
section: Reference
tags: [DNS, PTR, Deliverability]
---

Reverse DNS maps an IP address to a hostname using PTR records.

A common operational pattern is:

```text
192.0.2.25 -> mail.example.com
mail.example.com -> 192.0.2.25
```

The second lookup confirms the hostname maps back to the original address.

Receiving systems can use DNS identity as one signal. It does not replace SPF, DKIM or DMARC.

PTR records are normally controlled by the organization providing the IP address, not by the forward-DNS zone owner.

## Reference material

- [RFC 1912 — Common DNS Operational and Configuration Errors](https://www.rfc-editor.org/rfc/rfc1912)
- [Google — Email sender guidelines](https://support.google.com/mail/answer/81126)
