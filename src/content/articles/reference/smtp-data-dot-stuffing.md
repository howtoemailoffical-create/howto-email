---
title: SMTP DATA and dot-stuffing
description: How SMTP marks the end of message data without truncating body lines that begin with a dot.
section: Reference
tags: [SMTP, Protocol, Message Format]
---

After a server returns `354` for DATA, the client sends the message content.

The end is signaled by a line containing only a period.

To prevent a body line beginning with a period from being mistaken for the terminator, SMTP uses transparency rules commonly called **dot-stuffing**. The sender adds an extra period and the receiver removes it as part of SMTP processing.

## Reference material

- [RFC 5321 — SMTP DATA and transparency](https://www.rfc-editor.org/rfc/rfc5321)
