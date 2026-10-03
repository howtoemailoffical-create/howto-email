---
title: Complaint feedback loops
description: How some mailbox providers return complaint information to eligible senders.
section: Reference
tags: [Deliverability, Complaints, Operations]
---

Some receiving providers operate feedback mechanisms that let qualified senders learn when recipients report messages as spam.

Implementations differ. A feedback loop might provide message-related data, aggregate information, or provider-specific dashboards.

## What to do with it

Complaint data should feed suppression and root-cause analysis. Look for the campaign, list source and process that produced unwanted mail.

Do not assume every provider offers the same feedback mechanism, and do not confuse a complaint feed with a universal reputation score.

## Reference material

- [RFC 5965 — An Extensible Format for Email Feedback Reports](https://www.rfc-editor.org/rfc/rfc5965)
- [RFC 6650 — Creation and Use of Email Feedback Reports](https://www.rfc-editor.org/rfc/rfc6650)
