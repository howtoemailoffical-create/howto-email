---
title: SMTP CHUNKING and BDAT
description: An alternative to DATA for transferring message content in chunks.
section: Reference
tags: [SMTP, ESMTP, Protocol]
---

The CHUNKING extension introduces the `BDAT` command.

Instead of DATA followed by dot-terminated content, the client sends one or more chunks with explicit sizes.

A client must only use CHUNKING when the server advertises it.

Most administrators do not need to configure BDAT directly, but recognizing it helps when reading packet captures or SMTP logs.

## Reference material

- [RFC 3030 — SMTP Service Extensions for Transmission of Large and Binary MIME Messages](https://www.rfc-editor.org/rfc/rfc3030)
