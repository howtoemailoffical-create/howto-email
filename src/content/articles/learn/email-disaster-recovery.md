---
title: Email disaster recovery
description: Plan for dependencies such as DNS, identity and routing—not only mailbox backups.
section: Learn
tags: [Disaster Recovery, Operations, Architecture]
---

Email recovery is broader than restoring mailbox data.

A service can be unavailable because of DNS, identity, certificates, gateways, connectors, provider outages, networking or administrative mistakes even when mailbox contents are intact.

## Define the service

Document recovery objectives for inbound delivery, outbound delivery, mailbox access, application relay, authentication and administrative control.

## Store-and-forward helps, but has limits

Remote MTAs normally retry temporary delivery failures, buying recovery time. That is not a substitute for a plan: retry periods are finite and critical outbound mail may still be unavailable.

## Reference material

- [NIST SP 800-34 Rev. 1 — Contingency Planning Guide](https://csrc.nist.gov/pubs/sp/800/34/r1/final)
- [RFC 5321 — SMTP queueing and retries](https://www.rfc-editor.org/rfc/rfc5321)
