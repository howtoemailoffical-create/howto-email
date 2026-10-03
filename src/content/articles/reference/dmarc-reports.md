---
title: DMARC aggregate reports
description: How to read aggregate authentication telemetry without mistaking every failure for an attack.
section: Reference
tags: [DMARC, Reporting, Operations]
---

DMARC aggregate reports summarize how participating receivers evaluated mail using a domain.

A report can contain source IPs, message counts, policy disposition, SPF and DKIM outcomes, and identifiers used during evaluation.

## A failure is not automatically abuse

A failing source might be:

- an unauthorized sender;
- a legitimate SaaS platform with bad alignment;
- forwarded mail;
- a mailing list;
- old infrastructure nobody documented;
- a system using the domain unexpectedly.

The value comes from grouping and trending the data, then tying sources back to a sender inventory.

## Privacy and handling

Reports contain operational metadata. Route them to an appropriate mailbox or processing service and set retention/access based on your organization's needs.

## Reference material

- [RFC 9989 — DMARC](https://www.rfc-editor.org/rfc/rfc9989)
- [IANA — DMARC Parameters](https://www.iana.org/assignments/dmarc-parameters/dmarc-parameters.xhtml)
