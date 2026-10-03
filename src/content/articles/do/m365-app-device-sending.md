---
title: Microsoft 365 application and device sending
description: Choose among authenticated submission, SMTP relay and direct-send style paths based on the requirement.
section: Do
tags: [Microsoft 365, SMTP, Applications]
---

Microsoft documents several ways for devices and line-of-business applications to send through or to Microsoft 365.

The important question is not "what SMTP server do I type in?" It is whether the application must send externally, how it authenticates, whether it has a stable public IP, and which Microsoft service is intended for the workload.

## SMTP AUTH

Authenticated client submission is typically associated with port 587 and can use OAuth. Microsoft recommends disabling SMTP AUTH broadly when it is not required and enabling it only where needed.

## SMTP relay

A connector-based relay can identify authorized infrastructure such as a known public IP and can relay to external recipients under Microsoft's documented conditions.

## Direct Send

Microsoft also documents a direct-send pattern for delivery to recipients in your Microsoft 365 organization. It is not a general Internet relay.

Microsoft's supported methods and limits evolve, so verify the current product documentation before choosing an architecture.

## Reference material

- [Microsoft — Set up a multifunction device or application to send email](https://learn.microsoft.com/en-us/exchange/mail-flow-best-practices/how-to-set-up-a-multifunction-device-or-application-to-send-email-using-microsoft-365-or-office-365)
- [Microsoft — Enable or disable SMTP AUTH](https://learn.microsoft.com/en-us/exchange/clients-and-mobile-in-exchange-online/authenticated-client-smtp-submission)
