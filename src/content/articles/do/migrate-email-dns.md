---
title: Email DNS migration runbook
description: Change MX and authentication records without treating DNS as a single cutover switch.
section: Do
tags: [Migration, DNS, MX]
---

Inventory every record involved before the change: MX, SPF, DKIM selectors, DMARC, verification records, tracking domains, MTA-STS/TLS-RPT and any application-specific names.

## Before

Lower TTLs where faster convergence is useful, but do it early enough for old cached TTLs to expire.

Build and test the new service before moving production MX where the platform allows it.

## During

Change only the records required for the planned stage. Query authoritative DNS after each change and watch both old and new mail systems.

## After

Keep the old service available long enough to catch cached routing and forgotten applications. Remove obsolete SPF authorization and selectors only after proving they are no longer used.

## Reference material

- [RFC 1034 — DNS Concepts](https://www.rfc-editor.org/rfc/rfc1034)
- [RFC 5321 — SMTP routing](https://www.rfc-editor.org/rfc/rfc5321)
