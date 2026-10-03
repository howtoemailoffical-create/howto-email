---
title: Email security gateway migration checklist
description: Move between gateways without losing routing, authentication, DLP or visibility.
section: Do
tags: [Gateway, Migration, Security]
---

A gateway migration touches more than MX records.

## Inventory first

Document inbound and outbound routes, connectors, NAT/source IPs, TLS requirements, certificates, DLP rules, allow/block policy, encryption, disclaimers, quarantine workflows, journaling, APIs and SIEM integrations.

## Authentication impact

Determine where DKIM signing happens and whether either gateway modifies signed mail. Update SPF only for systems that actually become outbound SMTP sources.

## Cutover

Stage DNS and connector changes, test inbound and outbound paths, preserve rollback, and monitor queues and rejections during the transition.

## After cutover

Remove old relay authorization and DNS records only after proving no application or partner still depends on them.

## Reference material

- [NIST SP 800-177 Rev. 1 — Trustworthy Email](https://csrc.nist.gov/pubs/sp/800/177/r1/final)
- [RFC 5321 — SMTP](https://www.rfc-editor.org/rfc/rfc5321)
