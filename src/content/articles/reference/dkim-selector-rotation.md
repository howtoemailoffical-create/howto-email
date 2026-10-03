---
title: DKIM selector rotation
description: A clean selector lifecycle for changing signing keys without invalidating mail in flight.
section: Reference
tags: [DKIM, DNS, Operations]
---

A selector identifies the DKIM public key used for a signature. Rotation should create a **new selector**, not silently replace a key while old mail signed under that selector is still moving.

A safe lifecycle is:

1. publish new selector/key;
2. verify DNS;
3. switch signing to the new selector;
4. verify production signatures;
5. retain old public key during overlap;
6. retire the old selector when no longer needed.

Keep selector names operationally meaningful enough to identify owners without exposing secrets.

## Reference material

- [RFC 6376 — DKIM](https://www.rfc-editor.org/rfc/rfc6376)
