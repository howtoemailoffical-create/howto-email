---
title: DNS TTL and email changes
description: Use TTLs deliberately during MX and authentication migrations.
section: Reference
tags: [DNS, Operations]
---

A DNS TTL tells recursive resolvers how long an answer may be cached. Lowering a TTL shortly before a change does not instantly flush answers that were already cached under the old, longer TTL.

## Before a migration

If faster convergence matters, lower the relevant TTL far enough in advance for the previous TTL to age out. After the environment is stable, raise it to a sensible operational value.

Do not assume every visible difference during a change is "propagation." Query authoritative servers and compare them with recursive resolvers so you can tell stale cache from incorrect authoritative data.

## Reference material

- [RFC 1034 — Domain Names: Concepts and Facilities](https://www.rfc-editor.org/rfc/rfc1034)
- [RFC 1035 — Domain Names: Implementation and Specification](https://www.rfc-editor.org/rfc/rfc1035)
