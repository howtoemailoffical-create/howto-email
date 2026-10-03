---
title: Internet mail architecture roles
description: The standard vocabulary for authors, MUAs, MSAs, MTAs, MDAs and related actors.
section: Reference
tags: [Architecture, Standards]
---

Email gets easier to discuss when each system has a role instead of everything being called "the mail server."

Common architectural roles include:

- **MUA** — Mail User Agent used by a person.
- **MSA** — Message Submission Agent accepting submitted mail.
- **MTA** — Mail Transfer Agent moving messages toward destinations.
- **MDA** — Mail Delivery Agent performing final delivery into a message store.

Real products can perform several roles at once.

This vocabulary is especially useful when explaining where authentication, routing or message modification occurs.

## Reference material

- [RFC 5598 — Internet Mail Architecture](https://www.rfc-editor.org/rfc/rfc5598)
