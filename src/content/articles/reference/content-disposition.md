---
title: Content-Disposition
description: How MIME parts indicate inline content or attachments and suggest filenames.
section: Reference
tags: [MIME, Attachments, Headers]
---

`Content-Disposition` gives presentation information for a MIME body part. Common dispositions are `inline` and `attachment`.

An attachment can also include a filename parameter.

Do not use Content-Disposition alone as a security verdict. Malicious messages can use misleading filenames, mismatched media types or unusual MIME structures. Security tooling should parse the actual message and content.

## Reference material

- [RFC 2183 — Content-Disposition Header Field](https://www.rfc-editor.org/rfc/rfc2183)
- [RFC 2231 — MIME parameter value extensions](https://www.rfc-editor.org/rfc/rfc2231)
