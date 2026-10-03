---
title: DNS TTLs for email changes
description: TTL controls cache lifetime, not how quickly every resolver on Earth will update.
section: Reference
tags: [DNS, Operations, Migration]
---

A DNS TTL tells caching resolvers how long an answer may be reused.

Lowering a TTL shortly before a cutover does not invalidate copies already cached under the old, longer TTL.

For planned migrations, lower TTL early enough for previous caches to age out.

After the change, query authoritative DNS to confirm publication and recursive resolvers to understand what clients may still see.

## Reference material

- [RFC 1034 — DNS concepts and caching](https://www.rfc-editor.org/rfc/rfc1034)
- [RFC 1035 — DNS](https://www.rfc-editor.org/rfc/rfc1035)
