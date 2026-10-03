---
title: Separate transactional and marketing mail
description: Design sending identities so one traffic class does not dominate another.
section: Do
tags: [Deliverability, Architecture]
---

Define traffic classes by business purpose and risk. Consider separate subdomains, provider configurations, DKIM selectors and—at sufficient scale—IP pools.

Keep branding understandable while making operational ownership and reputation easier to observe. Separation does not excuse poor list practices; each stream still needs correct authentication and recipient hygiene.
