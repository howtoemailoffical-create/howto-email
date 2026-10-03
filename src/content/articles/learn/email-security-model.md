---
title: A practical email security model
description: The identity, transport, content, account and human layers of email security.
section: Learn
tags: [Security, Architecture]
---

Email security is layered. SPF, DKIM and DMARC address domain identity. TLS protects transport. Gateways and mailbox controls inspect malicious content and behavior. Strong account authentication reduces takeover. Users still face social engineering.

Passing DMARC does not make a message safe; it means the receiver could authenticate an aligned identity under DMARC's rules. Security decisions still require content, reputation and behavioral signals.
