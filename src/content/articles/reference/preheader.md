---
title: Preheaders and preview text
description: The text mailbox clients may show beside or beneath a message subject.
section: Reference
tags: [Message Format, HTML Email]
---

Preview text is largely a client presentation behavior rather than a core SMTP protocol feature.

Many HTML email templates place a short piece of text near the beginning of the message so clients that generate previews are likely to show something useful.

Client behavior differs, and hidden-content tricks can render differently across products. Keep the actual message understandable without depending on a particular preview implementation.

## Reference material

- [RFC 5322 — Internet Message Format](https://www.rfc-editor.org/rfc/rfc5322)
- [RFC 2046 — MIME Media Types](https://www.rfc-editor.org/rfc/rfc2046)
