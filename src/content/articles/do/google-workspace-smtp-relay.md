---
title: Google Workspace SMTP relay planning
description: Plan application relay around allowed senders, source authorization and current Workspace settings.
section: Do
tags: [Google Workspace, SMTP, Applications]
---

Google Workspace provides an SMTP relay service intended for organizational applications and devices.

Before configuring it, define which systems may connect, which sender identities they may use, and whether authorization is based on configured source IPs, SMTP authentication, or the currently supported options for your Workspace environment.

## Keep the trust narrow

If a relay trusts source IPs, authorize only the actual egress addresses. If applications share a NAT address, understand that network trust can cover more than one host.

Verify SPF/DKIM/DMARC behavior on delivered messages after the relay is live.

Google changes administration screens and authentication requirements over time, so use the current Workspace Admin documentation during implementation.

## Reference material

- [Google — Route outgoing SMTP relay messages through Google](https://support.google.com/a/answer/2956491)
- [Google — Send email from a printer, scanner, or app](https://support.google.com/a/answer/176600)
