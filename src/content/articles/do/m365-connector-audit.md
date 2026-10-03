---
title: Audit Exchange Online connectors
description: Find stale partner, gateway and application routing dependencies.
section: Do
tags: [Microsoft 365, Connectors, Audit]
---

Inventory inbound and outbound connectors and record:

- direction;
- purpose;
- owner;
- domains;
- source/destination IPs;
- certificate/TLS restrictions;
- smart hosts;
- validation status.

Compare each connector with current mail-flow diagrams and DNS.

A connector left behind after a gateway migration can create a hidden dependency or unexpected trust path.

Test before deleting. Old applications and partners often reveal themselves only when the supposedly unused connector disappears.

## Reference material

- [Microsoft — Connectors for mail flow](https://learn.microsoft.com/en-us/exchange/mail-flow-best-practices/use-connectors-to-configure-mail-flow/use-connectors-to-configure-mail-flow)
