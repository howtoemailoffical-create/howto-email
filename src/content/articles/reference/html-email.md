---
title: HTML email
description: How HTML fits inside MIME and why web-page assumptions do not transfer cleanly to mail clients.
section: Reference
tags: [HTML Email, MIME]
---

HTML email is normally carried as a `text/html` MIME body part, often alongside a `text/plain` alternative.

Mail clients are not ordinary web browsers. They intentionally restrict or rewrite active content for security and privacy, and rendering support varies.

## Build for degradation

Use meaningful text, sensible structure and a plain-text alternative where appropriate. Do not depend on JavaScript or browser-like application behavior inside an email.

Remote images can also have privacy implications because loading them can contact an external server.

## Reference material

- [RFC 2046 — MIME Media Types](https://www.rfc-editor.org/rfc/rfc2046)
- [RFC 2854 — The text/html Media Type](https://www.rfc-editor.org/rfc/rfc2854)
