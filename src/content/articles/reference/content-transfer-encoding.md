---
title: Content-Transfer-Encoding
description: Why MIME uses base64, quoted-printable and related transfer encodings.
section: Reference
tags: [MIME, Encoding, Attachments]
---

`Content-Transfer-Encoding` describes how a MIME body part is represented for transport.

Common values include `7bit`, `8bit`, `base64` and `quoted-printable`.

Base64 is common for binary attachments. Quoted-printable is useful for mostly textual content with some bytes needing encoding.

These encodings are reversible representations, not encryption.

## Reference material

- [RFC 2045 — MIME Part One](https://www.rfc-editor.org/rfc/rfc2045)
