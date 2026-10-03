---
title: Analyze a DMARC aggregate report
description: Turn a DMARC XML report into an actionable sender inventory check.
section: Do
tags: [DMARC, Reporting, Troubleshooting]
---

Do not start by labeling every failing IP malicious.

## 1. Identify the reporter and period

Confirm which receiver produced the report and the time window it covers.

## 2. Group by source

For each source IP, note message count, SPF result, DKIM result and disposition.

## 3. Check identifiers

Determine which SPF domain and DKIM signing domains were evaluated and whether they align with the From domain.

## 4. Match your inventory

Tie each source to a known mail platform, application, forwarder or third party. Unknown sources deserve investigation; known sources with failures need configuration work.

## 5. Look at trends

One report is a sample. Changes across several days are much more useful when deciding whether a sender is legitimate and stable enough for DMARC enforcement.

## Reference material

- [RFC 9989 — DMARC](https://www.rfc-editor.org/rfc/rfc9989)
