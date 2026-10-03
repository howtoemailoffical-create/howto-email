---
title: Change email DNS safely
description: Use authoritative verification, staged TTLs and post-change message tests.
section: Do
tags: [DNS, Change Management, Operations]
---

Before the change, export or record the current DNS values and TTLs.

Lower TTL ahead of time where justified.

At change time:

1. update the intended record only;
2. query authoritative nameservers;
3. query representative recursive resolvers;
4. run protocol-level checks;
5. send controlled test messages;
6. monitor logs and authentication.

Keep a rollback value ready, but remember rollback is also a DNS change subject to caching.

## Reference material

- [RFC 1034 — DNS caching](https://www.rfc-editor.org/rfc/rfc1034)
- [NIST SP 800-128 — Configuration Management](https://csrc.nist.gov/pubs/sp/800/128/upd1/final)
