---
title: SMTP SIZE extension
description: How servers advertise message-size capability and clients can declare a message size before DATA.
section: Reference
tags: [SMTP, ESMTP, Message Size]
---

A server can advertise `SIZE` in its EHLO response, optionally with a maximum accepted message size.

A client can include a size parameter with MAIL FROM.

This can let a server reject an oversized message before the client transmits the entire body.

Remember that MIME/base64 encoding increases the transmitted size of binary attachments, so a 20 MB file does not necessarily produce a 20 MB message.

## Reference material

- [RFC 1870 — SMTP Service Extension for Message Size Declaration](https://www.rfc-editor.org/rfc/rfc1870)
- [RFC 2045 — MIME transfer encoding](https://www.rfc-editor.org/rfc/rfc2045)
