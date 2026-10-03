---
title: Check a domain's email DNS
description: A repeatable workflow for MX, SPF, DKIM, DMARC and transport-policy checks.
section: Do
tags: [DNS, Troubleshooting]
---

Start with authoritative DNS and work outward.

## 1. Confirm delegation
Verify the expected authoritative nameservers.

## 2. Check inbound routing
Query MX and resolve every target.

## 3. Check sending identity
Inspect SPF at the envelope domain, DKIM at the active selector, and DMARC at `_dmarc`.

## 4. Check transport policy
Where deployed, verify MTA-STS, TLS-RPT, DNSSEC and TLSA records.

Record the resolver, timestamp and exact answer when diagnosing propagation.
