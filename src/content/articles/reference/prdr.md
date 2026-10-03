---
title: Per-recipient SMTP responses after DATA
description: Why multi-recipient messages can be awkward when a server wants different final outcomes per recipient.
section: Reference
tags: [SMTP, Recipients, Protocol]
---

Traditional SMTP produces one final response to DATA for a transaction even when the message has multiple recipients.

That can make recipient-specific content or policy decisions difficult at the final stage.

Some systems solve this operationally by splitting recipients into separate transactions. Extensions and implementation-specific behavior can also affect handling.

When investigating a multi-recipient failure, determine whether recipients shared one SMTP transaction or were delivered separately.

## Reference material

- [RFC 5321 — SMTP mail transactions](https://www.rfc-editor.org/rfc/rfc5321)
