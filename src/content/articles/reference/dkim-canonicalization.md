---
title: DKIM canonicalization
description: Why harmless-looking message changes sometimes preserve a signature and sometimes break it.
section: Reference
tags: [DKIM, Headers, MIME]
---

DKIM canonicalization defines how headers and bodies are normalized before hashing and verification.

The two common algorithms are **simple** and **relaxed**. A signature specifies header and body canonicalization in its `c=` tag.

Relaxed canonicalization tolerates certain whitespace and formatting differences. It does not make arbitrary content modification safe.

## Why operators care

A gateway that rewrites a subject, adds a footer, modifies MIME structure or changes a signed header can invalidate a signature depending on what was signed and how the message changed.

When DKIM fails only after a particular intermediary, compare the message before and after that hop.

## Reference material

- [RFC 6376 — DKIM canonicalization](https://www.rfc-editor.org/rfc/rfc6376)
- [RFC 6377 — DKIM and Mailing Lists](https://www.rfc-editor.org/rfc/rfc6377)
