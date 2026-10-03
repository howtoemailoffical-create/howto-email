---
title: Quoted-printable and Base64
description: Common MIME content-transfer encodings.
section: Reference
tags: [MIME, Encoding]
---

Quoted-printable represents mostly readable text while escaping bytes that need transport-safe encoding. Base64 represents binary data using ASCII characters and is common for attachments.

These encodings are transport representations, not encryption. Anyone who can read the message can decode them.
