---
title: Trace a message in Exchange Online
description: Use Microsoft 365 message trace to determine what Exchange Online did with a message.
section: Do
tags: [Microsoft 365, Exchange Online, Troubleshooting]
---

Message trace is one of the first places to look when you need to know whether Exchange Online received, rejected, deferred or delivered a message.

## Start narrow

Use the sender, recipient and a useful time window. If you have message identifiers from headers or another system, keep them available for correlation.

## Read events, not just final status

A delivered status does not necessarily mean the message landed in the Inbox. Trace details can show processing events and policy actions. Microsoft notes that spam-filtered mail can still appear as delivered when it was placed in Junk or quarantine.

Mail-flow rules and DLP actions can also appear in trace details.

## Correlate outward

If a third-party gateway sits before or after Microsoft 365, message trace only tells you Microsoft's part of the story. Match timestamps and identifiers with the other system.

## Reference material

- [Microsoft — Trace an email message in Exchange Online](https://learn.microsoft.com/en-us/exchange/monitoring/trace-an-email-message/trace-an-email-message)
- [Microsoft — Message Trace FAQ](https://learn.microsoft.com/en-us/exchange/monitoring/trace-an-email-message/message-trace-faq)
