---
title: Audit DKIM selectors
description: Find active, stale and unknown DKIM keys without deleting evidence blindly.
section: Do
tags: [DKIM, DNS, Audit]
---

Start with your sending-provider inventory and recent real messages. Extract `d=` and `s=` from DKIM signatures.

Query each selector and map it to a system owner.

Classify selectors as active, migration overlap, unknown or retired.

Before removing an old public key, confirm the old sender is no longer signing mail and allow normal queued messages to clear.

Unknown selectors deserve investigation, but a DNS record alone does not prove somebody possesses the private key.

## Reference material

- [RFC 6376 — DKIM](https://www.rfc-editor.org/rfc/rfc6376)
