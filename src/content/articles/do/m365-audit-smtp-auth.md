---
title: Audit SMTP AUTH use in Exchange Online
description: Find applications and accounts still using authenticated SMTP before tightening policy.
section: Do
tags: [Microsoft 365, SMTP, Security]
---

Before disabling SMTP AUTH tenant-wide, identify legitimate dependencies.

Microsoft exposes an SMTP AUTH Clients report in the Exchange admin center that can help identify accounts using the protocol and show related TLS usage.

For each dependency, record the application owner, account, source, authentication method, recipients and replacement plan.

## Reduce the exception set

If SMTP AUTH remains necessary, prefer a narrow per-mailbox exception instead of enabling it everywhere. Protect the identity and migrate legacy password-based integrations where supported.

## Reference material

- [Microsoft — SMTP AUTH Clients report](https://learn.microsoft.com/en-us/exchange/monitoring/mail-flow-reports/mfr-smtp-auth-clients-report)
- [Microsoft — Enable or disable SMTP AUTH](https://learn.microsoft.com/en-us/exchange/clients-and-mobile-in-exchange-online/authenticated-client-smtp-submission)
