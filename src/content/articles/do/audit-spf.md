---
title: Audit an SPF policy
description: Map every mechanism to a real sender and remove authorization that no longer has a purpose.
section: Do
tags: [SPF, DNS, Audit]
---

Read the SPF record from left to right and identify what every mechanism authorizes.

For each `include`, determine which vendor or service requires it. Follow nested policy far enough to understand lookup complexity.

Check:

- duplicate SPF policies;
- obsolete includes;
- overly broad IP ranges;
- DNS lookup limits;
- redirect behavior;
- final `all` mechanism.

Then verify delivered messages from each legitimate sender.

Do not delete an unknown include until you have checked application and vendor ownership.

## Reference material

- [RFC 7208 — SPF](https://www.rfc-editor.org/rfc/rfc7208)
