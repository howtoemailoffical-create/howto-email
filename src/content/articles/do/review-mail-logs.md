---
title: Review SMTP logs efficiently
description: Use identifiers and transaction boundaries instead of searching giant logs by subject line.
section: Do
tags: [Logging, SMTP, Troubleshooting]
---

Start with the strongest identifiers you have: queue ID, message trace ID, Message-ID, sender, recipient and a tight timestamp range.

## Follow the transaction

For an SMTP session, correlate connection information with `MAIL FROM`, `RCPT TO`, DATA acceptance and the final remote response.

For queued mail, follow the local queue identifier through later delivery attempts.

## Keep identities separate

The envelope sender, visible From and authenticated account may be different. Record which one your log field represents.

## Time zones

Normalize timestamps when correlating cloud services, gateways and on-premises systems. A one-hour offset can waste more time than the actual mail problem.

## Reference material

- [RFC 5321 — SMTP](https://www.rfc-editor.org/rfc/rfc5321)
- [RFC 5424 — Syslog Protocol](https://www.rfc-editor.org/rfc/rfc5424)
