---
title: Content-ID and inline images
description: How MIME body parts can be referenced from HTML without using an external image URL.
section: Reference
tags: [MIME, HTML Email, Attachments]
---

A MIME part can have a `Content-ID` value. HTML content can reference that part using a `cid:` URI.

This is commonly used for inline images packaged inside the message.

Clients vary in how they render and expose these parts. Security scanners should still inspect them as message content rather than assuming an inline image is safe.

## Reference material

- [RFC 2392 — Content-ID and Message-ID URLs](https://www.rfc-editor.org/rfc/rfc2392)
- [RFC 2387 — multipart/related](https://www.rfc-editor.org/rfc/rfc2387)
