---
title: Plan MX redundancy
description: Add secondary mail exchangers only when they are equally secured and operationally understood.
section: Do
tags: [MX, High Availability, Architecture]
---

Multiple MX records can provide alternate delivery targets, but every advertised exchanger becomes part of your inbound security boundary.

A secondary MX should enforce appropriate recipient validation, filtering, TLS and relay policy. An intentionally weak backup MX can become the easiest route for abuse.

Test failover by making the preferred path unavailable in a controlled environment and observing remote retry/routing behavior.

Do not assume a second MX is required for every hosted mail service; follow the provider architecture.

## Reference material

- [RFC 5321 — MX routing](https://www.rfc-editor.org/rfc/rfc5321)
- [NIST SP 800-177 Rev. 1](https://csrc.nist.gov/pubs/sp/800/177/r1/final)
