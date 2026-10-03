---
title: Build a postmaster runbook
description: Give operations a repeatable first response for delayed, rejected and suspicious mail.
section: Do
tags: [Operations, Runbook, Troubleshooting]
---

A useful postmaster runbook starts with evidence collection.

Record:

- sender/recipient;
- exact time and timezone;
- Message-ID/queue ID;
- full SMTP response;
- source/destination systems;
- raw headers where delivered.

Then branch by symptom: rejection, delay, missing message, authentication failure, TLS problem, suspected abuse or mailbox/client issue.

Include where logs live, who owns DNS/gateways/providers and the escalation path.

Avoid documenting passwords or sensitive secrets in the runbook.

## Reference material

- [RFC 5321 — SMTP](https://www.rfc-editor.org/rfc/rfc5321)
- [NIST SP 800-61 Rev. 2](https://csrc.nist.gov/pubs/sp/800/61/r2/final)
