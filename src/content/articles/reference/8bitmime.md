---
title: 8BITMIME
description: The SMTP extension for transporting MIME bodies containing octets beyond 7-bit ASCII.
section: Reference
tags: [SMTP, MIME, ESMTP]
---

SMTP originally assumed a restricted transport representation.

`8BITMIME` lets an SMTP server advertise support for 8-bit MIME message bodies under defined conditions.

It is a transport capability. It does not mean arbitrary binary files can be dropped into a message without MIME encoding and structure.

## Reference material

- [RFC 6152 — SMTP Service Extension for 8-bit MIME Transport](https://www.rfc-editor.org/rfc/rfc6152)
- [RFC 2045 — MIME](https://www.rfc-editor.org/rfc/rfc2045)
