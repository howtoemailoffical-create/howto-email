---
title: Why MX targets should not be CNAME aliases
description: Mail exchanger targets are expected to resolve directly to address records.
section: Reference
tags: [DNS, MX, CNAME]
---

The hostname named by an MX record should resolve to address records rather than being an alias through CNAME.

Mail routing has specific DNS processing rules, and using aliases as exchanger targets creates interoperability problems.

If a provider gives you an MX hostname, publish that exact hostname in the MX record unless the provider documents otherwise.

## Reference material

- [RFC 5321 — Mail routing](https://www.rfc-editor.org/rfc/rfc5321)
- [RFC 2181 — Clarifications to the DNS Specification](https://www.rfc-editor.org/rfc/rfc2181)
