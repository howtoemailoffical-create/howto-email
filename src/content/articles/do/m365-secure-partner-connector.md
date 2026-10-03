---
title: Secure partner mail flow in Exchange Online
description: Use connectors deliberately when a partner path needs stronger transport or source restrictions.
section: Do
tags: [Microsoft 365, TLS, Connectors]
---

Normal Internet mail does not require a custom Exchange Online connector for every partner.

A partner connector becomes useful when you need explicit restrictions, such as requiring TLS or constraining the domains or IP ranges accepted from a known partner path.

## Design before clicking

Document the expected direction, partner domains, source infrastructure, TLS identity and failure behavior.

If a message does not satisfy enforced connector restrictions, delivery can fail. Test both expected mail and mail that should be rejected.

## Reference material

- [Microsoft — Set up connectors for secure mail flow with a partner](https://learn.microsoft.com/en-us/exchange/mail-flow-best-practices/use-connectors-to-configure-mail-flow/set-up-connectors-for-secure-mail-flow-with-a-partner)
