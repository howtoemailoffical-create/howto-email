---
title: MTA-STS
description: A policy mechanism for requiring authenticated TLS when other mail servers deliver to your MX hosts.
section: Reference
tags: [MTA-STS, TLS, SMTP]
---

SMTP normally attempts TLS opportunistically. MTA-STS lets a receiving domain publish a policy telling supporting senders to require valid TLS and deliver only to expected MX hosts.

It uses two pieces:

1. A DNS TXT record under `_mta-sts` that signals the current policy ID.
2. An HTTPS policy hosted at `mta-sts.example.com/.well-known/mta-sts.txt`.

## Modes

A policy can be `none`, `testing` or `enforce`. Testing is useful before enforcement because a bad MX pattern, certificate problem or unavailable policy host can otherwise become a delivery problem.

TLS-RPT pairs well with MTA-STS by providing aggregate reports about transport failures.

## Reference material

- [RFC 8461 — SMTP MTA Strict Transport Security (MTA-STS)](https://www.rfc-editor.org/rfc/rfc8461)
- [RFC 8460 — SMTP TLS Reporting](https://www.rfc-editor.org/rfc/rfc8460)
