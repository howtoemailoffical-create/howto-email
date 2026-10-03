---
title: Internet message format
description: The basic structure of an email message before MIME adds richer content.
section: Reference
tags: [Headers, Message Format]
---

An Internet message is a set of header fields followed by a blank line and the message body.

```text
From: Alice <alice@example.com>
To: Bob <bob@example.net>
Date: Fri, 3 Oct 2026 14:00:00 -0500
Message-ID: <example123@example.com>
Subject: Example

This is the body.
```

SMTP transports this message, but SMTP's envelope is separate from these headers.

## Header folding and parsing

Message syntax has detailed rules around field names, bodies, line length and historical forms. Software should use a standards-aware parser rather than splitting raw headers on colons and hoping for the best.

## Reference material

- [RFC 5322 — Internet Message Format](https://www.rfc-editor.org/rfc/rfc5322)
- [RFC 6532 — Internationalized Email Headers](https://www.rfc-editor.org/rfc/rfc6532)
