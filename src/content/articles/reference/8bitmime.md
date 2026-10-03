---
title: 8BITMIME
description: SMTP support for transporting eight-bit MIME body content.
section: Reference
tags: [SMTP, MIME]
---

8BITMIME is an ESMTP extension that allows transport of MIME messages containing eight-bit body data under defined rules. A server advertises the capability through EHLO.

It does not mean arbitrary binary data can simply be placed in a message body. MIME content types and transfer rules still matter.

## Reference material

- [RFC 6152 — SMTP Service Extension for 8-bit MIME Transport](https://www.rfc-editor.org/rfc/rfc6152)
