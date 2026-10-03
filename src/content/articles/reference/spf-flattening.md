---
title: SPF flattening
description: Why replacing includes with IP addresses trades DNS lookups for maintenance risk.
section: Reference
tags: [SPF, DNS, Operations]
---

SPF flattening resolves provider mechanisms and publishes resulting IP ranges directly in a policy.

This can reduce runtime DNS lookups, but it creates a synchronization problem: the provider can change its sending infrastructure while your flattened copy stays stale.

Before flattening, remove unused senders, simplify unnecessary mechanisms and see whether the actual policy can fit naturally within SPF's limits.

If you automate flattening, the automation becomes a production dependency that needs monitoring and safe failure behavior.

## Reference material

- [RFC 7208 — SPF](https://www.rfc-editor.org/rfc/rfc7208)
