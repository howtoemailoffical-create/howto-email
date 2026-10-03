---
title: Implicit MX behavior
description: What SMTP does when a domain has no MX but does have address records.
section: Reference
tags: [DNS, MX, SMTP]
---

SMTP defines fallback behavior when a domain has no MX records: the domain can be treated as though it has an implicit MX pointing to itself.

That means a domain with an A or AAAA record but no MX may still receive delivery attempts.

If a domain explicitly does **not** accept mail, Null MX exists to say so rather than relying on the absence of MX.

## Reference material

- [RFC 5321 — Mail routing](https://www.rfc-editor.org/rfc/rfc5321)
- [RFC 7505 — Null MX](https://www.rfc-editor.org/rfc/rfc7505)
