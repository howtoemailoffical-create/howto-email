---
title: Content-Type
description: MIME media types, boundaries and multipart email.
section: Reference
tags: [MIME, Headers]
---

`Content-Type` describes the media type of a MIME body part. Email commonly uses `text/plain`, `text/html`, `multipart/alternative`, `multipart/mixed` and attachment-specific application types.

Multipart messages use boundary strings to delimit nested parts. Parsing should follow MIME structure rather than searching the raw message for a filename or HTML fragment.
