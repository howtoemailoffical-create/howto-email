---
title: Investigate a 550 5.7.1 rejection
description: A practical workflow for one of the most common but least specific SMTP errors.
section: Do
tags: [SMTP, Troubleshooting, Deliverability]
---

A `550 5.7.1` generally points toward a policy or security rejection, but the diagnostic text is what makes the case actionable.

## Capture the evidence

Keep the complete response, remote hostname, sender, recipient, sending IP, timestamp and queue/message ID.

## Then classify it

Look for wording related to:

- authentication or DMARC;
- relay authorization;
- spam or reputation;
- tenant or organizational policy;
- prohibited content;
- blocklists;
- sender restrictions.

Do not immediately change SPF or ask for a blocklist removal just because the code contains 5.7.1.

## Reference material

- [RFC 3463 — Enhanced status codes](https://www.rfc-editor.org/rfc/rfc3463)
- [IANA — SMTP Enhanced Status Codes](https://www.iana.org/assignments/smtp-enhanced-status-codes/smtp-enhanced-status-codes.xhtml)
