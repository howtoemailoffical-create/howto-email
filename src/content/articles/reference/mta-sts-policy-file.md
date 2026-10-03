---
title: MTA-STS policy file syntax
description: The HTTPS policy tells supporting senders which MX hosts are valid and whether enforcement is active.
section: Reference
tags: [MTA-STS, TLS, Reference]
---

An MTA-STS policy is served at:

```text
https://mta-sts.example.com/.well-known/mta-sts.txt
```

A policy contains fields such as version, mode, MX patterns and maximum age.

Conceptually:

```text
version: STSv1
mode: enforce
mx: mx1.example.com
max_age: 604800
```

The exact syntax and matching rules matter. Validate against RFC 8461 rather than treating it like arbitrary key/value configuration.

## Reference material

- [RFC 8461 — SMTP MTA Strict Transport Security](https://www.rfc-editor.org/rfc/rfc8461)
