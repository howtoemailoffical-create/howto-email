---
title: Validate an email DNS change
description: Prove a DNS change is authoritative before blaming propagation.
section: Do
tags: [DNS, Troubleshooting]
---

After changing an MX, SPF, DKIM, DMARC or transport-policy record, query the authoritative nameservers directly.

Then compare answers from recursive resolvers.

If the authoritative server still returns the old value, the problem is not cache propagation—the source zone has not changed as expected. If authoritative data is correct but a recursive resolver is stale, check the TTL and when that resolver likely cached the old answer.

Keep screenshots out of the critical path when possible. Raw query output preserves the queried name, type, answer and TTL much more clearly.

## Reference material

- [RFC 1034 — DNS concepts](https://www.rfc-editor.org/rfc/rfc1034)
- [RFC 1035 — DNS implementation](https://www.rfc-editor.org/rfc/rfc1035)
