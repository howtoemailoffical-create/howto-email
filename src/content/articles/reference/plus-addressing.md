---
title: Plus addressing
description: Using a tag in the local part of an address for routing or organization.
section: Reference
tags: [Addressing, Mailbox, Applications]
---

Some mail systems support tagged addresses such as:

```text
alice+receipts@example.com
```

The receiving system can deliver that address to Alice while exposing the tag for filtering or application use.

Plus addressing is common but should not be assumed to work identically on every provider or application. Some websites incorrectly reject valid address syntax or normalize addresses in their own way.

Do not use plus tags as an authentication secret.

## Reference material

- [RFC 5233 — Sieve Email Filtering: Subaddress Extension](https://www.rfc-editor.org/rfc/rfc5233)
- [RFC 5321 — Mailbox syntax](https://www.rfc-editor.org/rfc/rfc5321)
