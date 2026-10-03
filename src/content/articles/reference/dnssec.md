---
title: DNSSEC
description: DNSSEC authenticates DNS data and provides the trust foundation used by DANE.
section: Reference
tags: [DNSSEC, DNS, Security]
---

DNSSEC adds cryptographic authenticity and integrity to DNS data. It helps a validating resolver determine that an answer came from the expected signed zone and was not modified in transit.

It does **not** encrypt DNS traffic.

## Why email operators care

DANE for SMTP relies on DNSSEC-authenticated TLSA records. DNSSEC also changes DNS operations: key management, DS records at the parent, signatures and validation all become part of availability.

A broken chain of trust can make a signed domain's data fail validation even when a non-validating lookup appears normal.

## Reference material

- [RFC 4033 — DNS Security Introduction and Requirements](https://www.rfc-editor.org/rfc/rfc4033)
- [RFC 4034 — Resource Records for DNS Security Extensions](https://www.rfc-editor.org/rfc/rfc4034)
- [RFC 4035 — Protocol Modifications for DNS Security Extensions](https://www.rfc-editor.org/rfc/rfc4035)
