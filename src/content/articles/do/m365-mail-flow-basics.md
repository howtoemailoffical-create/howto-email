---
title: Microsoft 365 mail flow checklist
description: Review the major mail-flow and authentication pieces around Exchange Online.
section: Do
tags: [Microsoft 365, Exchange Online, Operations]
---

Microsoft 365 can look simple from the mailbox side while the actual mail path includes third-party gateways, connectors, SaaS senders, applications and on-premises infrastructure.

Start by drawing the real path.

## Inventory

Document:

- accepted and sending domains;
- inbound and outbound connectors;
- third-party security gateways;
- SMTP relay and application paths;
- transport/mail-flow rules that modify messages;
- every service sending as one of your domains.

## Authentication

For each outbound path, verify **real received messages**, not just DNS:

1. Which domain SPF evaluated.
2. Which DKIM `d=` domain signed.
3. Whether either identity aligns with the visible From domain.
4. The resulting DMARC evaluation.

Microsoft recommends SPF, DKIM and DMARC together for custom sending domains. Intermediaries that modify inbound mail can also affect authentication, which is where trusted ARC sealers may become relevant.

## Troubleshooting rule

Always identify which system made the decision. Exchange Online, a third-party gateway and a SaaS sender can all add headers or reject mail for different reasons.

## Reference material

- [Microsoft — Email authentication in Microsoft 365](https://learn.microsoft.com/en-us/defender-office-365/email-authentication-about)
- [Microsoft — Configure SPF](https://learn.microsoft.com/en-us/defender-office-365/email-authentication-spf-configure)
- [Microsoft — Configure DKIM](https://learn.microsoft.com/en-us/defender-office-365/email-authentication-dkim-configure)
- [Microsoft — Configure DMARC](https://learn.microsoft.com/en-us/defender-office-365/email-authentication-dmarc-configure)
- [Microsoft — Configure trusted ARC sealers](https://learn.microsoft.com/en-us/defender-office-365/email-authentication-arc-configure)
