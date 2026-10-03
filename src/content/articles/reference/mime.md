---
title: MIME
description: The structure that lets email carry HTML, attachments, multiple body alternatives and non-ASCII content.
section: Reference
tags: [MIME, Message Format, Attachments]
---

MIME extends Internet message format so a message can contain more than plain ASCII text. It defines media types, multipart structure, transfer encodings and related headers.

A common message might look conceptually like:

```text
multipart/mixed
├── multipart/alternative
│   ├── text/plain
│   └── text/html
└── application/pdf
```

## Why multipart matters

`multipart/alternative` carries different representations of the same content, often plain text and HTML. `multipart/mixed` commonly combines a body with attachments.

Boundaries separate the individual body parts.

## Encoding is not encryption

Base64 and quoted-printable make content safe to transport through mail systems. They do not provide secrecy. Anyone with the message can decode them.

## Reference material

- [RFC 2045 — MIME Part One: Format of Internet Message Bodies](https://www.rfc-editor.org/rfc/rfc2045)
- [RFC 2046 — MIME Part Two: Media Types](https://www.rfc-editor.org/rfc/rfc2046)
- [RFC 2047 — MIME Part Three: Message Header Extensions](https://www.rfc-editor.org/rfc/rfc2047)
