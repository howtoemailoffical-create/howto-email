---
title: Respond to a compromised mailbox
description: Contain account takeover and investigate malicious email sent from a legitimate account.
section: Do
tags: [Incident Response, Security]
---

Contain the account using your identity platform: revoke active sessions or tokens where supported, reset credentials, enforce strong MFA and investigate suspicious authentication.

Review mailbox rules, forwarding, delegated access, OAuth grants and sent/deleted items. Determine what messages were sent, who received them and whether additional accounts were targeted.

Authentication controls such as DKIM may legitimately pass for attacker-sent mail from a compromised account, so incident response must focus on identity and mailbox telemetry too.
