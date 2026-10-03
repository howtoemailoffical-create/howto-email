---
title: Non-ASCII text in email headers
description: How older encoded-word syntax and internationalized headers handle characters beyond ASCII.
section: Reference
tags: [Headers, MIME, Internationalization]
---

Traditional message headers were heavily constrained to ASCII.

MIME encoded-word syntax allows non-ASCII display text in many structured header contexts. Internationalized email standards later introduced UTF-8 header support for SMTPUTF8-capable environments.

Do not decode headers by simply looking for Base64. Use a message parser that understands the surrounding syntax.

## Reference material

- [RFC 2047 — Message Header Extensions for Non-ASCII Text](https://www.rfc-editor.org/rfc/rfc2047)
- [RFC 6532 — Internationalized Email Headers](https://www.rfc-editor.org/rfc/rfc6532)
