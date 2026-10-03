---
title: Common MIME multipart types
description: Alternative, mixed and related represent different relationships between message parts.
section: Reference
tags: [MIME, Message Format, HTML Email]
---

`multipart/alternative` contains different representations of substantially the same content, commonly plain text and HTML.

`multipart/mixed` combines independent body parts, commonly a message body plus attachments.

`multipart/related` groups resources that belong together, such as HTML with inline images referenced by content IDs.

Nested MIME structures are normal. Parse the MIME tree rather than searching raw source for the first Content-Type.

## Reference material

- [RFC 2046 — MIME Media Types](https://www.rfc-editor.org/rfc/rfc2046)
- [RFC 2387 — multipart/related](https://www.rfc-editor.org/rfc/rfc2387)
