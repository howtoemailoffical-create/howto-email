---
title: Abuse Reporting Format
description: The standardized MIME format used for certain email abuse feedback reports.
section: Reference
tags: [Abuse, Reporting, MIME]
---

The Abuse Reporting Format (ARF) defines a machine-readable MIME structure for reporting email abuse.

An ARF message can carry a human-readable section, a structured `message/feedback-report` part, and information about the original message.

Software can use the structured fields to automate complaint processing more reliably than scraping prose from an abuse mailbox.

## Reference material

- [RFC 5965 — An Extensible Format for Email Feedback Reports](https://www.rfc-editor.org/rfc/rfc5965)
