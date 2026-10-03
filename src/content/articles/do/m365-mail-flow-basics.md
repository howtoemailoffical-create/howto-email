---
title: Microsoft 365 mail flow checklist
description: A vendor-specific checklist for reviewing Microsoft 365 domains, connectors and authentication.
section: Do
tags: [Microsoft 365, Operations]
---

Document accepted domains, inbound and outbound connectors, third-party gateways, application relay paths and any transport rules that materially alter messages.

Confirm DKIM signing for custom domains, SPF authorization for actual outbound paths and DMARC alignment using received-message evidence. When troubleshooting, distinguish Exchange Online behavior from upstream gateways and downstream SaaS senders.

Provider interfaces and limits change, so verify current Microsoft documentation before production changes.
